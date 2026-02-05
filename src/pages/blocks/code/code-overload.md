---
title: Code Overload Example
description: Complex code examples demonstrating multiple features like line highlighting, offsets, and disabling line numbers.
---

// copied from https://github.com/AdobeDocs/adobe-assurance-public-apis/blob/3ab99cac59f3c9026f76e23a24a9db13a330d02c/src/pages/api/index.md?plain=1#L24
// page https://developer.adobe.com/adobe-assurance-public-apis/api/

```console-disableLineNumbers-data-line="2-4,6,"-data-line-offset="2"
curl -i -X POST 'https://graffias.adobe.io/graffias/graphql' 
    -H 'Accept-Encoding: gzip, deflate, br' 
    -H 'Content-Type: application/json' 
    -H 'Accept: application/json' 
    -H 'Connection: keep-alive' 
    -H 'x-gw-ims-org-id: [OrgId]@AdobeOrg' 
    -H 'x-gw-ims-user-id: [UserId]@techacct.adobe.com' -H 'x-api-key: [clientId]'
    -H 'Authorization: Bearer [access token]' 
    -d @introspection.json --compressed
```

// copied from https://github.com/AdobeDocs/app-builder/blob/main/src/pages/getting_started/first_app.md?plain=1#L584-L586
// page https://developer.adobe.com/app-builder/docs/getting_started/first_app/#common-issues

1. Validation error. If you see the following error, it is because you did not pass in an authorization header to an action expecting one.

    ```bash-data-line="2"-data-line-offset="1"
    {"error": "cannot validate token, reason: missing authorization header"}
    {"error": "validate token"}
    ```

// copied from https://github.com/AdobeDocs/app-builder/blob/main/src/pages/getting_started/first_app.md?plain=1#L400-402
// page https://developer.adobe.com/app-builder/docs/getting_started/first_app/#6developing-the-application

If you need to test functionality that is not supported by `aio app dev`, you can deploy the actions to Adobe I/O Runtime while running the UI part on your local machine.

```bash-disableLineNumbers
aio app run --local
```

# Adobe I/O Runtime API Reference

## API endpoints

Adobe I/O Runtime supports the following API endpoints for interacting programmatically with the service.

**Notes:**

1. Unless otherwise noted, all parameters are required. 
2. For all the API calls on this page, the base URL is:  
   `https://api.adobe.io/`

### GET /runtime/admin/namespaces/{orgId}/{intId}

Returns the details of the namespace associated with the specified organization and integration.

#### _Parameters:_

| Name                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `orgId` (`string`: _path_)           | Organization ID                                 |
| `intId` (`string`: _path_)           | Integration ID                                  |
| `Authorization` (`string`: _header_) | Authorization token in format: `Bearer {token}` |
| `X-Api-Key` (`string`: _header_)     | Api key                                         |

#### _Responses:_

<Tab orientation="horizontal" slots="heading, content" repeat="2" theme="light"/>

### Request

```graphql-disableLineNumbers-data-line="2,10"-data-line-offset="2"
mutation {
  createCustomerV2(
    input: {
      firstname: "Bob"
      lastname: "Loblaw"
      email: "bobloblaw@example.com"
      password: "b0bl0bl@w"
      is_subscribed: true
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
```

### Response

```json-data-line="7"-data-line-offset="1"
{
  "data": {
    "createCustomer": {
      "customer": {
        "firstname": "Bob",
        "lastname": "Loblaw",
        "email": "bobloblaw@example.com",
        "is_subscribed": true
      }
    }
  }
}
```

<CodeBlock slots="heading, code" repeat="3"/>

#### iframe

```html-data-line="3-10,14"-data-line-offset="2"-disableLineNumbers
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

```js-data-line="1-6,10,12"-data-line-offset="2"-disableLineNumbers
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

```js-disableLineNumbers
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
