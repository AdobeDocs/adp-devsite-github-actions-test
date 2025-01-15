---
title: createCustomerV2 mutation
---

// copied from https://github.com/AdobeDocs/commerce-webapi/blob/ae6507dd2ffa343f79bd16b842b72a2f9de0a594/src/pages/graphql/schema/customer/mutations/create-v2.md?plain=1#L2
// page https://developer.adobe.com/commerce/webapi/graphql/schema/customer/mutations/create-v2/

<Tab orientation="horizontal" slots="heading, content" repeat="2" theme="light"/>

### Request

```graphql
mutation {
  createCustomerV2(
    input: {
      firstname: "Bob"
      lastname: "Loblaw"
      email: "bobloblaw@example.com"
      password: "b0bl0bl@w"
      is_subscribed: true
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
```

### Response

```json
{
  "data": {
    "createCustomer": {
      "customer": {
        "firstname": "Bob",
        "lastname": "Loblaw",
        "email": "bobloblaw@example.com",
        "is_subscribed": true
      }
    }
  }
}
```