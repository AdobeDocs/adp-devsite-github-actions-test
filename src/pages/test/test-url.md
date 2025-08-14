---
title: Testing path relative link relative to current directory
description: This document demonstrates various link formats in Markdown, including path-relative, root-relative, parent directory, current directory, and handling of trailing slashes. It provides examples of how different link syntaxes resolve to files or directories.
keywords:
- Markdown links
- Relative paths
- Directory navigation
- Linking syntax
- File references
---

# Testing path relative link relative to current directory

[path-test/index.md](path-test/index.md)

# Root relative link

[/api/index.md](/api/index.md)

## path relative link that goes to parent of current directory

[../support/index.md](../support/index.md)

## path explicit relative link to current directory

[./support/index.md](./support/index.md)

### path relative link to a file without a trailing slash

[path-test/pathname](path-test/pathname.md)

### path relative link to a file with a trailing slash

[path-test/pathname/](path-test/pathname/index.md)

### path relative link to a file with a trailing slash goes to index.md

[path-test/](path-test/index.md)

### path relative link to a file without a trailing slash goes to index.md

[path-test](path-test.md)
