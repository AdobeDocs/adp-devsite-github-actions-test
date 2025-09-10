# Adobe I/O Documentation Template

This is a site template built with the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.

## Where to ask for help

The slack channel #adobeio-onsite-onboarding is our main point of contact for help. Feel free to join the channel and ask any questions.

## How to develop

For local development, simply use :

```shell
$ yarn install
$ yarn dev
```

For the developer documentation, read the following sections on how to:

- [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
- [Link to pages](https://github.com/adobe/aio-theme#links)
- [Use assets](https://github.com/adobe/aio-theme#assets)
- [Set global Navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Set side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Use content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Use Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).

## How to test

- To run the configured linters locally (requires [Docker](https://www.docker.com/)):

  ```shell
  yarn lint
  ```

  > NOTE If you cannot use Docker, you can install the linters separately. In `.github/super-linter.env`, see which linters are enabled, and find the tools being used for linting in [Supported Linters](https://github.com/github/super-linter#supported-linters).

- To check internal links locally

  ```shell
  yarn test:links
  ```

- To build and preview locally:

  ```shell
  yarn start
  ```

## How to deploy

For any team that wishes to deploy to the developer.adobe.com and developer-stage.adobe.com websites, they must be in contact with the dev-site team. Teams will be given a path that will follow the pattern `developer.adobe.com/{product}/`. This will allow doc developers to setup their subpaths to look something like:

```text
developer.adobe.com/{product}/docs
developer.adobe.com/{product}/community
developer.adobe.com/{product}/community/code_of_conduct
developer.adobe.com/{product}/community/contribute
```

### Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites).


## Blocks

### AccordionItem Block

The AccordionItem block creates collapsible content sections that can contain headings, tables, text, and code blocks. It uses + and - icons to indicate expand/collapse states.

![accordion_block_closed](/docs/images/accordionitem-closedstate.png)

![accordion_block_open](/docs/images/accordionitem-openstate.png)

```
<AccordionItem slots="heading, table, text, code"/>

### 4. Track buffer end

| Number | Action | Client Request |
| --- | --- | --- |
| 4 | Buffer ends | `/play?configId=<ID>` |

Description text here.

```json
{
  "eventType": "media.play"
}
```

Use `slots` to identify the markdown content:
- `heading`
- `table`
- `text`
- `code`

### Announcement Block

The Announcement Block goes directly underneath the Hero Block for pages.
It's used to call out new features, blog posts, news etc. anything that needs that needs to be surfaced above the fold.

![announcement block](/docs/images/announcement-block.png)

<Announcement slots="heading, text, button" variant="primary" backgroundColor="background-color-gray" />

### Are you an existing developer?

Action required: Add trader details to continue EU distribution.

- [Add trader details now.](https://new.express.adobe.com/add-ons?mode=submission)

Use `slots` to identify the markdown content:

- `heading`
- `button`
- `text`

Use `variant` to match the color of the button. Defaults to `primary`.

- `primary` or `secondary`

### Code Block

The Code block is used for displaying code snippets with syntax highlighting and optional line highlighting. It supports various programming languages and can highlight specific lines.

```bash 
aio app run --local
```

![code](/docs/images/code.png)

### CodeBlock Block

The CodeBlock block creates a structured code display with multiple code sections that can be organized with headings and optional language picklists. It's useful for showing related code examples or step-by-step implementations.

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Payload

```json
{
  "customer": {
    "email": "mshaw@example.com",
    "firstname": "Melanie",
    "lastname": "Shaw"
  }
}
```

#### Response

```json
{
  "id": 13,
  "group_id": 1,
  "created_at": "2017-05-18 16:47:44",
  "updated_at": "2017-05-18 16:47:44",
  "created_in": "Default Store View",
  "email": "mshaw@example.com",
  "firstname": "Melanie",
  "lastname": "Shaw",
  "store_id": 1,
  "website_id": 1,
  "addresses": [],
  "disable_auto_group_change": 0,
  "extension_attributes": {
    "company_attributes": {
      "customer_id": 13,
      "company_id": 0
    }
  }
}
```

![code block](/docs/images/code-block.png)

Use `slots` to identify the markdown content:
- `heading`
- `code`

Use `repeat` to specify how many code sections to display.

Use `languages` to specify the programming languages for syntax highlighting (comma-separated list).

### Columns Block

The Columns block creates a responsive grid layout for displaying content in multiple columns. It's useful for showcasing features, services, or content in a structured grid format.

![column](/docs/images/column.png)

<Columns slots="image, heading, text, buttons" repeat="3" />

![Discover](https://raw.githubusercontent.com/AdobeDocs/adp-devsite/refs/heads/stage/tools/sidekick/images/DelightConsumers_1400x900.png?aio_type=image)

### Heading 3 is the size with bold

Normal text in here and you can write about two paragraphs worth. This is just filler to keep going on and on and on. Taking up space to make it look like this is actually about something.

[Adobe Photoshop](https://www.microsoft.com/microsoft-365/microsoft-teams/group-chat-software)

Use `slots` to identify the markdown content that will be distributed across the columns:
- `image` - Images that will be placed in each column
- `heading` - Headings that will be placed in each column
- `text` - Text content that will be placed in each column
- `buttons` - Buttons/links that will be placed in each column

The content following the `<Columns>` tag will be automatically distributed across the specified number of columns based on the order of the slots.

Use `repeat` to specify how many columns to display.

### Details Block

The Details block creates collapsible content sections with a summary and expandable content. It's useful for organizing information that users can expand to see more details.

![details closed](/docs/images/details-closed.png)

![details open](/docs/images/details-open.png)

<Details slots="header, list" repeat="4" summary="Text Description of Diagram" subText="Diagram listing common use cases:"/>

- Developer Distribution (Start with the listing metadata):

1. Create new listing
2. Download starter package with plugin ID
3. Upload plugin & enter version details
4. Submit for review.

Use `slots` to identify the markdown content:
- `header`
- `list`

Use `summary` to set the main summary text for the collapsible section.

Use `subText` to add additional descriptive text below the summary.

### DiscoverBlock

The DiscoverBlock creates flexible content blocks that can display various combinations of images, headings, links, and text. It's useful for creating resource links, feature highlights, or navigation cards.

![discover](/docs/images/discover.png)

![discover with images](/docs/images/dicover-with-images.png)

<DiscoverBlock width="100%" slots="heading, link, text"/>

## Developer forums

[Adobe Community Forums, InDesign Scripting](https://community.adobe.com/t5/indesign/ct-p/ct-indesign?page=1&sort=latest_replies&lang=all&tabid=all&topics=label-scripting)

Open discussion and support with community experts and Adobe staff.

Use `slots` to identify the markdown content:
- `image`
- `heading`
- `link`
- `text`

Use `width` to specify the width of the block (e.g., "100%", "50%", "25%").
