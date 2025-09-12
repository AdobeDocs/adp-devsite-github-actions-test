---
title: Adobe Developer APIs: Authorization, API Requests, and Local Development Tips  
description: Learn how to use Adobe Assurance GraphQL APIs with proper authorization, handle common authorization errors in Adobe App Builder, and run local development alongside Adobe I/O Runtime deployments.  
keywords:
- Adobe Assurance API
- GraphQL API request
- Authorization header error
- Adobe App Builder troubleshooting
- Local development Adobe I/O Runtime  
faqs:
- question: How do I authenticate a request to the Adobe Assurance GraphQL API?  
  answer: You must include the Authorization header with a valid Bearer token, along with organization ID, user ID, and API key headers in your HTTP request.  
- question: What causes the "cannot validate token, reason: missing authorization header" error?  
  answer: This error occurs when an API action expecting an authorization header does not receive one, typically due to missing or malformed headers in the request.  
- question: How can I test unsupported functionality locally when developing Adobe App Builder apps?  
  answer: You can deploy backend actions to Adobe I/O Runtime and run the UI frontend locally using the command `aio app run --local`.  
- question: What headers are required in a cURL request to the Adobe Assurance GraphQL endpoint?  
  answer: Required headers include Accept-Encoding, Content-Type, Accept, Connection, x-gw-ims-org-id, x-gw-ims-user-id, x-api-key, and Authorization with a Bearer token.  
- question: Can I run Adobe App Builder applications partially on my local machine?  
  answer: Yes, you can run the UI part locally while deploying backend actions to Adobe I/O Runtime to test app functionality not supported by local development commands.  
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
