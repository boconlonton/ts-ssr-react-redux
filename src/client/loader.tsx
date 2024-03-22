import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { getPropsFromElement } from "@lib/get-prop-from-element";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@client/redux/slices/jobSlice";

declare const window: Window & {
  __PRELOAD_STATE__: any;
};

function renderComponent(node: Element, Component: React.FC) {
  if (Component && node) {
    const store = configureStore({
      reducer: rootReducer.reducer,
      preloadedState: window.__PRELOAD_STATE__,
    });
    const props = getPropsFromElement(node.outerHTML);
    hydrateRoot(
      node,
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  } else {
    console.warn(
      `There was no match for \`${node.getAttribute(
        "data-react-component"
      )}\` in the component map`
    ); // eslint-disable-line no-console
  }
}

export default renderComponent;
