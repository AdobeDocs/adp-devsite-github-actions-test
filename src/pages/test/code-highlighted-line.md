---
title: Sending a GraphQL Request Using curl to Adobe Graffias API
description: This document provides a sample curl command for making a POST request to the Adobe Graffias GraphQL endpoint. It demonstrates the necessary headers, authentication details, and the use of an introspection JSON payload for querying the API.
keywords:
- curl command
- GraphQL
- Adobe Graffias API
- authentication
- HTTP headers
- API request
---

```console data-line="1-2, 5, 9-20" data-line-offset="3"
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