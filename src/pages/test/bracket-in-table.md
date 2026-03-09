---
title: Bracket in Table Test
description: Test file for remark-lint-no-bracket-in-table rule
---

# Bracket in Table Test

## Table with brackets in inline code (should NOT error)

| **Parameter** | **Example** |
| --- | --- |
| country | `<Customer's country>` |
| id | `<externalReference.id>` |

## Table with escaped angle brackets (should NOT error)

| **Parameter** | **Value** |
| --- | --- |
| country | \<Customer's country\> |
| language | \<User's preferred language\> |

## Table with unescaped angle brackets (SHOULD error)

| **Parameter Name** | **Parameter Value** | **Description** |
| --- | --- | --- |
| country | US, GB, FR | <Customer's country> |
| language | EN, FR, DE | <User's preferred language> |
| id | number | Use <externalReference.id> as the identifier |
| format | string | Returns <response.format> value |
