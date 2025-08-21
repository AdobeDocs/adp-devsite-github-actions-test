---
title: Testing path relative link relative to current directory
description: This document explains how to use various relative and root-relative link formats in markdown files to ensure proper navigation between pages and directories.
keywords:
- relative links
- path navigation
- markdown documentation
- root-relative links
- linking files
faqs:
- question: How do I create a relative link to a file in the current directory?
  answer: Use the format [filename](filename.md) or [./filename.md] to link to files in the same directory as your markdown file.
- question: What's the difference between root-relative and relative links?
  answer: Root-relative links start from the root of your project (e.g., /api/index.md), while relative links are based on the current file's location.
- question: Do links with a trailing slash behave differently than those without?
  answer: Yes, links with a trailing slash typically point to the index.md within that directory, while links without may refer to a specific file or the index.md by default when omitted.
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
