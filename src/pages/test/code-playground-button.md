---
title: Create and Fill Rectangle Example
description: Interactive code example demonstrating how to create a rectangle with custom dimensions and color fill using the editor API.
playground-url: https://express.adobe.com/new?learn=creative-exercises&category=search
---

```js-data-line="3"-data-playground-session-id="test-playground-rectangle"-data-playground-mode="playground"-data-playground-session="new"-data-playground-execution-mode="script"-data-express-url="https://stage.projectx.corp.adobe.com/new"
const insertionParent = editor.context.insertionParent; // get node to insert content into

const rectangle = editor.createRectangle();
rectangle.width = 200;
rectangle.height = 150;
rectangle.translation = { x: 100, y: 20 };
console.log(rectangle); // for debugging purpose

const [red, green, blue, alpha] = [0.8, 0.6, 0.2, 0.7];
// Note: alpha param is optional
const aColor = colorUtils.fromRGB(red, green, blue, alpha);
const rectangleFill = editor.makeColorFill(aColor);
rectangle.fill = rectangleFill;

insertionParent.children.append(rectangle);
```
