# Steps and tasks with existing blocks

This page approximates the storefront `<Steps>` and `<Tasks>` components using only existing Markdown and blocks.

## Steps

Equivalent of the storefront `<Steps>` component, which wraps a numbered list.

1. Find the existing metadata table in your document. If there is none, insert a table with two columns above your Commerce blocks.
1. Merge the cells in the first row and enter `metadata`.
1. Add a row for each property. For example, enter `Title` in the first cell and your page title in the second cell.
1. Add a `Description` row with a short description of the page.
1. Save your changes, then preview the page and check its browser-tab title.
1. Publish the page when the title and page content look right.

## Steps with code

1. Install the project dependencies.

    ```bash
    npm install
    ```

1. Start the development server.

    ```bash
    npm run dev
    ```

1. Open `http://localhost:3000` in your browser.

## Tasks: option A, numbered headings

Equivalent of the storefront `<Tasks>` component. Each task is a numbered heading followed by any content, including code and alerts.

### Task 1: Create the Add to Cart button

Create the primary CTA button using the SDK Button component. Store the instance so you can call `setProps` on it later.

```js
const addToCart = await UI.render(Button, {
  children: labels.Global?.AddProductToCart,
  icon: h(Icon, { source: 'Cart' }),
})($addToCart);
```

### Task 2: Implement a CTA update function

Create a function that switches the button label to **Notify Me** when the product is out of stock.

```js
function updatePrimaryCTA(buttonInstance, { isOutOfStock, labels }) {
  if (!buttonInstance) return;
  buttonInstance.setProps((prev) => ({
    ...prev,
    children: isOutOfStock ? labels.Global?.NotifyMe : labels.Global?.AddProductToCart,
  }));
}
```

<InlineAlert slots="text" variant="info" />

If your block uses a placeholders spreadsheet, add a `NotifyMe` entry. Otherwise the code falls back to the hardcoded string.

### Task 3: Subscribe to `pdp/data` for stock status

Subscribe with `{ eager: true }` so the handler runs on initial load and whenever the variant changes.

```js
events.on('pdp/data', (data) => {
  updatePrimaryCTA(addToCart, { isOutOfStock: data?.inStock === false, labels });
}, { eager: true });
```

## Tasks: option B, Details block

Groups related procedures into a collapsible section. Each group supports a heading and a numbered list, but not code or alerts.

<Details slots="heading, list" repeat="2" summary="Notify Me implementation tasks" subText="Complete these tasks in order:"/>

- Task 1: Create the Add to Cart button
  1. Get the CTA element from the layout fragment.
  1. Render the SDK Button component into it.
  1. Store the returned instance.
- Task 2: Implement a CTA update function
  1. Define `updatePrimaryCTA` at module level.
  1. Switch the label to Notify Me when out of stock.
  1. Restore Add to Cart when in stock.
