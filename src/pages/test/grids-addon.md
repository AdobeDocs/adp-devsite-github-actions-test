<CodeBlock slots="heading, code" repeat="4" languages="index.html, index.js, code.js, shapeUtils.js"/>

#### iframe

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="Adobe Express Add-on tutorial using JavaScript and the Document Sandbox" />
        <meta name="keywords" content="Adobe, Express, Add-On, JavaScript, Document Sandbox, Document API" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Grids add-on</title>
        <link rel="stylesheet" href="styles.css" />
    </head>

    <body>
        <sp-theme scale="medium" color="light" theme="express">
            <sp-button id="createShape">Create shape</sp-button>
        </sp-theme>
    </body>
</html>
```

#### iframe

```js
// Spectrum imports
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");
    const createShapeButton = document.getElementById("createShape");

    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");
    sandboxProxy.log("Document Sandbox up and running.");

    // Enabling CTA elements only when the addOnUISdk is ready
    createShapeButton.disabled = false;
});
```

#### Document API

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

function start() {
    runtime.exposeApi({
        log: (...args) => {
            console.log(...args);
        },
        // other properties will go here...
    });
}

start();
```

#### Document API

```js
// empty
```

```js
runtime.exposeApi({
    log: (...args) => {
        console.log(...args);
    },
    createShape: (shape) => {
        // ...
        this.log("Shape created."); // ❌
    },
});
```

The _method shorthand syntax_ provides a proper `this` reference instead.

```js
runtime.exposeApi({
    log(...args) {
        console.log(...args);
    },
    createShape(shape) {
        // ...
        this.log("Shape created."); // ✅
    },
});
```

<CodeBlock slots="heading, code" repeat="4" languages="index.html, index.js, code.js, shapeUtils.js"/>

#### iframe

```html
<body>
    <sp-theme scale="medium" color="light" theme="express">
        <sp-button id="createShape" disabled>Create shape</sp-button>
    </sp-theme>
</body>
```

#### iframe

```js
// ... usual imports

// Adding the sp-button import
import "@spectrum-web-components/button/sp-button.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");
    const createShapeButton = document.getElementById("createShape");

    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    createShapeButton.addEventListener("click", async () => {
        sandboxProxy.createShape({ width: 200, height: 100 }); // 👈
    });

    createShapeButton.disabled = false;
});
```

#### Document API

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;
import { editor, colorUtils, constants } from "express-document-sdk";

function start() {
    runtime.exposeApi({
        createShape({ width, height }) {
            // 👈
            const rect = editor.createRectangle();
            rect.width = width;
            rect.height = height;
            rect.translation = { x: 50, y: 50 };

            const col = colorUtils.fromRGB(0.9, 0.5, 0.9);
            const fillColor = editor.makeColorFill(col);
            rect.fill = fillColor;

            editor.context.insertionParent.children.append(rect);
        },
    });
}

start();
```

#### Document API

```js
// empty
```

```js
import { editor, colorUtils, constants } from "express-document-sdk";
```


```js
const rect = editor.createRectangle();
rect.width = width;
rect.height = height;
rect.translation = { x: 50, y: 50 };
```


```js
const col = colorUtils.fromRGB(0.9, 0.5, 0.9);
const fillColor = editor.makeColorFill(col);
rect.fill = fillColor;
```

```js
// appending the rect object to the scene
editor.context.insertionParent.children.append(rect);
```

```js
// ...
const doc = editor.documentRoot; // document
const currentPage = doc.pages.first; // page
const currentArtboard = currentPage.artboards.first; // artboard
currentArtboard.children.append(rect); // children
// or
editor.documentRoot.pages.first.artboards.first.children.append(rect);
```

```bash
npm install @spectrum-web-components/button
npm install @spectrum-web-components/action-button
npm install @spectrum-web-components/button-group
npm install @spectrum-web-components/field-label
npm install @spectrum-web-components/number-field
npm install @spectrum-web-components/slider
npm install @spectrum-web-components/swatch
npm install @spectrum-web-components/theme
```

```js
import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";
```

<CodeBlock slots="heading, code" repeat="2" languages="index.html, ui/index.js"/>

#### index.html

```html
<div class="row">
    <!-- ... -->
    <sp-swatch id="rowsColorSwatch" class="color-well"></sp-swatch>
    <input type="color" id="rowsColorPicker" style="display: none;" />
</div>
```

#### ui/index.js

```js
// Ref to the <sp-input type="color">
const rowsColorPicker = document.getElementById("rowsColorPicker");
// Ref to the <sp-swatch>
const rowsColorSwatch = document.getElementById("rowsColorSwatch");

// Initializing the colors for both of them
rowsColorPicker.value = "#ccccff";
rowsColorSwatch.color = "#ccccff";

// The <sp-swatch> click triggers the <input> click
rowsColorSwatch.addEventListener("click", function () {
    rowsColorPicker.click();
});

// The <input> click changes the <sp-swatch> fill with the picked color.
rowsColorPicker.addEventListener("input", function (event) {
    const selectedColor = event.target.value;
    rowsColorSwatch.setAttribute("color", selectedColor);
});
```

<CodeBlock slots="heading, code" repeat="2" languages="index.html, ui/index.js"/>

#### index.html

```html
<body>
    <sp-theme scale="medium" color="light" theme="express">
        <h2>Design Grid creator</h2>
        <div class="row gap-20">
            <div class="row">
                <div class="column">
                    <sp-field-label for="rows" size="m">Rows</sp-field-label>
                    <sp-number-field id="rows" min="1" max="20"> </sp-number-field>
                </div>
                <sp-swatch id="rowsColorSwatch" class="color-well"></sp-swatch>
                <input type="color" id="rowsColorPicker" style="display: none;" />
            </div>
            <div class="row">
                <div class="column">
                    <sp-field-label for="cols" size="m">Columns</sp-field-label>
                    <sp-number-field id="cols" min="1" max="20"> </sp-number-field>
                </div>
                <sp-swatch id="colsColorSwatch" class="color-well"></sp-swatch>
                <input type="color" id="colsColorPicker" style="display: none;" />
            </div>
        </div>
        <div class="row">
            <sp-slider
                label="Gutter"
                id="gutter"
                variant="filled"
                editable
                hide-stepper
                min="1"
                max="50"
                format-options='{"style": "unit", "unit": "px"}'
                step="1"
            ></sp-slider>
        </div>
        <sp-button-group horizontal>
            <sp-button id="deleteGrid" variant="secondary" disabled>Delete</sp-button>
            <sp-button id="createGrid" disabled>Create</sp-button>
        </sp-button-group>
    </sp-theme>
</body>
```

#### ui/index.js

```js
// All the SWC imports...

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    // Get the Document Sandbox.
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    // Input fields -------------------------------------------

    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const gutterInput = document.getElementById("gutter");

    rowsInput.value = 4;
    colsInput.value = 6;
    gutterInput.value = 10;

    // Color pickers ------------------------------------------

    const colsColorPicker = document.getElementById("colsColorPicker");
    const colsColorSwatch = document.getElementById("colsColorSwatch");
    const rowsColorPicker = document.getElementById("rowsColorPicker");
    const rowsColorSwatch = document.getElementById("rowsColorSwatch");

    colsColorPicker.value = "#ffcccc";
    colsColorSwatch.color = "#ffcccc";
    rowsColorPicker.value = "#ccccff";
    rowsColorSwatch.color = "#ccccff";

    colsColorSwatch.addEventListener("click", function () {
        colsColorPicker.click();
    });
    colsColorPicker.addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        colsColorSwatch.setAttribute("color", selectedColor);
    });

    rowsColorSwatch.addEventListener("click", function () {
        rowsColorPicker.click();
    });
    rowsColorPicker.addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        rowsColorSwatch.setAttribute("color", selectedColor);
    });

    // CTA Buttons --------------------------------------------

    const createGridBtn = document.getElementById("createGrid");
    const deleteGridBtn = document.getElementById("deleteGrid");

    deleteGridBtn.onclick = async (event) => {
        const res = await sandboxProxy.deleteGrid();
        if (res) {
            // When there's been an error deleting the grid, you may want to handle it here
        }
        deleteGridBtn.disabled = true;
    };

    createGridBtn.onclick = async (event) => {
        await sandboxProxy.addGrid({
            columns: colsInput.value,
            rows: rowsInput.value,
            gutter: gutterInput.value,
            columnColor: colsColorPicker.value,
            rowColor: rowsColorPicker.value,
        });
        deleteGridBtn.disabled = false;
    };

    // Only now it is safe to enable the button
    createGridBtn.disabled = false;
});
```

<CodeBlock slots="heading, code" repeat="1" languages="documentSandbox/code.js"/>

#### documentSandbox/code.js

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;
import { editor, colorUtils, constants } from "express-document-sdk";

function start() {
    runtime.exposeApi({
        addGrid({ columns, rows, gutter, columnColor, rowColor }) {
            console.log("addGrid", columns, rows, gutter, columnColor, rowColor);
        },
    });
}

start();
```

```text
rowHeight = (pageHeight - (rowsNumber + 1) * gutter) / rowsNumber;
```

```js
// ...
runtime.exposeApi({
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
        const doc = editor.documentRoot;
        const page = doc.pages.first;
        const rowWidth = page.width;
        const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
    },
});
```

```js
// ...
var rowsRect = [];
for (let i = 0; i < rows; i++) {
    let r = editor.createRectangle();
    r.width = page.width;
    r.height = rowHeight;
    // moving the row in place
    r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
    rowsRect.push(r);
}
// adding the rows to the page
rowsRect.forEach((rect) => page.artboards.first.children.append(rect));
```

```js
const doc = editor.documentRoot;
const page = doc.pages.first;
var colsRect = [];
const colWidth = (page.width - (cols + 1) * gutter) / cols;
for (let i = 0; i < cols; i++) {
    let r = editor.createRectangle();
    r.width = colWidth;
    r.height = page.height;
    r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
    cols.push(r);
}
cols.forEach((rect) => page.artboards.first.children.append(rect));
```

### Organizing the code

<CodeBlock slots="heading, code" repeat="2" languages="documentSandbox/code.js, documentSandbox/shapeUtils.js" />

#### documentSandbox/code.js

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { addColumns, addRows } from "./shapeUtils";

// Get the Document Sandbox.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    const sandboxProxy = {
        addGrid({ columns, rows, gutter, columnColor, rowColor }) {
            addRows(rows, gutter, rowColor);
            addColumns(columns, gutter, columnColor);
            // ...
        },
        deleteGrid() {
            // ...
        },
    };
    runtime.exposeApi(sandboxProxy);
}
start();
```

#### documentSandbox/shapeUtils.js

```js
import { editor, colorUtils, constants } from "express-document-sdk";

// Utility to create a rectangle and fill it with a color.
const createRect = (width, height, color) => {
    const rect = editor.createRectangle();
    rect.width = width;
    rect.height = height;
    // Fill the rectangle with the color.
    const rectangleFill = editor.makeColorFill(colorUtils.fromHex(color));
    rect.fill = rectangleFill;
    return rect;
};

const addRows = (rowsNumber, gutter, color) => {
    const page = editor.documentRoot.pages.first;
    var rows = [];
    const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
    for (let i = 0; i < rowsNumber; i++) {
        let r = createRect(page.width, rowHeight, color);
        r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
        rows.push(r);
    }
    rows.forEach((row) => page.artboards.first.children.append(row));
};

const addColumns = (columNumber, gutter, color) => {
    const page = editor.documentRoot.pages.first;
    var cols = [];
    const colWidth = (page.width - (columNumber + 1) * gutter) / columNumber;
    for (let i = 0; i < columNumber; i++) {
        let r = createRect(colWidth, page.height, color);
        r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
        cols.push(r);
    }
    cols.forEach((col) => page.artboards.first.children.append(col));
};

export { addColumns, addRows };
```

<CodeBlock slots="heading, code" repeat="5" languages="index.html, index.js, styles.css, code.js, shapeUtils.js" />

#### iframe

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="Adobe Express Add-on tutorial using JavaScript and the Document Sandbox" />
        <meta
            name="keywords"
            content="Adobe, Express, Add-On, JavaScript, Document Sandbox, Adobe Express Document API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Grids add-on</title>
        <link rel="stylesheet" href="styles.css" />
    </head>

    <body>
        <sp-theme scale="medium" color="light" theme="express">
            <h2>Design Grid creator</h2>
            <div class="row gap-20">
                <div class="row">
                    <div class="column">
                        <sp-field-label for="rows" size="m">Rows</sp-field-label>
                        <sp-number-field id="rows" min="1" max="20"> </sp-number-field>
                    </div>
                    <sp-swatch id="rowsColorSwatch" class="color-well"></sp-swatch>
                    <input type="color" id="rowsColorPicker" style="display: none;" />
                </div>
                <div class="row">
                    <div class="column">
                        <sp-field-label for="cols" size="m">Columns</sp-field-label>
                        <sp-number-field id="cols" min="1" max="20"> </sp-number-field>
                    </div>
                    <sp-swatch id="colsColorSwatch" class="color-well"></sp-swatch>
                    <input type="color" id="colsColorPicker" style="display: none;" />
                </div>
            </div>
            <div class="row">
                <sp-slider
                    label="Gutter"
                    id="gutter"
                    variant="filled"
                    editable
                    hide-stepper
                    min="1"
                    max="50"
                    format-options='{"style": "unit", "unit": "px"}'
                    step="1"
                ></sp-slider>
            </div>
            <sp-button-group horizontal>
                <sp-button id="deleteGrid" variant="secondary" disabled>Delete</sp-button>
                <sp-button id="createGrid" disabled>Create</sp-button>
            </sp-button-group>
        </sp-theme>
    </body>
</html>
```

#### iframe

```js
import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    // Get the Document Sandbox.
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    // Input fields -------------------------------------------

    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const gutterInput = document.getElementById("gutter");

    rowsInput.value = 4;
    colsInput.value = 6;
    gutterInput.value = 10;

    // Color pickers ------------------------------------------

    const colsColorPicker = document.getElementById("colsColorPicker");
    const colsColorSwatch = document.getElementById("colsColorSwatch");
    const rowsColorPicker = document.getElementById("rowsColorPicker");
    const rowsColorSwatch = document.getElementById("rowsColorSwatch");

    colsColorPicker.value = "#ffcccc";
    colsColorSwatch.color = "#ffcccc";
    rowsColorPicker.value = "#ccccff";
    rowsColorSwatch.color = "#ccccff";

    colsColorSwatch.addEventListener("click", function () {
        colsColorPicker.click();
    });
    colsColorPicker.addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        colsColorSwatch.setAttribute("color", selectedColor);
    });

    rowsColorSwatch.addEventListener("click", function () {
        rowsColorPicker.click();
    });
    rowsColorPicker.addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        rowsColorSwatch.setAttribute("color", selectedColor);
    });

    // CTA Buttons --------------------------------------------

    const createGridBtn = document.getElementById("createGrid");
    const deleteGridBtn = document.getElementById("deleteGrid");

    deleteGridBtn.onclick = async (event) => {
        const res = await sandboxProxy.deleteGrid();
        if (res) {
            // When there's been an error deleting the grid, you may want to handle it here
        }
        deleteGridBtn.disabled = true;
    };

    createGridBtn.onclick = async (event) => {
        await sandboxProxy.addGrid({
            columns: colsInput.value,
            rows: rowsInput.value,
            gutter: gutterInput.value,
            columnColor: colsColorPicker.value,
            rowColor: rowsColorPicker.value,
        });
        deleteGridBtn.disabled = false;
    };

    // Only now it is safe to enable the button
    createGridBtn.disabled = false;
});
```

#### iframe

```css
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

sp-theme {
    margin: 0 var(--spectrum-global-dimension-static-size-300);
    display: grid;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
}

.gap-20 {
    gap: var(--spectrum-global-dimension-static-size-250);
}

.gutter-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    align-items: flex-start;
    border: 1px solid black;
    margin-bottom: var(--spectrum-global-dimension-static-size-150);
}

.column {
    display: flex;
    flex-direction: column;
    padding-right: var(--spectrum-global-dimension-static-size-100);
    width: var(--spectrum-global-dimension-static-size-1000);
}

h2 {
    font-weight: var(--spectrum-global-font-weight-black);
}

sp-swatch {
    width: var(--spectrum-swatch-size-medium);
}

.color-well {
    cursor: pointer;
    --mod-swatch-border-thickness: var(--spectrum-divider-thickness-small);
    --mod-swatch-border-color: var(--spectrum-transparent-black-500);
}

sp-button {
    flex: 1;
    max-width: calc((100% - var(--spectrum-global-dimension-static-size-250)) / 2);
}

sp-number-field,
sp-slider {
    width: 100%;
}

sp-button-group {
    margin-top: var(--spectrum-global-dimension-static-size-300);
    width: 100%;
    display: flex;
    justify-content: space-between;
}
```

#### Document API

```js
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { addColumns, addRows } from "./shapeUtils";

// Get the Document Sandbox.
const { runtime } = addOnSandboxSdk.instance;

let gridRef = null;

function start() {
    // APIs to be exposed to the UI runtime
    runtime.exposeApi({
        /**
         * Add a grid to the document.
         *
         * @param {Object} options - The options for the grid.
         * @param {number} options.columns - The number of columns in the grid.
         * @param {number} options.rows - The number of rows in the grid.
         * @param {number} options.gutter - The size of the gutter between columns and rows.
         * @param {string} options.columnColor - The color of the columns.
         * @param {string} options.rowColor - The color of the rows.
         * @returns {Group} The group containing the grid.
         */
        addGrid({ columns, rows, gutter, columnColor, rowColor }) {
            // Get the document and page.
            const doc = editor.documentRoot;
            const page = doc.pages.first;
            // Create the grid.
            const rowGroup = addRows(rows, gutter, rowColor);
            const columnGroup = addColumns(columns, gutter, columnColor);

            // Create the grid's group.
            const gridGroup = editor.createGroup();
            page.artboards.first.children.append(gridGroup);
            gridGroup.children.append(rowGroup, columnGroup);
            gridGroup.locked = true;

            // Save the grid reference.
            gridRef = gridGroup;
        },

        /**
         * Delete the grid from the document.
         * @returns {void}
         */
        deleteGrid() {
            if (gridRef) {
                try {
                    gridRef.removeFromParent();
                    gridRef = null;
                } catch (error) {
                    console.error(error);
                    return "Error: the Grid could not be deleted.";
                }
            }
        },
    });
}

start();
```

#### Document API

```js
import { editor, colorUtils, constants } from "express-document-sdk";

/**
 * Create a rectangle with the specified width, height, and color.
 * Private utility of the shapeUtils module.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} color - The color of the rectangle in hex format.
 * @returns {RectangleNode} The created rectangle.
 */
const createRect = (width, height, color) => {
    const rect = editor.createRectangle();
    rect.width = width;
    rect.height = height;
    const rectangleFill = editor.makeColorFill(colorUtils.fromHex(color));
    rect.fill = rectangleFill;
    return rect;
};

/**
 * Add rows of rectangles to the document.
 *
 * @param {number} rowsNumber - The number of rows to add.
 * @param {number} gutter - The size of the gutter between rows.
 * @param {string} color - The color of the rows in hex format.
 * @returns {GroupNode} A group containing the created rows.
 */
const addRows = (rowsNumber, gutter, color) => {
    const doc = editor.documentRoot;
    const page = doc.pages.first;

    var rows = [];
    const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
    // Create the rectangles
    for (let i = 0; i < rowsNumber; i++) {
        let r = createRect(page.width, rowHeight, color);
        r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
        rows.push(r);
    }
    // Append the rectangles to the document
    rows.forEach((row) => page.artboards.first.children.append(row));
    // Create the group
    const rowsGroup = editor.createGroup();
    // Append the group to the document
    page.artboards.first.children.append(rowsGroup);
    // Populate the group with the rectangles
    rowsGroup.children.append(...rows);
    // Edit the group's properties
    rowsGroup.blendMode = constants.BlendMode.multiply;
    rowsGroup.locked = true;
    return rowsGroup;
};

/**
 * Add columns of rectangles to the document.
 *
 * @param {number} columsNumber - The number of columns to add.
 * @param {number} gutter - The size of the gutter between columns.
 * @param {string} color - The color of the columns in hex format.
 * @returns {GroupNode} A group containing the created columns.
 */
const addColumns = (columsNumber, gutter, color) => {
    const doc = editor.documentRoot;
    const page = doc.pages.first;
    var cols = [];
    const colWidth = (page.width - (columsNumber + 1) * gutter) / columsNumber;
    // Create the rectangles
    for (let i = 0; i < columsNumber; i++) {
        let r = createRect(colWidth, page.height, color);
        r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
        cols.push(r);
    }
    // Append the rectangles to the document
    cols.forEach((col) => page.artboards.first.children.append(col));
    // Create the group
    const columnsGroup = editor.createGroup();
    // Append the group to the document
    page.artboards.first.children.append(columnsGroup);
    // Populate the group with the rectangles
    columnsGroup.children.append(...cols);
    // Edit the group's properties
    columnsGroup.blendMode = constants.BlendMode.multiply;
    columnsGroup.locked = true;
    return columnsGroup;
};

export { addColumns, addRows };
```
