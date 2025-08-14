---
title: Testing path relative link relative to current directory
description: This document explores different types of markdown links, such as relative and root-relative paths, and how they resolve to files and directories. Various examples demonstrate linking to files with and without trailing slashes, navigating parent and current directories, and referencing index files in different scenarios.
keywords:
- markdown links
- relative paths
- root-relative links
- directory navigation
- index files
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
