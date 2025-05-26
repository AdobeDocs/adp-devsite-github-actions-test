# Class: Editor new4

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](context.md)

User's current selection context

Add one or more items to the end of the list. The last argument will become the last item in this list. Items are
removed from their previous parent, if any – or if an item is already in _this_ list, its index is simply changed.

#### Returns

[`Context`](context.md)

<HorizontalLine />

User's express root node

## documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](express-root-node.md)
