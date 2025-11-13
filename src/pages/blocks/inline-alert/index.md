---
title: Inline Alert Block
description: Display inline alert messages for warnings, tips, and notes using the Inline Alert block.
---

# Inline Alert Example

// copied from https://github.com/adobe/aio-theme?tab=readme-ov-file#simple-inlinealert

<InlineAlert slots="text" />

This is the text that displays within the default alert variant — info.

// copied from https://github.com/adobe/aio-theme?tab=readme-ov-file#richer-inlinealert

<InlineAlert variant="help" slots="header, text1, text2, text3, text4" />

Alternative steps:

**Step 1:** This is faux step text for the `text1` slot.
This is faux step text for the `text1` slot.
This is faux step text for the `text1` slot.
This is faux step text for the `text1` slot.
This is faux step text for the `text1` slot.

**Step 2:** This is faux step text for the `text2` slot.
This is faux step text for the `text2` slot.
This is faux step text for the `text2` slot.

**Step 3:** This is faux step text for the `text3` slot.

**Step 4:** This is faux step text for the `text4` slot.
This is faux step text for the `text3` slot.

<InlineAlert slots="text" variant="warning"/>

This is an inline alert warning.
