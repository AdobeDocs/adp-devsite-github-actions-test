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

## AI metadata automation

- AI PR Reviewer (PR workflow)
  - Triggers on pull requests. Collects changed docs, generates frontmatter with Azure OpenAI, and posts a single review with per-file suggestions.
  - Requires repository secrets: `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_KEY`.

- Nightly AI Refresh (scheduled workflow)
  - Runs daily at 02:00 UTC. Collects all docs, generates frontmatter, and opens/updates a PR `ai-metadata`.
  - Requires repository secrets: `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_KEY`.

- Links and Navigation Checks (PR workflow)
  - Runs `yarn buildNavigation`, `yarn normalizeLinks`, and `yarn checkLinks` to validate navigation & links.

### Local runs

- Fetch PR files content into `pr_content.txt` (requires `PR_ID` and `GITHUB_TOKEN`):

```bash
PR_ID=123 GITHUB_TOKEN=ghp_xxx node src/pr-scripts.js
```

- Generate AI suggestions (supports dry run):

```bash
FILE_NAME=pr_content.txt AZURE_OPENAI_ENDPOINT=... AZURE_OPENAI_API_KEY=... DRY_RUN=1 node src/ai-scripts.js
```

- Post review comments to a PR:

```bash
PR_ID=123 GITHUB_TOKEN=ghp_xxx node src/review-scripts.js
```

- Create/Update AI metadata PR from all pages:

```bash
GITHUB_TOKEN=ghp_xxx node src/fetch-pages-scripts.js
FILE_NAME=all_pages_content.txt AZURE_OPENAI_ENDPOINT=... AZURE_OPENAI_API_KEY=... node src/ai-scripts.js
GITHUB_TOKEN=ghp_xxx node src/create-pr-scripts.js
```

### Required environment

- `GITHUB_TOKEN` (PAT or GITHUB_TOKEN in Actions)
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- Optional: `DRY_RUN=1` to write AI output to stdout
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
