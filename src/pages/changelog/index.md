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

- Added a new [Embedded Design Editor (EDE) concept guide](../concepts/ede.md) that introduces EDE's configurable, focused creation experiences, along with companion [Create Design](../concepts/ede-create-design.md) and [Edit Design](../concepts/ede-edit-design.md) guides.
- Added a new [Embedded Design Editor tutorial](../tutorials/embedded-design-editor.md) that walks through building a Create Design → Edit Design flow step by step.

-[Demo image](../assets/cc-hero.png)

## 2026-09-16

### Added

- [`migrateAssets()`](../../v4/sdk/src/workflows/3p/module-workflow/classes/module-workflow.md#migrateassets): Added support for asset migration (guest to logged-in user) in the [Partner Assertion](../../v4/shared/src/types/authentication-types/index.md#interfaces) workflow.
- [`DesignViewerContext`](../../v4/sdk/src/context/3p/design-viewer-context/classes/design-viewer-context.md): Added support for accessing the context of the Design Viewer, allowing host applications to provide additional assets after the initial load via the [`updateDesignAssets`](../../v4/sdk/src/context/3p/design-viewer-context/classes/design-viewer-context.md#updatedesignassets) method.
- [`hideTemplatePreview`](../../v4/shared/src/types/module/app-config-types/interfaces/browse-mode-config.md#properties): Added a configuration option to hide Template Preview, allowing clients to navigate directly to the editor after selecting a template.

## Test 2026-09-02

### Added

- [`editorGuideConfig`](../../v4/shared/src/types/module/app-config-types/interfaces/editor-guide-config.md): Added a new property to configure the visibility of Bleed, Margins, and Rulers in the Edit Design module's UI.
- [`pdfPrintConfig`](../../v4/shared/src/types/module/app-config-types/interfaces/pdf-print-config.md): Added a new property to configure the print-ready PDF export in the Edit Design module (`"print"` variant), including Crop Marks, Bleed, Color Mode, and ICC Profile.

### Fixed

- `createDesign()` with `"print"` variant now correctly displays bleed in the editor preview.

### Documentation

- Added a new [Analytics concept guide](../concepts/host-app-trigger.md) that explains how partners can configure the required analytics data to provide consistent launch attribution for Embed SDK workflows.

## Test check url

### API Enhancement

- [`CCEverywhere.BaseAppConfig.useClientAuth`](../../v4/shared/src/types/design-config-types/interfaces/base-app-config.md#properties): Added a new feature to enable no consumption of credits for Generative AI workflows. This configuration can only be used for Generate Image and Edit Image workflows for selected enabled partners.
- **[`CCEverywhere.CallBackTarget.CALLBACK`](../../v4/shared/src/types/export-config-types/enumerations/call-back-target.md#callback)**: Added a new callback export target to trigger callback actions without publishing or downloading assets.
- **Custom Message Workflow**:
  - Added [`WORKFLOW_CONTEXT`](../../v4/shared/src/messenger/message-types/enumerations/message-type.md#workflow_context) message type for module-specific communication.
  - New [`CustomMessage`](../../v4/shared/src/messenger/message-types/interfaces/custom-message.md) interface includes instance ID, request ID, action, intent, and optional data.
  - Added [`CustomMessageAction`](../../v4/shared/src/messenger/message-types/enumerations/custom-message-action.md) enum with actions for notifying unsaved changes and requesting assets.
- **[`CCEverywhere.ModalContainerConfig.showExpressIconWithText`](../../v4/shared/src/types/container-config-types/interfaces/modal-container-config.md#properties)**: the new default loading experience will include the Express logo plus text.

### Tech Enhancement

- **[CCEverywhere.BaseEditorAppConfig.canvasBackgroundColor](../../v4/shared/src/types/editor/app-config-types/interfaces/base-editor-app-config.md#properties)**: Added support to configure the canvas background color (String in the `RRGGBBAA` HEX format).


## [v1.52.16] 2026-08-31

### API Enhancement

- **[`CCEverywhere.ModuleWorkflow.CancelCallback`](../../v4/shared/src/types/callbacks-types/type-aliases/cancel-callback.md)**: Added optional parameter `isEscapePressed` as part of `onCancel` callback which is `true` if the cancel was triggered by escape key press during loading.
- **[`CCEverywhere.HostInfo.coiEnabled`](../../v4/shared/src/types/host-info-types/interfaces/host-info-specified-base.md#properties)**: Added property in `HostInfo` to indicate if COI (Cross-Origin Isolation) is enabled for client.
- **[`CCEverywhere.BaseContainerConfig.iframeTitle`](../../v4/shared/src/types/container-config-types/interfaces/base-container-config.md#properties)**: Added support to configure iframe title for accessibility.

### Tech Enhancement

- **[`CCEverywhere.BrowseSearchBaseConfig.rootCollectionId`](../../v4/shared/src/types/browse-search-config-types/interfaces/browse-search-base-config.md#properties)**: Added support to surface collections other than Express collections.

### Documentation

- Added a new comprehensive [Mobile Web Support Overview](../concepts/mobile-web-support-overview.md) concept guide that covers implementing creative workflows on mobile devices, including configuration options, best practices, and troubleshooting guidance for cross-platform compatibility.
