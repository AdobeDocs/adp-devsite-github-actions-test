---
title: Overview - Cat Analytics
description: This is the overview page of Cat Analytics
contributors:
  - https://github.com/icaraps 
---

<HeroSimple slots="heading, text"/>

# test re use work

Stage Cat Product API offers limitless ways to integrate your most important customer data into key business processes. Cat Product API offer limitless ways.

## Overview

This documentation provides instructions for Catt Analytics 2.0 APIs. For working with Cat Analytics APIs, see [Cat Analytics API Documentation](https://github.com/AdobeDocs/dev-site).

The Cat Analytics APIs are a collection of APIs that power Cat Analytics products like Cat Workspace.
The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data.
You can also create reports to explore, get insights, or answer important questions about your data.

## Contributing

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions
or deletions for this documentation, check out the source from [this github repo](https://github.com/adobe/gatsby-theme-spectrum-example), and submit a pull
request with your contribution. For more information, refer to the [contributing page](support/contribute/index.md).

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Cat Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`.

<Announcement slots="heading, text, button" variant="secondary" backgroundColor="background-color-gray" />

#### Important Update

Review these changes before your next deployment.

- [View details](https://example.com)

<Tab orientation="vertical" slots="heading, content" repeat="2"/>

### Request

```javascript-disableLineNumbers-data-line="2-4"
graphql
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

<List slots="text1, text2" repeat="2" iconColor="#2ac3a2" icon="checkmark" variant="fullWidth" />

Item 1 title

Item 1 description

Item 2 title

Item 2 description

<Product-Card slots="icon, text, buttons" theme="light" repeat="2" />

![typescript-logo](../images/adobe-express.svg)

Lit is a simple library for building fast, lightweight web components. It's built on top of the Web Components standard and provides a set of tools and utilities to simplify the creation of custom elements. Lit uses modern web standards like JavaScript template literals and reactive properties to create reusable and efficient components with minimal boilerplate required.

- [Learn more](https://lit.dev/)
- [View Docs](https://lit.dev/)

![typescript-logo](../images/adobe-express.svg)

TypeScript is a statically typed superset of JavaScript that adds optional static types to the language.TypeScript aims to improve the development experience by providing a robust type system, which helps catch errors early during development and enhances code quality and maintainability.

- [Learn more](https://https://www.typescriptlang.org/)