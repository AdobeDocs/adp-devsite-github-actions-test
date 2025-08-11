---
title: Sending a POST Request to Graffias GraphQL API with curl
description: This document demonstrates how to send a POST request to the Graffias GraphQL API endpoint using the curl command-line tool. It showcases the use of various HTTP headers, authentication methods, and a JSON payload for API introspection.
keywords:
- curl
- GraphQL
- API request
- HTTP headers
- authentication
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