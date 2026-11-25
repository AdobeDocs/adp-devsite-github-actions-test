---
title: Line Breaks Outside Tables - Invalid
description: Line break forms outside tables that are not valid content.
---

# Line Breaks Outside Tables - Invalid

Do not merge this page. The malformed breaks make deployment fail.

`npm run lint` fails with 5 `no-html-tags` errors for the unescaped breaks. The 4 malformed `<br/\>` breaks are not flagged, because `no-br-in-tables` only checks tables.

## Unescaped breaks in paragraphs

Unescaped HTML break: first<br>second

Unescaped self-closing break: first<br/>second

Unescaped break with space: first<br />second

Uppercase break: first<BR/>second

## Malformed breaks in paragraphs

Malformed break (VIPMP): first<br/\>second

Space and slash before malformed break: first / <br/\>second

Slash before malformed break: first/<br/\>second

## Breaks in lists

- Unescaped self-closing break: first<br/>second
- Malformed break: first<br/\>second
