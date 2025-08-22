---
title: Path Relative and Root Relative Links in Documentation
description: This document explains different ways to create and use path relative and root relative links in documentation files, using various examples for clarity.
keywords:
- path relative links
- root relative links
- Markdown linking
- documentation navigation
- file referencing
faqs:
- question: What is a path relative link in documentation?
  answer: A path relative link connects to a file or directory relative to the current document's location. It helps organize navigation within different folders of your project.
- question: How is a root relative link different from a path relative link?
  answer: A root relative link starts from the root directory of your project, making links consistent regardless of the file's location. This is useful for referencing APIs or main pages from any part of the documentation.
- question: Can I use relative links to navigate to parent or sibling directories?
  answer: Yes, by using ../ to go up a directory or ./ for the current directory, you can create links to parent or sibling folders and files efficiently.
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
