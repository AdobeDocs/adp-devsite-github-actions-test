---
title: File linking test
description: Testing whether plain relative links to files in static/ and src/pages/ resolve correctly on an EDS page
---

# File linking test

## Files in static/

| File | Relative path | raw.githubusercontent.com |
|------|--------------|--------------------------|
| petstore.json | [relative](../../../../static/petstore.json) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/static/petstore.json) |

## Files in src/pages/

| File | Relative path | raw.githubusercontent.com |
|------|--------------|--------------------------|
| DemoCode.zip | [relative](../../DemoCode.zip) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/src/pages/DemoCode.zip) |
| hero.png | [relative](../../assets/hero.png) | [raw](https://raw.githubusercontent.com/AdobeDocs/adp-devsite-github-actions-test/main/src/pages/assets/hero.png) |

## RedoclyAPIBlock

| src | Link |
|-----|------|
| `raw.githubusercontent.com` | [raw test](redocly-raw.md) |
| `/{pathPrefix}/filename` pattern | [pathPrefix test](redocly-pathprefix.md) |
