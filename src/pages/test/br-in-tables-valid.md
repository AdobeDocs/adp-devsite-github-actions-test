---
title: Line Breaks in Tables - Valid
description: Table line break forms that should pass the no-br-in-tables lint rule and render correctly.
---

# Line Breaks in Tables - Valid

Every case on this page should pass `npm run lint` and render without errors.

## Escaped breaks

| Case | Value | Expected |
| ---- | ----- | -------- |
| Documented form | first\<br/>second | Line break |
| Escaped closing slash | first\<br/\>second | Line break |
| Space before break | first / \<br/>second | Line break |
| Bullets in a cell | • red\<br/>• green\<br/>• blue | Three lines |

## Inline code in a table

| Case | Value | Expected |
| ---- | ----- | -------- |
| Unescaped break in code | `<br/>` | Literal text |
| Malformed break in code | `<br/\>` | Literal text |
| Slash-prefixed break in code | `/<br/\>` | Literal text |

## Fenced code

```markdown
| Case | Value |
| ---- | ----- |
| Unescaped | first<br/>second |
| Malformed | first<br/\>second |
```
