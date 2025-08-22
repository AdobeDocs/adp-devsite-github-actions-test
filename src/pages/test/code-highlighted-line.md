---
title: How to Make a POST Request to the Adobe Graffias GraphQL API
description: This document explains how to perform a POST request to the Adobe Graffias GraphQL API using cURL, including the required headers and authentication details.
keywords:
- Adobe Graffias
- GraphQL API
- cURL POST request
- API authentication
- HTTP headers
# --- FAQs ---
faqs:
- question: What headers are required for the POST request to Adobe Graffias GraphQL API?
  answer: Ensure you include headers such as Content-Type, Accept, x-gw-ims-org-id, x-gw-ims-user-id, x-api-key, and Authorization with a valid bearer token.
- question: How do I include the query or mutation data in the request?
  answer: Use the -d flag followed by the JSON payload file, such as -d @introspection.json, to send the GraphQL query or mutation.
- question: How can I authenticate the request properly?
  answer: Provide valid organization and user IDs in the headers, along with a client API key and a valid OAuth bearer token in the Authorization header.
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