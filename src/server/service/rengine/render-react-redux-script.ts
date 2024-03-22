export const renderReactReduxScript = (
  pageContentStr: string,
  preloadState: any,
  reactComponents: Array<string> = []
) => {
  const mainCss = `<link rel="stylesheet" type="text/css" href="/main.css">`;
  const reduxPreloadScript = `<script>
    window.__PRELOAD_STATE__ = ${JSON.stringify(preloadState).replace(
      /</g,
      "\\u003c"
    )};
    window.__BUILD__ = '1';
  </script>`;
  const mainJs = `<script src="/main.bundle.js"></script>`;
  const vendorsJs = `<script src="/vendors.bundle.js"></script>`;
  const reactComponentsJs = reactComponents.map((component) => {
    return `<script src="/${component}.bundle.js"></script>`;
  });

  /**
   * Head css, scripts
   * - redux preload state
   */
  if (!pageContentStr.includes(mainCss)) {
    pageContentStr = pageContentStr.replace("</head>", `\t${mainCss}\n</head>`);
  }
  if (!pageContentStr.includes(reduxPreloadScript)) {
    pageContentStr = pageContentStr.replace(
      "</head>",
      `\t${reduxPreloadScript}\n</head>`
    );
  }

  /**
   * Other scripts
   * - main bundle js
   * - vendors bundle js
   * - react components bundle js
   */
  const bodyScripts = [vendorsJs, mainJs, ...reactComponentsJs];
  bodyScripts.forEach((script) => {
    if (!pageContentStr.includes(script)) {
      pageContentStr = pageContentStr.replace(
        "</body>",
        `\t${script}\n</body>`
      );
    }
  });

  return pageContentStr;
};
