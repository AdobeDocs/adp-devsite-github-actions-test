---
title: Create and Fill Rectangle Example
description: Interactive code example demonstrating how to create a rectangle with custom dimensions and color fill using the editor API.
playground-url: https://express.adobe.com/new?learn=creative-exercises&category=search
---

```js-data-line="3"-data-playground-session-id="createAndFillRectangle"-data-playground-mode="playground"-data-playground-session="new"-data-playground-execution-mode="script"-data-playground-url="https://express.adobe.com/new"
const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 100;
rectangle.height = 100;
rectangle.translation = { x: 100, y: 200 };
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.4, 0.6, 0.2, 0.4];
// Note: alpha param is optional
const aColor = colorUtils.fromRGB(red, green, blue, alpha);
const rectangleFill = editor.makeColorFill(aColor);
rectangle.fill = rectangleFill;

insertionParent.children.append(rectangle);
```
