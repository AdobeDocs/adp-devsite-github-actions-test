---
title: Testing path relative link relative to current directory
description: This document explores various methods for creating and referencing Markdown links using different path syntaxes, including relative, root relative, explicit current directory, parent directory, and variations with trailing slashes. Each syntax is demonstrated with practical examples to clarify their behaviors and usages.
keywords:
- relative links
- root relative links
- Markdown
- directory paths
- linking syntax
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
