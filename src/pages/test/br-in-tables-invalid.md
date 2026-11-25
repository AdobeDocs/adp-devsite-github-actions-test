---
title: Line Breaks in Tables - Invalid
description: Table line break forms that the no-br-in-tables lint rule should flag.
---

# Line Breaks in Tables - Invalid

Every row in this table should be flagged by `no-br-in-tables` (10 errors), so `npm run lint` fails. Some rows are also flagged by `no-html-tags` and `no-bracket-in-table`. The malformed `<br/\>` rows are flagged only by `no-br-in-tables`.

Do not merge this page. The malformed rows make deployment fail.

| Case | Value |
| ---- | ----- |
| `datasets[].filters.probability` | For the propensity dataset: `HIGH`, `MEDIUM`, or `LOW`. If omitted, allowed values are included. Duplicates are removed. / <br/\> **Note:** Currently, only `HIGH` is supported.|
| probability | Mapped propensity rating. Possible values are: `HIGH`, `MEDIUM`, or `LOW`. /<br/\>**Note:** Currently, only `HIGH` is supported.|