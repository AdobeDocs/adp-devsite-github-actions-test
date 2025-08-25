---
title: Adobe Assurance Public APIs Usage Guide
description: This document provides a practical guide for using Adobe Assurance Public APIs, including examples of making API requests, handling common authorization errors, and testing app functionality locally and on Adobe I/O Runtime.
keywords:
- Adobe Assurance
- Public APIs
- API authentication
- Error handling
- App Builder
# --- FAQs ---
faqs:
- question: How do I make a POST request to Adobe Assurance GraphQL API?
  answer: Use the provided curl command, ensuring you set all required headers such as org ID, user ID, API key, and authorization token.
- question: What does the "missing authorization header" error mean?
  answer: This error indicates that your request to the API did not include the necessary authorization header. Add a valid OAuth bearer token in your request header.
- question: How can I test Adobe app functionality not supported by aio app dev?
  answer: You can deploy actions to Adobe I/O Runtime while keeping the UI running on your local machine with the command `aio app run --local`.
- question: Which headers are mandatory when making a POST request to Graffias GraphQL API?
  answer: You must include 'Content-Type', 'Accept', 'x-gw-ims-org-id', 'x-gw-ims-user-id', 'x-api-key', and 'Authorization' headers in your request.
- question: Where can I find troubleshooting information for common issues in Adobe app development?
  answer: Consult the Adobe app-builder documentation under the 'Common Issues' section for fixes to typical problems such as validation and authorization errors.
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
