<HeroSimple slots="heading, text, video , buttons" background="rgb(141, 52, 78)" variant="halfWidth" />

# What's New: Introducing a new enterprise credential

For partners to build and distribute server-to-server integrations.

[video_alt](../video/test-video.mp4)

[Learn more](https://lit.dev/)

# Class: Editor

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](context.md)

User's current selection context

# Adobe I/O Runtime API Reference

## API endpoints

Adobe I/O Runtime supports the following API endpoints for interacting programmatically with the service. 

**Notes:**

1. Unless otherwise noted, all parameters are required. 
2. For all the API calls on this page, the base URL is:  
   `https://api.adobe.io/`

### GET /runtime/admin/namespaces/{orgId}/{intId}

Returns the details of the namespace associated with the specified organization and integration.

#### _Parameters:_

| Name                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `orgId` (`string`: _path_)           | Organization ID                                 |
| `intId` (`string`: _path_)           | Integration ID                                  |
| `Authorization` (`string`: _header_) | Authorization token in format: `Bearer {token}` |
| `X-Api-Key` (`string`: _header_)     | Api key                                         |

#### _Responses:_


Response content type: `application/json`
|Code|Description|
|--- |--- |
|200|Successful operation Example value:
{
  "name": "string",
  "code": "string",
  "namespace": "string",
  "version": "string",
  "params": [
    {
      "key": "string",
      "value": {}
    }
  ],
  "annotations": [
    {
      "key": "string",
      "value": {}
    }
  ],
  "limits": {
    "timeout": "string",
    "memory": "string",
    "logs": "string"
  },
  "exec": {
    "kind": "string",
    "binary": false,
    "components": [
      "string"
    ]
  },
  "url": "string"
}
Model: [ActionResultDTO] {
description: OpenWhisk Action invocation result
name        string
            Action name
code        string
            Action code
namespace   string
            Action namespace
version     string
            Action version
annotations [Action annotations
            KeyValuePairDTO {
            description: OpenWhisk Action param
            key     string
                    Param Name
            value   {
                        description: Param value
                    }
            }]
duration    integer($int32)
            Duration
version     string
            Action Version
response    {
            description:    
            Action invocation response
}|

#### Returns

[`Context`](context.md)

<hr />

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

<hr />

#### createGroup()

• **createGroup**(): [`GroupNode`](group-node.md)

#### Returns

[`GroupNode`](group-node.md)

a group node.

<hr />

#### createImageContainer()

• **createImageContainer**(`bitmapData`, `options`): [`MediaContainerNode`](media-container-node.md)

Creates a bitmap image, represented as a multi-node MediaContainerNode structure. Always creates a "full-frame,"
uncropped image initially, but cropping can be changed after it is created by modifying the properties of the
container's mediaRectangle and maskShape children.

Image creation involves some asynchronous steps. The image will be visible in this client almost instantly, but will
render as a gray placeholder on other clients until it has been uploaded to DCX and then downloaded by those clients.
This local client will act as having unsaved changes until the upload has finished.

#### Parameters

• **bitmapData**: [`BitmapImage`](../interfaces/bitmap-image.md)

BitmapImage resource (e.g. returned from [loadBitmapImage](editor.md#loadbitmapimage)).

• **options**= `{}`

Additional configuration: - initialSize - Size the image is displayed at. Must have the same aspect ratio as bitmapData. Defaults to the
size the image would be created at by a UI drag-drop gesture (typically the image's full size, but scaled down
if needed to stay below an application-defined size cap).

• **options.initialSize?**: [`RectangleGeometry`](../interfaces/rectangle-geometry.md)

#### Returns

[`MediaContainerNode`](media-container-node.md)

MediaContainerNode representing the top container node of the multi-node structure.

<hr />

is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

• **createLine**(): [`LineNode`](line-node.md)

#### Returns

[`LineNode`](line-node.md)

a line node with default start point and end point and a default stroke.
Transform values default to 0.

<hr />

[`TextNode`](text-node.md)

• **createPath**(`path`): [`PathNode`](path-node.md)

#### Parameters

• **path**: `string`

a string representing any [SVG path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
Note that the path data will be normalized, and therefore the `path` getter may return a different SVG string from the path creation input.
For example, "M 10 80 Q 52.5 10, 95 80 T 180 80" becomes "M 10 80 C 38.33 33.33 66.67 33.33 95 80...".
Throws if the input is empty or is not legal SVG path syntax.

#### Returns

[`PathNode`](path-node.md)

a path node with a default stroke and no initial fill.

<hr />

### createRectangle()

• **createRectangle**(): [`RectangleNode`](rectangle-node.md)

#### Returns

[`RectangleNode`](rectangle-node.md)

a rectangle node with default width and height, a black fill, and no initial stroke.
Transform values default to 0.

<hr />

### createText()

• **createText**(): [`TextNode`](text-node.md)

#### Returns

[`TextNode`](text-node.md)

a text node with default styles. The text content is initially empty, so the text node will be
invisible until its `fullContent` property's `text` is set. Creates point text, so the node's width will automatically
adjust to accommodate whatever text is set.

Note: the registration point of this text node is not guaranteed to be at the top-left of the bounding box of its
insertion parent. Recommend using `setPositionInParent` over `translation` to set the position.

<hr />

### loadBitmapImage()

• **loadBitmapImage**(`bitmapData`): `Promise` [`BitmapImage`](../interfaces/bitmap-image.md)

Creates a bitmap image resource in the document, which can be displayed in the scenegraph by passing it to [createImageContainer](editor.md#createimagecontainer)
to create a MediaContainerNode. The same BitmapImage can be used to create multiple MediaContainerNodes.

Because the resulting BitmapImage is returned asynchronously, to use it you must schedule an edit lambda to run at a
safe later time in order to call [createImageContainer](editor.md#createimagecontainer). See [queueAsyncEdit](editor.md#queueasyncedit).

Further async steps to upload image resource data may continue in the background after this call's Promise resolves,
but the resulting BitmapImage can be used right away (via the queue API noted above). The local client will act as
having unsaved changes until all the upload steps have finished.

#### Parameters

• **bitmapData**: `Blob`

Encoded image data in PNG or JPEG format.

#### Returns

`Promise` [`BitmapImage`](../interfaces/bitmap-image.md)

<hr />

### makeColorFill()

• **makeColorFill**(`color`): [`ColorFill`](../interfaces/color-fill.md)

Convenience helper to create a complete ColorFill value given just its color.

#### Parameters

• **color**: [`Color`](../interfaces/color.md)

The color to use for the fill.

#### Returns

[`ColorFill`](../interfaces/color-fill.md)

<hr />

### makeStroke()

• **makeStroke**(`options`?): [`SolidColorStroke`](../interfaces/SolidColorStroke.md)

Convenience helper to create a complete SolidColorStroke value given just a
subset of its fields. All other fields are populated with default values.

See [SolidColorStroke](../interfaces/SolidColorStroke.md) for more details on the `options` fields. Defaults:

-   `color` has default value DEFAULT_STROKE_COLOR if none is provided.
-   `width` has default value DEFAULT_STROKE_WIDTH if none is provided.
-   `position` has default value `center` if none is provided.
-   `dashPattern` has default value [] if none is provided.
-   `dashOffset` has default value 0 if none is provided. This field is ignored
  if no `dashPattern` was provided.
-   `type` has default value SolidColorStroke.type if none is provided. This field
   shouldn't be set to any other value.

#### Parameters

• **options?**: `Partial` [`SolidColorStroke`](../interfaces/SolidColorStroke.md)

#### Returns

[`SolidColorStroke`](../interfaces/SolidColorStroke.md)

a stroke configured with the given options.

<hr />

### queueAsyncEdit()

• **queueAsyncEdit**(`lambda`): `Promise` `void`

Enqueues a function to be run at a later time when edits to the user's document may be performed. You can always edit
the document immediately when invoked in response to your add-on's UI code. However, if you delay to await an
asynchronous operation such as [loadBitmapImage](editor.md#loadbitmapimage), any edits following this pause must be scheduled using
queueAsyncEdit(). This ensures the edit is properly tracked for saving and undo.

The delay before your edit function is executed is typically just a few milliseconds, so it will appear instantaneous
to users. However, note that queueAsyncEdit() will return *before* your function has been run.
If you need to trigger any code after the edit has been performed, either include this in the lambda you are enqueuing
or await the Promise returned by queueAsyncEdit().

Generally, calling any setter or method is treated as an edit; but simple getters may be safely called at any time.

Example of typical usage:

```js
// Assume insertImage() is called from your UI code, and given a Blob containing image data
async function insertImage(blob) {
    // This function was invoked from the UI iframe, so we can make any edits we want synchronously here.
    // Initially load the bitmap - an async operation
    const bitmapImage = await editor.loadBitmapImage(blob);

    // Execution doesn't arrive at this line until an async delay, due to the Promise 'await' above

    // Further edits need to be queued to run at a safe time
    editor.queueAsyncEdit(() => {
         // Create scenenode to display the image, and add it to the current artboard
         const mediaContainer = editor.createImageContainer(bitmapImage);
         editor.context.insertionParent.children.append(mediaContainer);
    });
}
```

#### Parameters

• **lambda**

a function which edits the document model.

#### Returns

`Promise` `void`

a Promise that resolves when the lambda has finished running, or rejects if the lambda throws an error.
