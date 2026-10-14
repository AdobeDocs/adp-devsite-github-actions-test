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


## [v2.0.0] 2026-09-16

### Added

- [`migrateAssets()`](../../v4/sdk/src/workflows/3p/module-workflow/classes/module-workflow.md#migrateassets): Added support for asset migration (guest to logged-in user) in the [Partner Assertion](../../v4/shared/src/types/authentication-types/index.md#interfaces) workflow.
- [`DesignViewerContext`](../../v4/sdk/src/context/3p/design-viewer-context/classes/design-viewer-context.md): Added support for accessing the context of the Design Viewer, allowing host applications to provide additional assets after the initial load via the [`updateDesignAssets`](../../v4/sdk/src/context/3p/design-viewer-context/classes/design-viewer-context.md#updatedesignassets) method.
- [`hideTemplatePreview`](../../v4/shared/src/types/module/app-config-types/interfaces/browse-mode-config.md#properties): Added a configuration option to hide Template Preview, allowing clients to navigate directly to the editor after selecting a template.

## [v1.54.18] 2026-09-02

### Added

- [`editorGuideConfig`](../../v4/shared/src/types/module/app-config-types/interfaces/editor-guide-config.md): Added a new property to configure the visibility of Bleed, Margins, and Rulers in the Edit Design module's UI.
- [`pdfPrintConfig`](../../v4/shared/src/types/module/app-config-types/interfaces/pdf-print-config.md): Added a new property to configure the print-ready PDF export in the Edit Design module (`"print"` variant), including Crop Marks, Bleed, Color Mode, and ICC Profile.

### Fixed

- `createDesign()` with `"print"` variant now correctly displays bleed in the editor preview.

### Documentation

- Added a new [Analytics concept guide](../concepts/host-app-trigger.md) that explains how partners can configure the required analytics data to provide consistent launch attribution for Embed SDK workflows.



