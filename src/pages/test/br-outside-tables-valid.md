---
title: Line Breaks Outside Tables - Valid
description: Line break forms outside tables that should pass lint and render correctly.
---

# Line Breaks Outside Tables - Valid

Every case on this page should pass `npm run lint` and deploy without errors.

## Escaped breaks in paragraphs

Documented form: first\<br/>second

Escaped closing slash: first\<br/\>second

Space before break: first / \<br/>second

## Escaped breaks in lists

- Item with a break: first\<br/>second
- Item with an escaped closing slash: first\<br/\>second

## Inline code

Unescaped break in code: `<br/>`

Malformed break in code: `<br/\>`

Slash-prefixed break in code: `/<br/\>`

## Fenced code

```markdown
first<br/>second
first<br/\>second
first / <br/\>second
first/<br/\>second
```
