---
title: Validate Links 404 Test
description: Tests that remark-validate-links missing-file reports as error, not warning
---

## Valid Links (should NOT trigger missing-file)

- [Existing sibling file](./index.md)
- [Parent index](../index.md)
- [Another test file](./md-extention.md)

## Broken Links (SHOULD trigger missing-file as ERROR)

- [Nonexistent page](./this-page-does-not-exist.md)
- [Nonexistent nested page](./nonexistent-dir/page.md)
