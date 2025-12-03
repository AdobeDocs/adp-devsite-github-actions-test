# Test File for normalizeLinks.js

This file contains various link patterns to test the `normalizeLinks.js` script behavior.

## Test Case 1: Links with Trailing Slashes

These links end with `/` and should be converted based on file existence:

- [Link to directory with index.md](../test/)
- [Link to another directory](../test/path-test/)
- [Link to getting started](not-test/)

Expected behavior:
`../test/index.md` exists → converts to `index.md`
`../test/path-test/index.md` exist -> converts to `path-test/index.md`
`not-test/` doesn't exists -> doesn't convert

## Test Case 2: Links without Extensions

These links are missing the `.md` extension:

- [Link without extension](test-url)

Expected behavior:
- Should add `.md` extension if file exists
- `test-url` → `test-url.md`


## Test Case 3: Links with Extensions Already

These links already have proper extensions:

- [Link with .md extension](test-url.md)

Expected behavior:
- Should remain unchanged (already correct)

## Test Case 4: Relative Path Links

These use relative path notation:

- [Parent directory link](../api)
- [Current directory link](./test-url)
- [Nested path](./test/path-test/pathname)

Expected behavior:
- Should normalize to simplest relative path
- Should add extensions if missing
`../api -> api/index.md`
`./test-url -> test-url.md`
`./test/path-test/pathname -> path-test/pathname.md`

## Test Case 5: Links with Anchors

These links include hash fragments:

- [Link with anchor](test-resources-block#using-the-samples)
- [Trailing slash with anchor](path-test/#enumeration-members)
- [No extension with anchor](test-resources-block.md#using-the-samples)

Expected behavior:
- Should preserve the anchor (#section)
- Should still normalize the path before the anchor
`test-sources-block#using-the-samples -> test-sources-block.md#using-the-samples`
`path-test/#enumeration-members -> path-test/index.md#enumeration-members`
`test-resources-block.md#using-the-samples -> test-resources-block.md#using-the-samples`

## Test Case 6: Absolute vs Relative Paths

- [Absolute path](/src/pages/test/test-url)
- [Relative from current](test-url)
- [Relative with ./](./test-url)

Expected behavior:
- Should normalize all to proper relative paths from current file location
`/src/pages/test/test-url -> test-url.md`
`test-url -> test-url.md`
`./test-url -> test-url.md`
