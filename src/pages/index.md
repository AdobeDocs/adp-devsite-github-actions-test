---
title: Block Examples
description: Explore all available blocks for the Adobe Developer documentation site, including content blocks, code blocks, and API documentation components.
--- 
# DevDoc Block Examples

This page provides links to examples of all available blocks in the Adobe Developer documentation site.

## Content Blocks

### [Accordion](blocks/accordion/index.md)
Collapsible content sections for organizing information.

### [Announcement](blocks/announcement/index.md)
Display important announcements or notices.

### [Column](blocks/column/index.md)
Multi-column layouts for content organization.

### [Discover Block](blocks/discoverblock/index.md)
Showcase featured content or resources.

### [Edition](blocks/edition/index.md)
Edition-specific content display.

### [Image](blocks/image/index.md)
Image display and formatting examples.

### [Inline Alert](blocks/inline-alert/index.md)
Inline alert messages for warnings, tips, and notes.

### [List](blocks/list/index.md)
Various list formatting options.

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
