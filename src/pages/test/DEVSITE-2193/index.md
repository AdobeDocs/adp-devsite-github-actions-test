---
title: DEVSITE-2193 - Code line numbers in Accordion
description: Reproduces the issue where Code blocks inside Accordion blocks do not show line numbers.
---

# DEVSITE-2193: Code Line Numbers in Accordion

## With Table and Code

<AccordionItem slots="heading, table, text, code"/>

### 1. Initial Setup

| Step | Description | Duration | Status | Endpoint |
| --- | --- | --- | --- | --- |
| 1 | User initiates the process and the system begins loading resources | 0s | Starting | `/api/initialize` |

This action represents the beginning of a workflow. The system state transitions from idle to active.

```json
{
  "eventType": "process.start",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "data": {
    "sessionId": "abc123",
    "config": {
      "name": "Sample Process",
      "timeout": 60
    }
  }
}
```

<AccordionItem slots="heading, text, code"/>

### 2. Second Step

Subsequent step with a JavaScript code block.

```javascript
fetch('https://api.example.com/start', {
  method: 'POST',
  body: JSON.stringify({ sessionId: 'abc123' })
}).then(response => response.json())
  .then(data => console.log(data));
```
