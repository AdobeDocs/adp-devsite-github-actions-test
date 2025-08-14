---
title: curl Command for Adobe Graffias GraphQL Introspection
description: This document provides a sample curl command for making a POST request to the Adobe Graffias GraphQL API endpoint, including necessary headers and authentication details to perform an introspection query using a JSON payload.
keywords:
- curl
- Adobe Graffias
- GraphQL
- API authentication
- introspection
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