// copied from https://github.com/AdobeDocs/express-add-ons-docs/blob/main/src/pages/guides/tutorials/grids-addon.md?plain=1#L144-L237
// page https://developer.adobe.com/express/add-ons/docs/guides/tutorials/grids-addon/

As usual, we'll work in the `src` folder while Webpack outputs the result in `dist`. The add-on entry point is `index.html`, which relies on `ui/index.js` for the iframe logic code (UI element handlers, etc.). The Document API entry point is instead `documentSandbox/code.js`, as defined in the `manifest.json`:

```json
{
    // ...
    "entryPoints": [
        {
            "type": "panel",
            "id": "panel1",
            "main": "index.html",
            "documentSandbox": "code.js" // 👈 here
        }
    ]
}
```

If you're wondering about `documentSandbox/shapeUtils.js`, it is an auxiliary file containing private code consumed by `code.js` that doesn't need to be exposed to the iframe in this specific project. The code of the blank template is as follows.

<!-- Code below -->
<CodeBlock slots="heading, code" repeat="4" languages="index.html, index.js, code.js, shapeUtils.js"/>

#### iframe

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="Adobe Express Add-on tutorial using JavaScript and the Document Sandbox" />
        <meta name="keywords" content="Adobe, Express, Add-On, JavaScript, Document Sandbox, Document API" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Grids add-on</title>
        <link rel="stylesheet" href="styles.css" />
    </head>

    <body>
        <sp-theme scale="medium" color="light" theme="express">
            <sp-button id="createShape">Create shape</sp-button>
        </sp-theme>
    </body>
</html>
```

#### iframe

```js
// Spectrum imports
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");
    const createShapeButton = document.getElementById("createShape");

    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");
    sandboxProxy.log("Document Sandbox up and running.");

    // Enabling CTA elements only when the addOnUISdk is ready
    createShapeButton.disabled = false;
});
```

#### Document API

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

function start() {
    runtime.exposeApi({
        log: (...args) => {
            console.log(...args);
        },
        // other properties will go here...
    });
}

start();
```

#### Document API

```js
// empty
```