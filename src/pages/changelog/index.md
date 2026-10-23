---
keywords:
  - Breaking changes
  - Added
  - Enhancements
  - What's new
  - Known Issues
  - Embed SDK changelog
  - Changelog
title: Changelog
description: All notable changes are documented in this page.

---

# Changelog

## [v3.0.0] 2026-10-14

### Documentation

- Added a new [Embedded Design Editor (EDE) concept guide](../api/1-4.md) that introduces EDE's configurable, focused creation experiences, along with companion [Create Design](../concepts/ede-create-design.md) and [Edit Design](../api/index.md) guides.
- Added a new [Embedded Design Editor tutorial](../blocks/accordion/index.md) that walks through building a Create Design → Edit Design flow step by step.

-[Demo image](../assets/cc-hero.png)

## 2026-09-16

### Added

- [`migrateAssets()`](../blocks/announcement/index.md): Added support for asset migration (guest to logged-in user) in the [Partner Assertion](../blocks/code/code-highlighted-line.md) workflow.
- [`DesignViewerContext`](../blocks/code/code-in-list.md): Added support for accessing the context of the Design Viewer, allowing host applications to provide additional assets after the initial load via the [`updateDesignAssets`](../blocks/code/code-in-list.md#updatedesignassets) method.
- [`hideTemplatePreview`](../blocks/code/code-in-table.md): Added a configuration option to hide Template Preview, allowing clients to navigate directly to the editor after selecting a template.

## Test 2026-09-02

### Added

- [`editorGuideConfig`](../blocks/code/code-in-table.md): Added a new property to configure the visibility of Bleed, Margins, and Rulers in the Edit Design module's UI.
- [`pdfPrintConfig`](../blocks/code/code-in-table.md): Added a new property to configure the print-ready PDF export in the Edit Design module (`"print"` variant), including Crop Marks, Bleed, Color Mode, and ICC Profile.

### Fixed

- `createDesign()` with `"print"` variant now correctly displays bleed in the editor preview.

### Documentation

- Added a new [Analytics concept guide](../blocks/code/code-in-table.md) that explains how partners can configure the required analytics data to provide consistent launch attribution for Embed SDK workflows.

## Test check url

### API Enhancement

- [`CCEverywhere.BaseAppConfig.useClientAuth`](../blocks/code/code.md): Added a new feature to enable no consumption of credits for Generative AI workflows. This configuration can only be used for Generate Image and Edit Image workflows for selected enabled partners.
- **[`CCEverywhere.CallBackTarget.CALLBACK`](../../v4/shared/src/types/export-config-types/enumerations/call-back-target.md#callback)**: Added a new callback export target to trigger callback actions without publishing or downloading assets.
- **Custom Message Workflow**:
  - Added [`WORKFLOW_CONTEXT`](../blocks/code/code-overload.md) message type for module-specific communication.
  - New [`CustomMessage`](../blocks/code/code-in-table.md) interface includes instance ID, request ID, action, intent, and optional data.
  - Added [`CustomMessageAction`](../blocks/code/code-in-table.md) enum with actions for notifying unsaved changes and requesting assets.
- **[`CCEverywhere.ModalContainerConfig.showExpressIconWithText`](../blocks/code/code-in-table.md)**: the new default loading experience will include the Express logo plus text.

### Tech Enhancement

- **[CCEverywhere.BaseEditorAppConfig.canvasBackgroundColor](../blocks/code/code-in-table.md)**: Added support to configure the canvas background color (String in the `RRGGBBAA` HEX format).


## v1.52.16 2026-08-31

### API Enhancement

- **[`CCEverywhere.ModuleWorkflow.CancelCallback`](../blocks/code/code-in-table.md)**: Added optional parameter `isEscapePressed` as part of `onCancel` callback which is `true` if the cancel was triggered by escape key press during loading.
- **[`CCEverywhere.HostInfo.coiEnabled`](../blocks/code/code-in-table.md)**: Added property in `HostInfo` to indicate if COI (Cross-Origin Isolation) is enabled for client.
- **[`CCEverywhere.BaseContainerConfig.iframeTitle`](../blocks/code/code-in-table.md)**: Added support to configure iframe title for accessibility.

### Tech Enhancement

- **[`CCEverywhere.BrowseSearchBaseConfig.rootCollectionId`](../blocks/code/code-in-table.md)**: Added support to surface collections other than Express collections.

### Documentation

- Added a new comprehensive [Mobile Web Support Overview](../blocks/code/code-in-table.md) concept guide that covers implementing creative workflows on mobile devices, including configuration options, best practices, and troubleshooting guidance for cross-platform compatibility.
