module.exports = {
  "globs": ["**/*.md"],
  "defaultSeverity": "error",
  "configuration": {
    "default": false,
    // Rules that will fail PR validation (errors)
    "no-trailing-spaces": true,
    "no-multiple-blanks": true,
    "line-length": true,
    "first-line-heading": true,

    // Rules that will show warnings but not fail PR (warnings)
    "single-h1": true, // multiple top-level headings - will be handled in workflow
    "no-duplicate-heading": true, // will be handled in workflow
    "no-trailing-punctuation-in-heading": true, // will be handled in workflow
  },
  "frontMatter": {
    "title": "title"
  },
  "ignores": [
    "**/node_modules",
    "**/dist"
  ]
};
