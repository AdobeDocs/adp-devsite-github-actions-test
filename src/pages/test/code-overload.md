---
title: Adobe I/O Runtime API Reference
description: This reference guide provides detailed information on the Adobe I/O Runtime API endpoints, parameters, and usage examples for programmatic interaction with Adobe's serverless platform.
keywords:
- Adobe I/O Runtime
- Adobe API Reference
- Serverless API
- API Endpoints
- Authorization Header
faqs:
- question: What is Adobe I/O Runtime?
  answer: Adobe I/O Runtime is a serverless platform that allows developers to deploy and run code in response to events, enabling integration with Adobe cloud services.
- question: How do I authenticate API requests to Adobe I/O Runtime?
  answer: You must include an Authorization header with a Bearer token along with your API key in the request headers to authenticate API calls.
- question: What is the base URL for all Adobe I/O Runtime API calls?
  answer: The base URL for all API requests to Adobe I/O Runtime is https://api.adobe.io/.
- question: What are namespaces in Adobe I/O Runtime?
  answer: Namespaces represent containers associated with an organization and integration, holding the deployed actions and related resources.
- question: How can I test Adobe I/O Runtime actions locally?
  answer: You can deploy actions to Adobe I/O Runtime and run the UI locally using the command `aio app run --local` for testing unsupported functionality.
---
// copied from https://github.com/AdobeDocs/adobe-assurance-public-apis/blob/3ab99cac59f3c9026f76e23a24a9db13a330d02c/src/pages/api/index.md?plain=1#L24
// page https://developer.adobe.com/adobe-assurance-public-apis/api/

```console-data-line="1-2,6,"-data-line-offset="2"
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
