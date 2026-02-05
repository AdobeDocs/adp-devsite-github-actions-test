---
title: Code Block Component
description: Learn how to use the Code Block component to display multiple code snippets with headings.
---

// copied from https://github.com/adobe/aio-theme?tab=readme-ov-file#code-block

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Payload

```json
{
  "customer": {
    "email": "mshaw@example.com",
    "firstname": "Melanie",
    "lastname": "Shaw"
  }
}
```

#### Response

```json
{
  "id": 13,
  "group_id": 1,
  "created_at": "2017-05-18 16:47:44",
  "updated_at": "2017-05-18 16:47:44",
  "created_in": "Default Store View",
  "email": "mshaw@example.com",
  "firstname": "Melanie",
  "lastname": "Shaw",
  "store_id": 1,
  "website_id": 1,
  "addresses": [],
  "disable_auto_group_change": 0,
  "extension_attributes": {
    "company_attributes": {
      "customer_id": 13,
      "company_id": 0
    }
  }
}
```
