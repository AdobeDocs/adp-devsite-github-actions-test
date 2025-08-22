---
title: Adobe I/O Runtime API Reference
description: Comprehensive reference for Adobe I/O Runtime API endpoints, including usage, headers, parameters, and common issues encountered during integration and development.
keywords:
- Adobe I/O Runtime
- API reference
- namespaces
- authorization
- Adobe I/O
# --- FAQs ---
faqs:
- question: How do I call the Adobe I/O Runtime API?
  answer: Use the base URL https://api.adobe.io/ with the required authentication headers such as Authorization and X-Api-Key for all API calls.
- question: What headers are required for API requests?
  answer: Include headers like 'Authorization: Bearer {token}', 'x-api-key', 'x-gw-ims-org-id', and 'x-gw-ims-user-id' as required by the endpoint.
- question: What causes a validation error related to authorization?
  answer: A validation error occurs if an authorization header is missing in an API request where an auth token is expected.
- question: Can I test un-supported functionality locally?
  answer: Yes, run the UI locally while deploying backend actions to Adobe I/O Runtime using the command `aio app run --local`.
- question: How can I get details about a namespace?
  answer: Use the GET /runtime/admin/namespaces/{orgId}/{intId} endpoint with valid orgId and intId path parameters and appropriate authentication headers.
---
// copied from https://github.com/AdobeDocs/adobe-assurance-public-apis/blob/3ab99cac59f3c9026f76e23a24a9db13a330d02c/src/pages/api/index.md?plain=1#L24
// page https://developer.adobe.com/adobe-assurance-public-apis/api/

```console data-line="1-2,6," data-line-offset="2"
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

    ```bash data-line="2" data-line-offset="1"
    {"error": "cannot validate token, reason: missing authorization header"}
    {"error": "validate token"}
    ```

// copied from https://github.com/AdobeDocs/app-builder/blob/main/src/pages/getting_started/first_app.md?plain=1#L400-402
// page https://developer.adobe.com/app-builder/docs/getting_started/first_app/#6developing-the-application

If you need to test functionality that is not supported by `aio app dev`, you can deploy the actions to Adobe I/O Runtime while running the UI part on your local machine.

```bash disableLineNumbers
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
