---
title: DEVSITE-2193 - Code line numbers in Accordion
description: Reproduces the issue where Code blocks inside Accordion blocks do not show line numbers, while standalone code blocks do.
---

# DEVSITE-2193: Code Line Numbers in Accordion

## Standalone Code (has line numbers - expected)

```javascript
const greeting = 'hello';
console.log(greeting);
function add(a, b) {
  return a + b;
}
```

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

### 2. Code Only (no table)

A simpler accordion item with just text and a code block.

```javascript
fetch('https://api.example.com/start')
  .then(response => response.json())
  .then(data => console.log(data));
```
