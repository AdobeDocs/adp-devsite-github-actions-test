# Testing path relative link relative to current directory

[path-test/index.md](path-test/index.md)


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

### external link with no http and https should fail 

[www.google.com](www.google.com)

adding test back