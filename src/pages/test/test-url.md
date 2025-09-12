---
title: Testing path relative link relative to current directory
description: An overview of how to use relative links in markdown files, focusing on paths relative to the current directory and their behaviors. Includes examples of root-relative links, parent directory references, and trailing slash usage.
keywords:
- relative links
- markdown paths
- current directory
- trailing slash links
- file linking
faqs:
- question: What does a path starting with "./" signify in markdown links?
  answer: A path starting with "./" refers explicitly to the current directory, ensuring the link is relative to where the markdown file is located.
- question: How does a trailing slash in a relative link affect the targeted file?
  answer: A trailing slash usually indicates the link points to a directory, which typically serves the index.md file within that directory.
- question: Can a relative link without a trailing slash point to an index.md file?
  answer: Yes, a relative link without a trailing slash can still resolve to an index.md file if the linked path corresponds to a directory structure.
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
