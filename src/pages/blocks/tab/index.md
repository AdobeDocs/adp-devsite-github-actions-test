---
title: Tab Block
description: Organize related content using tabbed layouts with the Tab block component.
---

# Tab Block Example

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

<Tab orientation="vertical" slots="heading, image, content" repeat="3"  theme="dark" className='bgBlue ' />

## Tab 1

![Code for initializing SDK](src/pages/images/adobe-express.svg)

content tab 1

## Tab 2

![Code to invoke full editor](src/pages/images/adobe-express.svg)

content tab 2

## Tab 3

![Code to invoke quick actions](src/pages/images/adobe-express.svg)

content tab 3

<Tab slots="heading, content" repeat="2"  theme="dark" className='bgBlue ' />

## Tab 1

content tab 1

## Tab 2

content tab 1
