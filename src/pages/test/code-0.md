---
title: API Usage and Troubleshooting Guide
description: This document provides instructions on using Adobe's API endpoints, handling authentication errors, and tips for developing and testing applications with Adobe I/O Runtime.
keywords:
- Adobe Assurance API
- Adobe I/O Runtime
- Authentication error
- API troubleshooting
- Application development
faqs:
- question: How do I authenticate requests to the Adobe Assurance API?
  answer: You must include the necessary headers such as 'Authorization: Bearer [access token]' and 'x-api-key: [clientId]' when making requests to the API.
- question: What should I do if I receive a missing authorization header error?
  answer: Ensure you include the 'Authorization' header with a valid bearer token in your request; this is required for actions expecting authentication.
- question: How can I test functionality not supported by 'aio app dev'?
  answer: Deploy the actions to Adobe I/O Runtime and run the UI locally using 'aio app run --local' to test unsupported functionalities.
- question: What headers are required for POST requests to the Graffias API?
  answer: Essential headers include 'Content-Type', 'Accept', 'Connection', 'x-gw-ims-org-id', 'x-gw-ims-user-id', 'x-api-key', and 'Authorization'.
- question: Where can I find troubleshooting information for Adobe application development?
  answer: Refer to the Adobe App Builder documentation, especially sections covering common issues and errors encountered during development.
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
