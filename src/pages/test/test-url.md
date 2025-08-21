---
title: Path Relative Links in Markdown
description: This document demonstrates various ways to create root and relative links in Markdown, including navigation to parent directories and handling trailing slashes.
keywords:
- markdown
- relative links
- root links
- file navigation
- documentation
faqs:
- question: How do I create a root-relative link in Markdown?
  answer: Use a leading slash before the path, such as [/api/index.md](/api/index.md), to link from the root of your project.
- question: What is the difference between path relative links with and without a trailing slash?
  answer: A trailing slash generally denotes a directory and will usually resolve to index.md, whereas a path without a trailing slash can link directly to a file or also resolve to index.md.
- question: How do I link to a parent directory in Markdown?
  answer: Use two dots (..) to navigate up one level: [../support/index.md](../support/index.md) links to the support directory one level above the current location.
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
