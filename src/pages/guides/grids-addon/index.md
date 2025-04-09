---
keywords:
    - Adobe Express
    - Express Add-on SDK
    - Express Document API
    - Document Model Sandbox
    - Adobe Express
    - Add-on SDK
    - SDK
    - JavaScript
    - Extend
    - Extensibility
    - API
title: Building your first add-on with the Document API
description: This is an in-depth tutorial that will guide you in the creation of a Grids add-on for Adobe Express using the Document API
contributors:
    - https://github.com/undavide
---

# Building your first add-on with the Document API

This tutorial will guide you through the creation of your first Adobe Express add-on based on the Adobe Express Document API.

## Introduction

Hello, and welcome to this Adobe Express Document API tutorial, where we'll build together a **fully functional Grid System add-on** from scratch. Grid systems are widely used in the design world to bring structure and consistency to all visual content, from flyers to web pages or social media posts.

<Embed slots="video"/>

https://www.youtube.com/watch?v=SQMYA660gII

![](../../images/grids-addon.png)

Your add-on will allow users to create a variable number of rows and columns, control the spacing between them (known as the _gutter_), and apply color overlays.

### Changelog

This tutorial has been written by [Davide Barranca](https://www.davidebarranca.com), software developer and author from Italy; revision history as follows.

**January 9th, 2024**

-   Added additional information on the project's setup.
-   Renamed `createStroke()` to `makeStroke()`: according to the new naming convention, `make*` is used for plain objects and helper utilities, whereas `create*` is reserved to live document objects, e.g., `createEllipse()`.
-   Improved explanations for importing Spectrum Web Components.

**December 3rd, 2023**

-   Removed the experimental warning from the document model sandbox APIs.
-   Importing `colorUtils` instead of `utils` from `"express-document-sdk"`; the built-in `colorUtils.fromHex()` method replaces the custom `hexToColor()`.
-   In the new API, nodes don't have the `fills` property (and it's `append()` method) anymore; instead, they use `fill`, to which a `ColorFill` is assigned.

**November 29th, 2023**

-   `apiProxy()` now accepts `"documentSandbox"` as a parameter, instead of `"script"`.
-   `manifest.json` now accepts `"documentSandbox"` in lieu of the `"script"` property for the document sandbox entry point. This requires the `"@adobe/ccweb-add-on-scripts"` dependency to be updated to version `"^1.1.0"` or newer in the `package.json` file.
-   `addOnSandboxSdk` is now imported from `"add-on-sdk-document-sandbox"` (it used to be `"AddOnScriptSdk"`).
-   `editor` and other modules are now imported from `"express-document-sdk"` (it used to be `"express"`).
-   The `webpack.config.js` file has been updated to reflect the new imports (see the `externals` object) in both the `express-grids-addon` and `express-addon-document-api-template` projects.
-   `Constants` are now `constants` (lowercase), and their enumerations have changed (e.g., `BlendModeValue` is now `BlendMode`).
-   `translateX` and `translateY` have conflated in the new `translation` property.
-   The group's warning about the operations order (create, append, fill) has been removed; groups can now be created, filled and appended.

**November 21st, 2023**

-   Editor API are now called the Document API, which are part of the Document Model Sandbox.
-   Update the add-on folders to reflect the new naming convention (`script` is now `documentSandbox`).
-   Update Reference Documentation links and screenshots.

**November 6th, 2023**

-   First publication.

### Prerequisites

-   Familiarity with HTML, CSS, JavaScript.
-   Familiarity with the Adobe Express add-ons environment; if you need a refresher, follow the [quickstart](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) guide.
-   An Adobe Express account; use your existing Adobe ID or create one for free.
-   Node.js version 16 or newer.

### Topics Covered

<List slots="text1, text2" repeat="4" iconColor="#2ac3a2" icon="disc" variant="fullWidth" />

[iframe and Document Model Sandbox communication](#the-communication-api)

[Spectrum Web Components](#designing-the-ui-with-spectrum-web-components)

[Adobe Express Document API](#the-document-api)

[Color Pickers](#designing-the-ui-with-spectrum-web-components)

[Nodes insertion point](#creating-the-first-shape)

[Creating and manipulating shapes](#creating-the-first-shape)

[Grouping elements](#organizing-the-code)

[Context permanence](#deleting-grids)

<Embed slots="video" />

../../images/grids-addon-animation.mp4

### Getting Started with the Document API

As part of the [Document Model Sandbox](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon), the Adobe Express Document API (from now on, Document API) is a powerful tool that extends the capabilities of Adobe Express add-ons, offering direct interaction with the open document. Let's take a moment to review the difference between the two core components of the architecture of an add-on.

-   The **iframe** hosts the add-on User Interface and runs its internal logic. You can think about it as a web application operating in a sandboxed environment: it needs to be separate from the rest of the Adobe Express content for security reasons, which is precisely why the add-on is hosted within an `<iframe>` element (a detailed technical description is found [here](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon)). If you come from a CEP/UXP background, it's akin to developing the panel of an extension or plugin.
-   The **Document Model Sandbox**: allows you to operate on the document. It's a sandboxed JavaScript environment that communicates with the iframe (thanks to the [Communication API](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon)), providing access to the [Document API](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon). Drawing the parallel with CEP and UXP again, it represents scripting; that is, the possibility to drive Adobe Express programmatically and, for example, add pages or artboards, create new shapes, rotate or group them, etc.

This is a high-level overview of the overall structure; while the implementation has more technical nuances, there's no need to dive deeper now.

![](../../images/grids-addon-communication.png)

### The Project Structure

The complete code for the Grids System add-on can be found [here](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/express-grids-addon/): it is provided as a [complete project](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/express-grids-addon/grids-design-end), although it would be best if you followed along from [this starting point](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/express-grids-addon/grids-design-start), which sets up a JavaScript/Webpack environment with everything needed.[^1]

You can either clone the entire repository:

Or download it as a `.zip` file (click the green "Code" button and then "Download ZIP").

![](../../images/grids-addon-git.png)

Then `cd` in the project folder (either the `grids-design-start` or `grids-design-end` one) and run the following commands:

This will install the required dependencies, build the project, and then serve it locally on port 5241; if you need more clarification about how to load an add-on in Adobe Express, please refer to the [quickstart](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) guide for a step-by-step walkthrough.

Before jumping into the code, let's look at how the project is structured. At the time of this writing, the CLI provides a few templates, but Only ReactJS-based ones include the Document Sandbox while also having a Webpack configuration, which is preferable when using Spectrum Web Components (SWC). This project provides support for both of them.

![](../../images/grids-addon-folder-structure.png)

As usual, we'll work in the `src` folder while Webpack outputs the result in `dist`. The add-on entry point is `index.html`, which relies on `ui/index.js` for the iframe logic code (UI element handlers, etc.). The Document API entry point is instead `documentSandbox/code.js`, as defined in the `manifest.json`:

If you're wondering about `documentSandbox/shapeUtils.js`, it is an auxiliary file containing private code consumed by `code.js` that doesn't need to be exposed to the iframe in this specific project. The code of the blank template is as follows.

<InlineAlert variant="info" slots="text1" />

Please use the iframe and Document API tabs above to switch between the two domains and find a dropdown in the top-right corner to select which file to show.

The `index.html` contains a `<sp-theme>` wrapper, whose role is explained [here](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon), and just a button. There's already something going on in `index.js` and `code.js` instead, which we must understand.

## The Communication API

A crucial component of any add-on that consumes the Document API is the communication bridge with the iframe. As we've seen earlier, it's precisely the role of the **Communication API**.

The mechanism is straightforward: through the `runtime` object (`code.js`, line 2), you can invoke the `exposeApi()` method, which grants the iframe access to the object literal that is passed as a parameter. The iframe must get to the `runtime`, too, and use its `apiProxy()` method passing `"documentSandbox"`. This asynchronous call results in the same object whose `log()` can now be invoked.

![Add-on Communication API](../../images/grids-addon-communicationapi.png)

It would not be uncommon to define an object literal first and pass it to the `exposeAPI` later.

It's also possible to expose iframe methods to the Document Sandbox, i.e., using `apiProxy()` passing `"panel"`, but it's outside the scope of this tutorial—please refer to [this sample](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) to see it in action.

## The Document API

### Using the Reference Documentation

The Document API is rapidly expanding: to keep track of its progress, you must get accustomed to consulting the [Reference Documentation](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon).

![Add-on Communication API](../../images/grids-addon-reference.png)

In the left-navbar, you can browse through all the Classes (which Adobe Express elements are instantiated from), Interfaces and constants. It's a hierarchical representation of the Document API data structures: for instance, you can see that a [`RectangleNode`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) is a subclass of the [`FillableNode`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon), which in turn subclasses the [`StrokableNode`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon), which eventually is just a particular kind of [`Node`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon)—the base class.

Some properties are shared among the `RectangleNode` and, say, other `StrokableNode` subclasses such as the `EllipseNode`: for instance, the `opacity`, or `blendMode`. Other ones are unique, like the `topLeftRadius`, which, in the context of an `EllipseNode`, wouldn't make sense.

### Creating the first Shape

It's finally time to start laying down some elements. Let's hook the only iframe button currently available to a function exposed by the Document API. Type the following into the source files (`index.html`, `index.js`, and `code.js` have been edited), then run the add-on.

Please note that it's considered good practice to initially **disable all interactive elements** that need to communicate with the Document API. In this case, there's only one CTA (Call To Action) `<sp-button>`, but generally any other elements that can make changes to the document should be treated similarly. You should enable them only when the `addOnUISdk` and `addOnSandboxSdk` are initialized, and event listeners are properly set (see `index.js` line 13).

The `createShapeButton` invokes the `createShape()` method defined and exposed in `code.js` (lines 7-19), passing an option object with arbitrary `width` and `height` properties. The function reveals key insights about the Document API—let's have a deeper look at the code.

According to the Reference, `createRectangle()` is a method of the [`Editor`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) class, which must be imported from `"express-document-sdk"` with the following statement.

We'll also make use of `colorUtils` and `constants`—they are named imports from `"express-document-sdk"`, too. The `createRectangle()` function doesn't need any parameter, either required or optional; hence, the properties of this new element must be set after its creation.

Dimensions and positions are straightforward while assigning a fill color is a two-step process.

First, you make use of the `fromRGB()` method from the `colorUtils` class, which expects four parameters in the (0..1) range: R, G, B and an optional Alpha, and returns a [Color](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) instance. Then, you use such color to create either a fill or stroke—here, we're using `makeColorFill()`. Finally, you set it to the shape by assigning it to the `fill` property.

<InlineAlert variant="info" slots="text1" />

Strokes are created with the `editor.makeStroke()` method, which accepts more parameters (all optional). It's documented [here](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon).

The `rect` object now exists as a `RectangleNode` instance with a width of 200 pixels, a height of 100, the top-left corner at the coordinate (50, 50) and a pastel pink fill color. But **it still needs to be rendered on the page!**

Let's unpack this line. As it usually happens with any DOM (Document Object Model), it's easier if read _backwards_—from the end to the beginning. We are appending the `rect` object to the `children` list of the `insertionParent` (which is "the _preferred parent_ to insert newly added content into") of the `context` (the "User's current selection context"), a property of the `editor` class.[^2]

In other words, we're adding `rect` as a sibling of whatever happens to be active at the moment: this is what the `context.insertionParent.children` dance does. If you try to add `rect` while a shape nested inside a group is selected, then `rect` will also belong to that group. Please note that Adobe Express documents are based on data structures where instances are _appended_ to collections: you `append()` a rectangle to a container's `children` collection.[^3]

![](../../images/grids-addon-shape.png)

Alternatively, you can target the insertion point specifically rather than relying on what happens to be selected at the time of execution. For instance, the following code uses the first [Artboard](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) of the first [Page](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon).

Quoting a revealing bit of the Page reference:

> A PageNode represents a page in the document. A page contains one or more artboards, representing "scenes" in a linear timeline sequence. Those artboards, in turn, contain all the visual content of the document.

You now understand the fundamentals of the Adobe Express DOM and the hierarchical relations between nodes. You have all the necessary tools to begin coding the Grids add-on; you can always refer to the documentation when needed.

## Coding the Grids add-on

### Designing the UI with Spectrum Web Components

Although the main subject of this tutorial is the Document API, let's spend a moment discussing the Grid add-on's User Interface. It's built mainly with **Spectrum Web Components** (see [this guide](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) for a refresher on Adobe's UX Guidelines and the use of the Spectrum Design System), in particular:

-   `<sp-number-field>` for the Rows and Columns inputs;
-   `<sp-slider>` for the Gutter;[^4]
-   `<sp-swatch>` for the color picker;
-   `<sp-button-group>` and `<sp-button>` for the CTA buttons.

The layout is based on nested FlexBox CSS classes, such as `row` and `column`. Because of the fixed width, margins are tight; the design has also been compacted along the Y-axis for consistency.

![](../../images/grids-addon-swc.png)

Please remember that any Spectrum Web Component you use must be installed and imported into the project first—refer to the instructions on [their official site](https://opensource.adobe.com/spectrum-web-components/) and [this guide](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon). In a nutshell, find the package name in each component's documentation, and then `npm install` the ones you need.

Finally, import them in the `ui/index.js` file.

<InlineAlert variant="warning" slots="text1" />

Mind the import names: for example, you install a `@spectrum-web-components/button`, but you import it as `@spectrum-web-components/button/sp-button.js` (with the `sp-` prefix).

The only tricky UI bit worth mentioning here is relative to the **color pickers**. SWC features a variety of color-related components (Color Area, Color Handle, Color Loupe, Color Slider) but not an actual picker. This add-on implements it via a `<sp-swatch>` for the UI and a hidden native `<input>` element behind it.

The `<sp-swatch>` click handler programmatically triggers the `<input>` click, which, although hidden, can still display the browser's native color picker. On `input` (i.e., when the user selects a different color within the picker), the `color` attribute of the `<sp-swatch>` controlling its fill is changed accordingly to keep both of them in sync. Please note that their values are initialized in `ui/index.js` for convenience—setting them in `index.html` would be equally fine.

![](../../images/grids-addon-picker.png)

Please refer to the source code for other details on the HTML structure, which are not discussed here for brevity's sake.

### Collecting values from the UI

Let's finish the UI, completing the code for `ui/index.js`. As you can see, it is all standard JavaScript: besides the color pickers we've just discussed, Rows, Columns and Gutter values are initialized (lines 17-19); the Document Sandbox is retrieved, and everything the Document API exposes is stored in the `sandboxProxy` constant (lines 9-10).

Eventually, the two buttons (Delete and Create) invoke methods exposed by the Document API, respectively `deleteGrid()` and `createGrid()`. The latter expects an options object with `rows`, `columns`, `gutter`, `columnColor`, and `rowColor` properties.

### Validation and Error Handling

It's worth taking a moment to discuss good validation and error-handling practices at this stage. Just as the QA engineer walking into a bar in the [famous joke](https://twitter.com/brenankeller/status/1068615953989087232), you must ensure that user input aligns with what the grid algorithm expects; for example, that it receives unsigned integers.

For this tutorial, we'll limit ourselves to setting `min` and `max` values for the Rows, Columns, and Gutter ranges. This will prevent scenarios like creating a negative number of columns. In a typical implementation, you'd want to insert a validation routine before invoking the primary function. Depending on the algorithm's and the UI's complexity, this routine might belong to the iframe, the Document Sandbox, or both. Additionally, apart from validating value type and range, you may want to ensure that the Gutter size is compatible with the chosen number of Rows and Columns to prevent them from overflowing the page dimensions.[^5]

Another crucial notion is to avoid silent failures: every action should either succeed or provide the user with a notification if it doesn't. That's why, for instance, the Delete button is left disabled until a set of grids is created; instead of handling the removal of a non-existent grid, it's preferable to prevent it in the first place.

### Creating Rows and Columns

It makes sense to approach this grid business with some caution, as we're just starting with the Document API. Let's set up `documentSandbox/code.js` to expose this `addGrid()` method and manage the argument provided.

When the user clicks the Create button, the parameters from the UI are properly collected, passed to `addGrid()` in the Document Sandbox, and logged. So far, so good, the Communication API does its job.

![](../../images/grids-addon-console.png)

To begin with, we'll create rows: rectangles that must be as wide as the page. To calculate their height, first, subtract the total number of gutters (which is equal to the number of rows plus one) from the page height. Then, divide the resulting value by the number of rows.

This is because we're using gutters as page margins, too, as the following illustration shows.

![](../../images/grids-addon-rowheight.png)

We must get hold of the [Document](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) (as `documentRoot`, from the Editor class) and [Page](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon)—the first one from the `pages` list will be OK for our purposes. Page properties like `width` and `height` will be used to compute the attributes of each "row" Rectangle.

In case you want to use the currently active Page instead, you have to traverse back to it using the `insertionParent` property of the `context` we've seen earlier as a starting point, and its `parent` property until you reach a node whose `type` is equal to the string `"Page"`. Adobe Express documents must have at least one page, so this is a safe operation. Modify the `addGrid()` function as follows.

To draw all four (or any number coming from the UI) rectangles at once, a loop is in order.

We've created all the needed rectangles, shifting them on the Y-axis according to their number and gutter, collecting them in a `rowsRect` array; which, in turn, we've looped through to append them all to the first `artboard` in the page.


<InlineAlert variant="info" slots="text1" />

Please remember that you must always `append()` elements to their container's `children` property.

Using the same principles, we can create columns: rectangles as tall as the page and whose width we can compute.

We now have most of what is needed to complete the Grids add-on; we're in dire need of a better structure, though.

### Organizing the code

The Grid creation process can be split into **smaller, separate steps**—we can take this chance to think about how to structure the entire project.

-   Creating a rectangle is best handled using a dedicated `createRect()` function.
-   Rows and Columns can be separate processes, too.
-   `code.js` doesn't need to expose anything else but the `addGrid()` and `deleteGrid()` methods.
-   `addRows()` and `addColumns()` can belong to the `shapeUtils.js` module and imported in `documentSandbox/code.js`, while `createRect()` will be kept as private.

As planned, `createRect()` conveniently acts as a rectangles factory function, consumed by `addRows()` and `addColumns()`. Since the color is received as a Hex string (like `"#ffcccc"`), we make use of the `colorUtil.fromHex()` method to convert into a Color instance—see `shapeUtils.js`, line 9.

It'd be nice to group rows and columns. The Editor class provides a [`createGroup()`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) method returning a [`GroupNode`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon). Like all `ContainerNode` classes, it has a `children` property, which we can append rectangles to.

![](../../images/grids-addon-groups.png)

To complete the project, we can add some finishing touches. Groups can be locked: preventing accidental shifts and transformations would be nice indeed. The Reference documentation comes in handy again with the boolean [`locked`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) property, which we can easily set after populating the group.


The Reference also shows an interesting [`blendMode`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon): setting it to [`multiply`](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) will produce a visually nicer overlay effect ([opacity](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon) can be an alternative).


At present, the Reference includes only a few enumerations, such as `BlendMode`. As the Document API expands, more enumerations will be added. They provide sets of named constants, making the code more readable by replacing direct numeric values with descriptive names.

<InlineAlert variant="warning" slots="text1" />

For example, the Multiply blend mode corresponds to the number 3. Although, developers should avoid hard-coding enum's values, as they are for internal use and subject to change.

It would be preferable if a single group contained Rows and Columns; we must edit both `addRows()` and `addColumns()` first to return their group in order to reference them in the parent one.

### Deleting Grids

Although not exposed through the Communication API, the `gridRef` variable is private to `code.js`, and exists within the closure of the functions defined inside and exposed by `runtime.exposeApi()`.[^6]

## Next Steps

Congratulations! You've coded from scratch the Grids Design System add-on. This proof-of-concept may be extended to make it even more useful as a product; you may implement the following features as an exercise.

-   **Page margins**: we're using the gutter for this purpose, but a proper `<sp-number-field>` can be added to allow users to set margins.
-   **Visibility toggle**: Use a `<sp-slider>`to control the grid's opacity, or add a `<sp-switch>` to toggle them on and off.
-   **Presets**: a dropdown menu might store commonly used grid sets—use a `<sp-picker>` and the [Client Storage API](https://stage--adp-devsite--adobedocs.aem.page/express/add-ons/docs/guides/tutorials/grids-addon).

## Lessons Learned

Let's review the concepts covered in this tutorial and how they've been implemented in the Grids add-on.

-   The **iframe** and the **Document Sandbox** are two distinct entities able to share contexts via the Communication API. We've used the `exposeApi()` method of the `runtime` object to allow the iframe to invoke functions in the Document API domain.
-   The **Document API** provides access to Adobe Express' Document Object Model, which defines containment structures and inheritance hierarchies. We've retrieved the document, its pages, and artboards; created, moved and assigned blending modes to shapes; created, populated and locked groups.
-   Nodes (elements) in Adobe Express documents can be added to the document in a position relative to the currently active selection or targeting a container as the **insertion point**; we've seen how `ContainerNode` elements have a `children` collection to `append()` elements to.
-   The Document API **context is permanent** in between iframe calls. We've seen that it's possible to store a reference to a Node within the exposed methods' closure and act upon it after its creation.
-   **Spectrum Web Components** are crucial to UI building, but sometimes they require customization; in this project, we've linked a `<sp-swatch>` to a traditional `<input>` element to create an Adobe Express' native-looking color picker.

## Final Project

The code for this project can be downloaded [here](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/express-grids-addon). It's available in two states: the starting point (one Create Shape button in the UI and the respective Document API function) if you want to follow along with the tutorial and type in the code—the best way to learn—and the final state, which code is also found below for convenience.


[^1]: Alternatively, you can use this [blank template](https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/express-addon-document-api-template) and start from scratch, but you'd need to manually add the `documentSandbox/shapeUtils.js` file and the various Spectrum imports.
[^2]: The quotes are from the Documentation Reference of each element.
[^3]: The terms "list" is used in the Adobe Express reference documentation, while "collection" may be more familiar to CEP/UXP developers; they are used interchangeably here.
[^4]: It could have been another `<sp-number-field>`, but a slider played well with the overall design.
[^5]: For example, you may want to retrieve the page's `width` and `height` properties at the beginning, and use them in the rest of the code.
[^6]: Future versions of the Document API may provide more deliberate ways to refer to elements.
