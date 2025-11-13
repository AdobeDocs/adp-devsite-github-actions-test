---
title: Resources Block without Hero
description: Display a resources section with useful links without a hero banner for a simpler layout.
---

# Resources with no hero

<Resources slots="heading, links"/>

#### Resources

* [Quick start guide](getting-started/index.md)
* [Endpoint guides](endpoints/index.md)
* [API reference](https://github.com/AdobeDocs/data-collection-apis)
* [Github repository](https://github.com/AdobeDocs/data-collection-apis)

# Code Samples

Find inspiration and great reference examples by checking out our [code samples](https://github.com/AdobeDocs/express-add-on-samples) repo. A description of each sample and which features and technologies they use is available here for reference.

<InlineAlert slots="text" variant="info"/>

In addition to these code samples, you should also be sure to check out the [Templates section](guides/getting_started/dev-tooling.md#templates) in the **Development Tools** page for the options available for creating a starter project based on your favorite development stack.

## Using the samples

- Clone [the repo](https://github.com/AdobeDocs/express-add-on-samples) (or download the zip).
- `cd` into the folder of a sample you want to try.
- Run `npm install` to install the dependencies.
- Run `npm run build` to build the source.
- Run `npm run start` to start to start the server with your bundled sample
- Navigate to Adobe Express and load and use the locally running sample add-on with the add-on panel developer tools just as you would with your own.

**NOTE:** Before you run any samples, you must have previously run the `npx @adobe/create-ccweb-add-on` command to create your own add-on at least once to ensure the package is available and ready to use.

## [get-started](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/get-started)

Demonstrates how to get started with add-on development with a simple app that greets a user after a name is entered.

**Technologies Used:**

- HTML
- JavaScript
- CSS

**Note:** No specific add-on SDK features are used in this sample, it is meant to run a simple JavaScript app that can be loaded and run in the add-ons panel.

## [import-images-from-local](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-from-local)

Demonstrates how to use the add-on SDK's Import and Drag and Drop APIs to add images over click and drag and drop to a document.

**Technologies Used:**

- JavaScript
- CSS

**Features Leveraged:**

- [Import Content](./references/addonsdk/app-document.md) to add the image to the document when the gif is clicked.
- [Drag and Drop](./references/addonsdk/addonsdk-app.md#enabledragtodocument) to support dragging and dropping images to the document.
