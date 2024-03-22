export function getPropsFromElement(elementStr: string) {
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
