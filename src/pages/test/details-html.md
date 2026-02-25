---
title: Details HTML Test
description: Tests for remark-lint-no-details-html rule
---

## Valid — EDS Details block (should pass)

<Details slots="heading, list" repeat="1" summary="Text Description of Detail Block" subText="Diagram listing common use cases:" />

- Developer Distribution (Start with the listing metadata):
  1. Step one
  2. Step two
  3. Step three

## Invalid — HTML details element (should fail)

<details>
  <summary>Text Description of Details</summary>

- Workflow A:
  1. Step one
  2. Step two
  3. Step three

</details>
