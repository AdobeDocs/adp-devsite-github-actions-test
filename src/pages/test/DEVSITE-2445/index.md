---
title: DEVSITE-2445 Static file link test
description: Testing whether plain relative links to files in static/ and src/pages/ resolve correctly on an EDS page
---

# DEVSITE-2445 Static file link test

## Files in static/

| File | Relative path | raw.githubusercontent.com |
|------|--------------|--------------------------|
| petstore.json | [relative](../../../static/petstore.json) (404) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/static/petstore.json) (works) |

## Files in src/pages/

| File | Relative path | raw.githubusercontent.com |
|------|--------------|--------------------------|
| DemoCode.zip | [relative](../../DemoCode.zip) (works) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/src/pages/DemoCode.zip) (works) |
| hero.png | [relative](../../assets/hero.png) (works) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/src/pages/assets/hero.png) (works) |

## RedoclyAPIBlock

| src | Link |
|-----|------|
| relative `static/` path (expect 404) | [test](redocly-relative.md) |
| `raw.githubusercontent.com` (expect to work) | [test](redocly-raw.md) |
| `/{pathPrefix}/filename` pattern (works) | [test](redocly-pathprefix.md) |
