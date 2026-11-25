---
title: Line Breaks Outside Tables - Invalid
description: Line break forms outside tables that are not valid content.
---

# Line Breaks Outside Tables - Invalid

Do not merge this page. The malformed breaks make deployment fail.

`npm run lint` fails with 5 `no-html-tags` errors for the unescaped breaks. The 4 malformed `<br/\>` breaks are not flagged, because `no-br-in-tables` only checks tables.


## Malformed breaks in paragraphs

Malformed break (VIPMP): first<br/\>second

Space and slash before malformed break: first / <br/\>second

Slash before malformed break: first/<br/\>second

## Breaks in lists

- Malformed break: first<br/\>second
