---
title: Using cURL to Send GraphQL Introspection Queries to Adobe Graffias API
description: A guide on how to use cURL to POST an introspection query to the Adobe Graffias GraphQL endpoint, including required request headers and authentication.
keywords:
- cURL
- Adobe Graffias
- GraphQL API
- Authentication
- Introspection query
faqs:
- question: What headers are required when sending a request to the Adobe Graffias GraphQL endpoint?
  answer: You must include headers for Accept-Encoding, Content-Type, Accept, Connection, x-gw-ims-org-id, x-gw-ims-user-id, x-api-key, and Authorization (Bearer token) in your cURL request.
- question: How do I get the access token needed for API authentication?
  answer: Obtain your access token through Adobe's authentication process, typically by following OAuth workflows in your Adobe Developer account.
- question: What is the purpose of the introspection.json file in the cURL command?
  answer: The introspection.json file contains the GraphQL introspection query, which is sent as the POST request body to retrieve the API’s schema details.
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