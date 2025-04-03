```text
rowHeight = (pageHeight - (rowsNumber + 1) * gutter) / rowsNumber;
```

```js
// ...
runtime.exposeApi({
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
        const doc = editor.documentRoot;
        const page = doc.pages.first;
        const rowWidth = page.width;
        const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
    },
});
```
