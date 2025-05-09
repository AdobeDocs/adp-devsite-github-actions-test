[@express-document-sdk](../overview.md) / Editor

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](context.md)

User's current selection context

#### Returns

## documentRoot

• `get` **documentRoot**(): [`ExpressRootNode`](express-root-node.md)

#### Returns

[`ExpressRootNode`](express-root-node.md)

the root of the document.

## Methods

### createEllipse()

• **createEllipse**(): [`EllipseNode`](ellipse-node.md)

#### Returns

[`EllipseNode`](ellipse-node.md)

an ellipse node with default x/y radii, a black fill, and no initial stroke.
Transform values default to 0.

#### createGroup()
