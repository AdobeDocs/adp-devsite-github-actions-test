---
title: Missing file outside src/pages test
description: Tests that links to repo files outside src/pages/ do not produce false positive missing-file errors.
---

# Missing File Outside src/pages Test

## Should NOT trigger missing-file (false positives)

These link to files that exist in the repo but outside `src/pages/`.

- [Code of Conduct](https://github.com/AdobeDocs/adp-devsite-github-actions-test/blob/main/CODE_OF_CONDUCT.md)


## SHOULD trigger missing-file (real violations)

These link to files that genuinely do not exist anywhere in the repo.

- [Nonexistent doc](https://github.com/AdobeDocs/adp-devsite-github-actions-test/blob/main/DOES_NOT_EXIST.md)
