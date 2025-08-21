---
title: Using Authentication and Local Testing with Adobe APIs
description: This document provides guidance on making authenticated API requests to Adobe services, troubleshooting common validation errors, and testing application functionality locally with Adobe I/O Runtime.
keywords:
- Adobe API authentication
- Bearer token
- Validation error
- Local testing
- Adobe I/O Runtime
# --- FAQs ---
faqs:
- question: How do I make an authenticated request to Adobe APIs?
  answer: Use curl or a similar tool to include all required headers, such as Authorization with a Bearer token, and other Adobe-specific headers when making POST requests.
- question: What causes the "missing authorization header" error?
  answer: This error occurs when a request to an Adobe API endpoint expecting authentication does not include the Authorization header. Always provide the header with a valid token.
- question: How do I resolve token validation errors?
  answer: Ensure that your request includes the Authorization header with a valid Bearer token and that all other required headers (e.g., x-api-key, org/user IDs) are present and correctly formatted.
- question: Can I test my Adobe app locally?
  answer: Yes, you can test the UI locally and deploy backend actions to Adobe I/O Runtime using "aio app run --local" to integrate and debug features not supported by local simulators.
- question: What is Adobe I/O Runtime used for during development?
  answer: Adobe I/O Runtime allows you to deploy serverless actions remotely while working on your app locally, enabling you to test end-to-end integrations and functionality that require cloud execution.
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
