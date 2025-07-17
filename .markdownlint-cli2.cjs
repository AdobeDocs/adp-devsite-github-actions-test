module.exports = {
  "globs": ["**/*.md"],
  "defaultSeverity": "error",
  "configuration": {
    "default": false,
    // Rules that will fail PR validation (errors)
    "MD009": true, // no-trailing-spaces
    "MD012": true, // no-multiple-blanks
    "MD013": true, // line-length
    "MD041": true, // first-line-heading
    
    // Rules that will show warnings but not fail PR (warnings)
    "MD025": { "severity": "warning" }, // single-h1 (multiple top-level headings)
    "MD024": { "severity": "warning" }, // no-duplicate-heading
    "MD026": { "severity": "warning" }, // no-trailing-punctuation-in-heading
  },
  "frontMatter": {
    "title": "title"
  },
  "ignores": [
    "**/node_modules",
    "**/dist"
  ]
};
