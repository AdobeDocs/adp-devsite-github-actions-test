---
title: Inline HTML Comment Test
description: Tests for detecting inline HTML comments embedded within paragraph and list text
---

# Inline HTML Comment Test

## Valid — escaped comments (should pass)

Escaped comments are visible text and must not trigger the linter: \<!-- this is visible escaped content --\>

## Valid — comments inside fenced code blocks (should pass)

```html
<!-- This HTML comment is inside a code block and must not trigger -->
<p>Some content</p>
```

```js
// <!-- This is inside a JS code block and must not trigger -->
const x = 1;
```

## Valid — inline code span (should pass)

Use `<!-- comment -->` syntax to write HTML comments.

## Invalid — inline HTML comment within paragraph text (should fail)

Some paragraph text with an embedded comment <!-- TODO: add a link --> and more text after it.

## Invalid — inline HTML comment at end of list item (should fail)

- Creating dialogs within scripts can sometimes be tricky.<!--// TODO add link>
- This second item is fine with no comment.
