---
title: Adobe Assurance Public APIs and App Builder Common Issues
description: Guidance on using Adobe Assurance Public APIs with example curl commands, addressing common authorization errors in Adobe App Builder, and tips for local development workflows.
keywords:
- Adobe Assurance API
- Adobe App Builder
- authorization header
- curl API call
- local development
# --- FAQs ---
faqs:
- question: How do I make a GraphQL API call to Adobe Assurance?
  answer: Use a curl POST request to 'https://graffias.adobe.io/graffias/graphql' with the appropriate headers including authorization, org ID, user ID, and client ID, and send the request payload as JSON.
- question: What causes the "missing authorization header" validation error?
  answer: This error occurs when an API action expects an authorization header but it is not provided in the request; ensure you include a valid Bearer token in the Authorization header.
- question: How can I test API functionality not supported by 'aio app dev'?
  answer: Deploy your actions to Adobe I/O Runtime while running the UI part locally using the command `aio app run --local` to simulate full integration.
- question: Which headers are required for Adobe Assurance API requests?
  answer: Required headers include 'x-gw-ims-org-id', 'x-gw-ims-user-id', 'x-api-key', 'Authorization' (with Bearer token), 'Accept', 'Content-Type', and optionally 'Accept-Encoding'.
- question: How do I pass JSON data in a curl POST request for Adobe APIs?
  answer: Use the `-d` option with a JSON file or inline JSON string, and set the 'Content-Type' header to 'application/json' to correctly send JSON payloads. 
---
// copied from https://github.com/AdobeDocs/adobe-assurance-public-apis/blob/3ab99cac59f3c9026f76e23a24a9db13a330d02c/src/pages/api/index.md?plain=1#L24
// page https://developer.adobe.com/adobe-assurance-public-apis/api/

```console
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

    ```bash
    {"error": "cannot validate token, reason: missing authorization header"}
    ```

// copied from https://github.com/AdobeDocs/app-builder/blob/main/src/pages/getting_started/first_app.md?plain=1#L400-402
// page https://developer.adobe.com/app-builder/docs/getting_started/first_app/#6developing-the-application

If you need to test functionality that is not supported by `aio app dev`, you can deploy the actions to Adobe I/O Runtime while running the UI part on your local machine.

```bash
aio app run --local
```
