---
title: Testing path relative link relative to current directory
description: Documentation on various types of relative and root-relative markdown links and how they resolve to files in different directory contexts.
keywords:
- relative link
- root relative link
- markdown links
- file paths
- directory structure
# --- FAQs ---
faqs:
- question: How do you create a path relative link to a parent directory file?
  answer: Use '../' at the beginning of the link path to refer to a file in the parent directory, such as [../support/index.md](../support/index.md).
- question: How does a trailing slash affect relative links in markdown?
  answer: A trailing slash in a relative link typically means the link points to an index.md file inside that directory.
- question: What is the difference between root relative and path relative links?
  answer: Root relative links start with a slash and reference from the root directory, while path relative links relate to the current directory position.
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
