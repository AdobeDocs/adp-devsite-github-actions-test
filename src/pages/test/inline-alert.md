---
layout: none
---

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

warning Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text" variant="neutral"/>

neutral Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text" variant="info"/>

Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text" variant="warning"/>

Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text" variant="success"/>

Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text" variant="help"/>

Using an iconset reference from one of the `icons-workflow` or `icons-ui` packages in the `name` on an `sp-icon` should no longer be used (ie: `<sp-icon name="ui:Arrow100"></sp-icon>`), since it's deprecated. Use the specific named import mentioned in the first bullet above, instead.

<InlineAlert slots="text1,text2" />

**Join Us: Office Hours for Adobe Express Developers**

Receive real-time support, have your questions answered, and connect with both experts and peers for discussions on all things related to add-ons. Join us every month on Wednesdays at 8 AM PT. [Register for our next session here](https://developer.adobe.com/developers-live).

[ccintrev@adobe.com](mailto:ccintrev@adobe.com)

<DiscoverBlock slots="heading, link, text"/>

## API References

[CCEverywhere](../../v4/sdk/src/3p/cc-everywhere/classes/cc-everywhere.md)

Once you have successfully initialized the SDK, a Promise will be returned containing the `CCEverywhere` object.

<DiscoverBlock slots="link, text"/>

[Editor API](../../v4/sdk/src/workflows/3p/editor-workflow/classes/editor-workflow.md)

Provides API References for /Editor API.

<DiscoverBlock slots="link, text"/>

[Module API](../../v4/sdk/src/workflows/3p/module-workflow/classes/module-workflow.md)

Provides API References for /Module API.

<DiscoverBlock slots="link, text"/>

[Quick Action API](../../v4/sdk/src/workflows/3p/quick-action-workflow/classes/quick-action-workflow.md)

Provides API References for /Quick Action API.

<Columns slots="image, heading, text, links" variant="vertical" repeat ="4"/>

![Discover](./getting_started/img/devjourney-1-discovery.png)

### Discover

Explore how add-ons can expand capabilities and streamline creative workflows.

- [Find inspiration →](./getting-started/developer-journey.md#discover)

![Learn](./getting_started/img/devjourney-2-learn.png)

### Learn

Familiarize and experiment with powerful features in our Code Playground.

- [Dive deeper →](./getting-started/developer-journey.md#learn)

![Develop](./getting_started/img/devjourney-3-develop.png)

### Develop

Transform your ideas into a polished product following our best practices.

- [Start building →](./getting-started/developer-journey.md#develop)

![Distribute](./getting_started/img/devjourney-4-distribute.png)

### Distribute

Share your add-on with the world in the Adobe Express Marketplace.

- [Launch now →](./getting-started/developer-journey.md#distribute)


<Details slots="header , list" repeat="5"  summary="see the Changelog" />

**January 9th, 2024**

- Added additional information on the project's setup.
- Renamed `createStroke()` to `makeStroke()`: according to the new naming convention, `make*` is used for plain objects and helper utilities, whereas `create*` is reserved to live document objects, e.g., `createEllipse()`.
- Improved explanations for importing Spectrum Web Components.

**December 3rd, 2023**

- Removed the experimental warning from the document model sandbox APIs.
- Importing `colorUtils` instead of `utils` from `"express-document-sdk"`; the built-in `colorUtils.fromHex()` method replaces the custom `hexToColor()`.
- In the new API, nodes don't have the `fills` property (and it's `append()` method) anymore; instead, they use `fill`, to which a `ColorFill` is assigned.

**November 29th, 2023**

- `apiProxy()` now accepts `"documentSandbox"` as a parameter, instead of `"script"`.
- `manifest.json` now accepts `"documentSandbox"` in lieu of the `"script"` property for the document sandbox entry point. This requires the `"@adobe/ccweb-add-on-scripts"` dependency to be updated to version `"^1.1.0"` or newer in the `package.json` file.
- `addOnSandboxSdk` is now imported from `"add-on-sdk-document-sandbox"` (it used to be `"AddOnScriptSdk"`).
- `editor` and other modules are now imported from `"express-document-sdk"` (it used to be `"express"`).
- The `webpack.config.js` file has been updated to reflect the new imports (see the `externals` object) in both the `express-grids-addon` and `express-addon-document-api-template` projects.
- `Constants` are now `constants` (lowercase), and their enumerations have changed (e.g., `BlendModeValue` is now `BlendMode`).
- `translateX` and `translateY` have conflated in the new `translation` property.
- The group's warning about the operations order (create, append, fill) has been removed; groups can now be created, filled and appended.

**November 21st, 2023**

- Editor API are now called the Document API, which are part of the Document Model Sandbox.
- Update the add-on folders to reflect the new naming convention (`script` is now `documentSandbox`).
- Update Reference Documentation links and screenshots.

**November 6th, 2023**

- First publication.

---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extensibility
  - API
title: Adobe Express Add-on Tutorials
description: Adobe Express Add-on Tutorials covering the Adobe Express Add-on SDK and Document API
contributors:
  - https://github.com/hollyschinsky  
  - https://github.com/undavide
---

# Tutorials

In this page, you'll find a variety of tutorials covering the Adobe Express Add-on UI SDK and Document Sandbox APIs.

<Info-Card slots="link, image, heading, text" repeat="4" />

[Express Document API](grids-addon.md)

![Grids add-on](../../how_to/tutorials/images/thumbs-grids-addon.png)

### Creating a Grid System add-on with the Adobe Express Document API

Davide Barranca - November 6th, 2023

[Stats add-on](stats-addon.md)

![Stats add-on](../../how_to/tutorials/images/thumbs-stats-addon.png)

### Creating a Stats add-on with the Adobe Express Communication API

Davide Barranca - December 14th, 2023

[Express Document API](spectrum-workshop/index.md)

![Grids add-on](../../how_to/tutorials/images/bingo-v1-addon.png)

### Building UIs using Adobe's Spectrum Design System

Holly Schinsky - January 25th, 2024

[Markdown Parser add-on](../../how_to/tutorials/markdown-parser-text-api.md)

![Markdown Parser add-on](../../how_to/tutorials/images/thumbs-markdown-addon.png)

### Create a Markdown Parser Add-on with the Text API

Davide Barranca - July 1st, 2025

