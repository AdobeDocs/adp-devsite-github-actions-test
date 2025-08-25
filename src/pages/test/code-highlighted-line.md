---
title: Using cURL to POST GraphQL Queries to Adobe Graffias API
description: Learn how to use cURL to send POST requests with GraphQL queries to the Adobe Graffias API, including required headers and authentication steps.
keywords:
- cURL
- Adobe Graffias API
- GraphQL
- POST request
- API authentication
faqs:
- question: What headers are required for authenticating with the Adobe Graffias API?
  answer: You need to include 'x-gw-ims-org-id', 'x-gw-ims-user-id', 'x-api-key', and an 'Authorization' Bearer token in the request headers.
- question: How do I send a GraphQL query using cURL?
  answer: Pass the query as a JSON file with the '-d' flag to cURL, set the 'Content-Type' header to 'application/json', and use the POST method to send the data to the GraphQL endpoint.
- question: What is the purpose of the '@introspection.json' file in the request?
  answer: The '@introspection.json' file contains your GraphQL query or schema information and is sent as the body of the POST request to the Graffias API.
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