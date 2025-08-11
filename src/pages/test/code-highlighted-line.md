---
title: Example of Making a POST Request to the Adobe Graffias GraphQL API
description: This document provides an example of using the curl command-line tool to make a POST request to Adobe's Graffias GraphQL API. It demonstrates the required headers for authentication and content negotiation, as well as sending a GraphQL query payload via JSON. The example is useful for developers integrating with Adobe APIs.
keywords:
- curl
- POST request
- Adobe Graffias API
- GraphQL
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