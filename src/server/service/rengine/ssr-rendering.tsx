import React, { FC } from "react";
import { renderToString } from "react-dom/server";
import { Store } from "redux";
import { Provider } from "react-redux";
import Components from "@client/components";

function findSSRComponents(htmlMarkup: string) {
  const srrPlaceholderRegex = /(<[^<]+>[\s]*SSR_([a-zA-Z_]+)[\s]*<\/[^<]+>)/g; // SRR_JOBS_ONLY is a placeholder
  return htmlMarkup.match(srrPlaceholderRegex);
}

function getComponentNameFromElement(elementStr: string) {
  const componentRegex = /SSR_([a-zA-Z_]+)/;
  const matches = elementStr.match(componentRegex);
  if (!matches) return undefined;
  return matches[1];
}

function getPropsFromElement(elementStr: string) {
  // eslint-disable-next-line no-useless-escape
  const propRegex = /data-react-prop-([^=\s]+)="[^\"]+"/g;
  const matches = elementStr.match(propRegex);
  if (!matches) return undefined;

  const props: Record<string, string> = {};
  matches.forEach((match) => {
    const [propName, propValue] = match.split("=");
    let value = propValue.replace(/"/g, "");
    try {
      value = JSON.parse(value);
    } catch (_) {
      // do nothing
    }
    props[propName.replace("data-react-prop-", "")] = value;
  });
  return props;
}

export function getComponentList(content: string) {
  if (!content) {
    return [];
  }
  const components = findSSRComponents(content);

  return components?.map((component) => {
    const componentName: string = getComponentNameFromElement(component) || "";
    return componentName;
  });
}

export function renderSSRComponents(content: string, store: Store) {
  if (!content) {
    return {
      content,
      components: [],
    };
  }
  const components = findSSRComponents(content);
  const componentNames: string[] = [];
  if (!components) {
    return {
      content,
      components: [],
    };
  }
  components.forEach((component) => {
    const props: any = getPropsFromElement(component);
    const componentName: string = getComponentNameFromElement(component) || "";
    console.log(componentName);
    if (componentName) {
      if (Components[componentName as keyof typeof Components]) {
        componentNames.push(
          Components[componentName as keyof typeof Components].name
        );
        const componentToRender = renderReactComponentToStringHtml(
          Components[componentName as keyof typeof Components],
          store,
          props
        );
        const pattern = new RegExp(
          `>([\\n\\s\\t]*)(SSR_${componentName})([\\n\\s\\t]*)<`,
          "g"
        );
        content = content.replace(pattern, `>${componentToRender}<`);
      }
    }
  });
  return {
    components: componentNames,
    content,
  };
}

function renderReactComponentToStringHtml(
  component: { Component: FC; name: string },
  store: Store,
  props?: Record<string, string>
) {
  const { Component } = component;
  const content: string = renderToString(
    <Provider store={store}>
      <Component {...(props || {})} />
    </Provider>
  );
  return content;
}
