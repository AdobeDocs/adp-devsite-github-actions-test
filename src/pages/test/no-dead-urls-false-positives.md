---
title: No Dead URLs False Positives Test
description: Tests that the no-dead-urls linter does not flag bare fragment links, mailto links, or HTTP redirect URLs as dead
---

# no-dead-urls False Positive Scenarios (DEVSITE-2405)

These cases should NOT trigger the no-dead-urls linter.

## Bare Fragment Links

Links that start with `#` reference a heading on the current page and cannot be resolved
in a static linting context. The linter skips these via the `/^#/` pattern in `skipUrlPatterns`.

- [Jump to Mailto section](#mailto-links)
- [Jump to Redirect section](#http-redirect-urls)
- [Back to top](#no-dead-urls-false-positive-scenarios-devsite-2405)

## Full URLs with Anchor Fragments

Full URLs that contain a `#` anchor (e.g. `https://example.com/page#section`) are validated
at the base-URL level. The anchor portion does not affect liveness detection.

- [MDN WebSocket close](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#parameters)
- [MDN Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters)

## Mailto Links

Email addresses expressed as `mailto:` links are not HTTP URLs and cannot be checked for liveness.

- [Contact the team](mailto:ccintrev@adobe.com)
- [Send feedback](mailto:adobeio-feedback@adobe.com)
- [Report an issue](mailto:devsite-support@adobe.com)

## HTTP Redirect URLs

URLs that redirect from HTTP to HTTPS are followed via `followRedirects: true`. The linter may
emit a "redirecting URL" advisory (suggesting you use the final URL), but should NOT classify
these as dead.

- [GitHub (http)](http://github.com)
- [W3C (http)](http://www.w3.org)

## Real Dead URL (SHOULD trigger the linter - regression check)

This URL does not exist and should still be reported as dead to confirm the rule is active.

- [Non-existent Adobe page](https://www.adobe.com/this-page-does-not-exist-devsite-2405-test-regression)
