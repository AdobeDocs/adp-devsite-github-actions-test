---
title: Using curl to Perform a GraphQL Introspection Query
description: Learn how to perform a GraphQL introspection query using curl, including the required headers and authentication for Adobe Graffias API.
keywords:
- curl
- GraphQL introspection
- Adobe Graffias API
- authentication
- API request
faqs:
- question: What is a GraphQL introspection query?
  answer: A GraphQL introspection query retrieves the schema and type details from a GraphQL API, helping developers understand available queries and mutations.
- question: What authentication headers are needed for Adobe Graffias API?
  answer: You need to include x-gw-ims-org-id, x-gw-ims-user-id, x-api-key, and an Authorization Bearer token in your request headers for authentication.
- question: How do I send the introspection query file with curl?
  answer: Use the -d option with @introspection.json to send the query payload as JSON, ensuring the file contains the required GraphQL introspection query.
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