---
title: Consecutive Dashes Lint Test (Valid)
description: This file tests that the no-kebab-in-filename linter does NOT flag valid filenames (no consecutive dashes).
---

# Valid Filename Test

This file has a valid kebab-case name (`consecutive-dashes-valid.md`) and should pass linting.

The `no-kebab-in-filename` rule checks that filenames and directory paths do not contain:

- Invalid characters (only `a-z`, `0-9`, `-` allowed)
- Consecutive dashes (`--`)
- Leading or trailing dashes

These patterns cause EDS deployment failures because the Helix admin API runs `sanitizeName` on each path segment, which collapses `--` to `-` and strips leading/trailing dashes. This creates a mismatch between the actual file in the repo and the path EDS resolves.
