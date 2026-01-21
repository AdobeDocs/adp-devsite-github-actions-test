---
title: Edit in Github
hideEditInGithub: true
---

## Edit in Github Feature

This page demonstrates the `hideEditInGithub` frontmatter option. When set to `true`, the "Edit in Github" link is hidden from the page navigation.

### How It Works

By default, pages include an "Edit in Github" link that allows users to quickly navigate to the source file on Github and make edits. However, there are cases where you may want to hide this link:

- **Restricted content**: Pages that should not be edited by external contributors
- **Auto-generated pages**: Content generated from other sources where direct edits would be overwritten
- **Sensitive documentation**: Internal documentation that shouldn't expose the repository structure

### Usage

Add the following to your page's frontmatter:

```yaml
hideEditInGithub: true
```

### Example

This very page has the `hideEditInGithub` option enabled. Notice that the "Edit in Github" link is not visible in the page navigation area.