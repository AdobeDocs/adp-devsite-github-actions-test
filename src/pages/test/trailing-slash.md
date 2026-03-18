---
title: Trailing Slash Test
description: Tests for trailing slash detection in remark-lint-internal-link-extension rule
---

## Valid Links (should pass — no trailing slash issues)

- [With .md](../blocks/accordion/index.md)
- [Relative .md](./index.md)
- [External trailing slash](https://developer.adobe.com/)
- [Anchor only](#section)
- [Asset](../assets/image.png)

## Invalid Links — trailing slash (should fail)

- [Trailing slash dir](../blocks/accordion/)
- [Root trailing slash](../blocks/)
- [Deep path slash](../guides/migrating/)
