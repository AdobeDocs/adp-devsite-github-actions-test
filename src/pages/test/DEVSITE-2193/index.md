---
title: DEVSITE-2193 - Code line numbers in Accordion
description: Reproduces the issue where Code blocks inside Accordion blocks do not show line numbers.
---

# DEVSITE-2193: Code Line Numbers in Accordion

## Standalone Code Block (has line numbers - expected behavior)

```javascript
const greeting = 'hello';
console.log(greeting);
function add(a, b) {
  return a + b;
}
```

## Accordion with Code Block (should also have line numbers)

<AccordionItem slots="heading, code"/>

### Example with JavaScript Code

```javascript
const greeting = 'hello';
console.log(greeting);
function add(a, b) {
  return a + b;
}
```

<AccordionItem slots="heading, code"/>

### Example with JSON Code

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "Test payload"
}
```

<AccordionItem slots="heading, text, code"/>

### Example with Text and Code

This accordion item has both a text description and a code block.

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```
