---
title: File Extension Link Test
description: Tests that relative links to non-markdown files are rewritten to raw GitHub URLs.
---

# File Extension Link Test

Links to non-markdown files should become raw GitHub URLs:
`https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/<branch>/src/pages/...`

## Previously supported types

| Link | Expected href |
| --- | --- |
| [PDF](./test-extension-files/sample.pdf) | `.../src/pages/test/test-extension-files/sample.pdf` |
| [ZIP](../DemoCode.zip) | `.../src/pages/DemoCode.zip` |
| [TypeScript declaration](./test-extension-files/sample.d.ts) | `.../src/pages/test/test-extension-files/sample.d.ts` |
| [Text](./test-extension-files/sample.txt) | `.../src/pages/test/test-extension-files/sample.txt` |
| [XML feed](../feed.xml) | `.../src/pages/feed.xml` |
| [CSV](../openapi/test.csv) | `.../src/pages/openapi/test.csv` |
| [YAML](../assets/openapi.yaml) | `.../src/pages/assets/openapi.yaml` |
| [JSON](../assets/petstore.json) | `.../src/pages/assets/petstore.json` |
| [Video](../video/test-video.mp4) | `.../src/pages/video/test-video.mp4` |


## Root-relative path, query, and hash

| Link | Expected href |
| --- | --- |
| [Root-relative PDF](/test/test-extension-files/sample.pdf) | `.../src/pages/test/test-extension-files/sample.pdf` |
| [PDF with hash](./test-extension-files/sample.pdf#page=1) | `.../src/pages/test/test-extension-files/sample.pdf#page=1` |
| [Text with query](./test-extension-files/sample.txt?download=1) | `.../src/pages/test/test-extension-files/sample.txt?download=1` |

## Should stay page links (not raw GitHub)

| Link | Expected |
| --- | --- |
| [Version folder page](./2.0/version.md) | `/github-actions-test/test/2.0/version` |
| [Version folder index](./2.0/index.md) | `/github-actions-test/test/2.0/` |

