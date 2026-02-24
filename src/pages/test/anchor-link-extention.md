---
title: Anchor Link Extension Test
description: Tests for remark-lint-anchor-link-extension rule
---

## Valid Anchor Links (should pass)

- [With .md before anchor](../blocks/accordion/index.md#usage)
- [SideNav](../blocks/inline-alert/index.md#heading)
- [Anchor only](#section)
- [External with anchor](https://developer.adobe.com/docs#section)
- [Asset with anchor](../assets/image.png#ref)

## Invalid Anchor Links (should fail)

- [Trailing slash before anchor](../blocks/accordion/#usage)
- [Missing md before anchor](../blocks/inline-alert#heading)
- [SideNav Section](../blocks/sidenav/#header-format)
