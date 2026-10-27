---
title: Bracket in Code Block Test
description: Test that angle brackets inside fenced code blocks are NOT flagged
---

# Bracket in Code Block Test

## Code block with JSX components (should NOT error)

```jsx
<Flex direction="column" gap="size-200">
  <View>Hello</View>
  <Button variant="primary">Click me</Button>
</Flex>
```

## Code block with HTML table (should NOT error)

```html
<table>
  <tr>
    <td>Name</td>
    <td>Value</td>
  </tr>
  <tr>
    <td>foo</td>
    <td>bar</td>
  </tr>
</table>
```

## Code block with pipes AND angle brackets (should NOT error)

```bash
echo "hello" | grep "<pattern>"
cat file.txt | sed 's/<old>/<new>/g'
```

## Code block with markdown table containing brackets (should NOT error)

```markdown
| Component | Usage |
| --- | --- |
| <Flex> | Layout container |
| <View> | Generic container |
```

## Code block with details HTML (should NOT error)

```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content here</p>
</details>
```

## Code block with br in table-like content (should NOT error)

```html
| Column A | Column B |
| --- | --- |
| value1 <br> more | value2 |
```

## Actual table with unescaped brackets (SHOULD error)

| **Component** | **Description** |
| --- | --- |
| <Flex> | A flex layout container |
| <View> | A generic view container |
