---
title: No Dead URLs False Positives Test
description: Tests that the no-dead-urls linter does not flag anchor/hash URLs, mailto links, or HTTP redirect URLs as dead
---

# no-dead-urls False Positive Scenarios (DEVSITE-2405)

These cases should NOT trigger the no-dead-urls linter.

## Anchor / Hash Fragment URLs (should NOT be flagged)

URLs that include a `#` fragment are sometimes flagged as dead even when the base page is alive.
The linter should skip the anchor check or gracefully handle missing anchors.

- [Spectrum theming resources](https://spectrum.adobe.com/page/theming/#Resources-for-Spectrum-for-Adobe-Express)
- [MDN WebSocket close](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#parameters)
- [Adobe I/O Authentication overview](https://developer.adobe.com/developer-console/docs/guides/authentication/#authentication-overview)

## Mailto Links (should NOT be flagged)

Email addresses expressed as `mailto:` links are not HTTP URLs and cannot be checked for liveness.

- [Contact the team](mailto:ccintrev@adobe.com)
- [Send feedback](mailto:adobeio-feedback@adobe.com)
- [Report an issue](mailto:devsite-support@adobe.com)

## HTTP-to-HTTPS Redirect URLs (should NOT be flagged)

URLs that issue a permanent redirect from HTTP to HTTPS should be treated as alive,
not dead, when `followRedirect` is enabled.

- [Discord community](http://discord.gg/nc3QDyFeb4)
- [Adobe website (http)](http://www.adobe.com)

## Real Dead URL (SHOULD trigger the linter - regression check)

This URL does not exist and should still be reported as dead to confirm the rule is active.

- [Non-existent Adobe page](https://www.adobe.com/this-page-does-not-exist-devsite-2405-test-regression)
