---
title: How to Make a GraphQL POST Request to Adobe Graffias API Using cURL
description: This guide demonstrates how to send a POST request to the Adobe Graffias GraphQL API with required headers using cURL. It includes authentication using API keys and bearer tokens.
keywords:
- Adobe Graffias API
- GraphQL POST request
- cURL command example
- API authentication headers
- introspection.json payload
faqs:
- question: What is the purpose of the headers in the cURL command?
  answer: The headers specify the content type, accepted encoding, authorization credentials, and organizational context required by Adobe Graffias API to process the GraphQL request.
- question: What does the -d @introspection.json option do in the cURL command?
  answer: It tells cURL to send the contents of the introspection.json file as the POST request body to the API endpoint.
- question: How do I obtain the access token for the Authorization header?
  answer: The access token is typically retrieved through Adobe's OAuth or JWT authentication flow associated with your Adobe developer account and service credentials.
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