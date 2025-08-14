---
title: Example of cURL POST Request to Graffias GraphQL Endpoint
description: This document provides an example of how to make a POST request using cURL to the Graffias GraphQL endpoint from Adobe, including the necessary headers and the use of an introspection JSON file for the request payload.
keywords:
- cURL
- POST request
- Adobe Graffias
- GraphQL
- API headers
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