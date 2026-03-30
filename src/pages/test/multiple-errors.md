---
title: Multiple Errors Test
description: Test that all errors in a single file are reported at once
---

# Multiple Errors Test

This file intentionally has multiple lint errors from different rules.
All errors below should be reported in a single lint run.

## Error 1: Unescaped angle bracket in table

| **Parameter** | **Description** |
| --- | --- |
| <Customer's country> | The country code |

## Error 2: Internal link without .md extension

- [Link without extension](../blocks/accordion/)

## Error 3: Thematic break not supported

---
