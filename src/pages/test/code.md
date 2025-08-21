---
title: Adobe I/O Runtime API Reference
description: Comprehensive reference for Adobe I/O Runtime APIs, including endpoint details, authentication requirements, and common troubleshooting solutions.
keywords:
- Adobe I/O
- Runtime API
- Authentication
- Namespace Management
- API Endpoints
faqs:
- question: How do I authenticate requests to Adobe I/O Runtime APIs?
  answer: You must include an Authorization header with a valid Bearer token and provide your API key in the X-Api-Key header when making API requests.
- question: What base URL should I use for Adobe I/O Runtime API calls?
  answer: All Adobe I/O Runtime API calls use the base URL https://api.adobe.io/. Make sure to append the appropriate endpoint path to this base URL.
- question: What is a common error when calling the Runtime API, and how can I resolve it?
  answer: A common error is "cannot validate token, reason: missing authorization header." Ensure that you have included the correct Authorization header in your request.
- question: How can I test backend actions locally during development?
  answer: You can deploy your actions to Adobe I/O Runtime while running the UI part locally using the command `aio app run --local` for effective testing.
- question: What information does the GET /runtime/admin/namespaces/{orgId}/{intId} endpoint provide?
  answer: This endpoint returns details about the namespace associated with the specified organization and integration, including relevant identifiers and configuration.
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
