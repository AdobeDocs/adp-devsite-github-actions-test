---
title: Internal Link Extension Test
description: Tests for remark-lint-internal-link-extension rule
---

## Valid Links (should pass)

- [Accordion](../blocks/accordion/index.md)
- [Inline Alert](../blocks/inline-alert/index.md)
- [Relative link](./index.md)
- [Parent link](../index.md)
- [With anchor](../blocks/accordion/index.md#usage)
- [With query](../blocks/accordion/index.md?v=1)
- [External link](https://developer.adobe.com/)
- [External http](http://example.com)
- [Email](mailto:test@adobe.com)
- [Phone](tel:+1234567890)
- [Anchor only](#section)
- [Image link](../assets/image.png)
- [PDF link](../assets/doc.pdf)
- [JSON link](../assets/data.json)

## Invalid Links (should fail)

- [Accordion](../blocks/accordion/)
- [Inline Alert](../blocks/inline-alert)
- [Index link](../blocks)
- [Relative no ext](./test-hero)
- [With trailing slash and anchor](../blocks/accordion/#usage)
