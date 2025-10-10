# Testing path relative link relative to current directory

[path-test/index.md](path-test/index.md)

# Root relative link

[/api/index.md](/api/index.md)

## path relative link that goes to parent of current directory

[../support/index.md](../support/index.md)

## path explicit relative link to current directory

[./path-test/index.md](./path-test/index.md)

### path relative link to a file without a trailing slash

[path-test/pathname](path-test/pathname.md)

### path relative link to a file with a trailing slash

[path-test/pathname/](path-test/pathname/index.md)

### path relative link to a file with a trailing slash but no index.md

[path-test/pathname/](path-test/pathname/)

### path relative link to a file without a trailing slash and no .md

[path-test/pathname](path-test/pathname)

### path relative link to a file with a trailing slash goes to index.md

[path-test/](path-test/index.md)

### path relative link to a file without a trailing slash goes to index.md

[path-test](path-test.md)

### testing anchor link on the current page

[#path-relative-link-that-goes-to-parent-of-current-directory](#path-relative-link-that-goes-to-parent-of-current-directory)

### testing anchor link on another page

[anchor-link-in-table#request-object](anchor-link-in-table#request-object)

### testing anchor link on another page with md in the link

[anchor-link-in-table#request-object](anchor-link-in-table.md#request-object)

### external link

[www.google.com](www.google.com)
