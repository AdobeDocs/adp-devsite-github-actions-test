module.exports = {
  "globs": ["**/*.md"],
  "defaultSeverity": "error",
  "configuration": {
    "default": false,
    "MD025": { "severity": "warning" }, // Multiple top-level headings = warning
  },
  "frontMatter": {
    "title": "title"
  },
  "ignores": [
    "**/node_modules",
    "**/dist"
  ]
};
