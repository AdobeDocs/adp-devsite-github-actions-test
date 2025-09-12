---
title: Adobe I/O Runtime API Reference
description: Comprehensive reference guide for Adobe I/O Runtime APIs, detailing endpoints, parameters, and usage for programmatic interactions with the service.
keywords:
- Adobe I/O Runtime
- API Reference
- Adobe APIs
- Runtime Endpoints
- Authorization Header
faqs:
- question: What is the base URL for Adobe I/O Runtime API calls?
  answer: The base URL for all Adobe I/O Runtime API calls is https://api.adobe.io/. All requests should be made to this endpoint followed by the specific API path.
- question: What authorization is required to access Adobe I/O Runtime APIs?
  answer: Access requires an authorization token passed in the header as 'Bearer {token}' along with an API key specified in the 'X-Api-Key' header.
- question: How do I handle validation errors related to missing authorization?
  answer: Validation errors occur when the authorization header is missing from a request. Ensure the Authorization header contains a valid Bearer token to avoid such errors.
- question: Can I test Adobe I/O Runtime actions locally?
  answer: Yes, you can deploy actions to Adobe I/O Runtime and run the UI locally using the command 'aio app run --local' for testing unsupported functionalities.
- question: What parameters are required to get namespace details for an organization?
  answer: To retrieve namespace details, you must provide 'orgId' and 'intId' path parameters, along with the required Authorization and X-Api-Key headers.
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
