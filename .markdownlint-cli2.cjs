module.exports = {
  "globs": ["**/*.md"],
  "defaultSeverity": "error",
  "configuration": {
    "default": false,
    // Rules that will fail PR validation (errors)
    "MD009": true, // no-trailing-spaces
    "MD012": true, // no-multiple-blanks
    "MD013": false, // line-length - disabled for now due to potential issues
    "MD041": true, // first-line-heading
    
    // Rules that will show warnings but not fail PR (warnings)
    "MD025": true, // single-h1 (multiple top-level headings) - will be handled in workflow
    "MD024": true, // no-duplicate-heading - will be handled in workflow
    "MD026": true, // no-trailing-punctuation-in-heading - will be handled in workflow
  },
  "frontMatter": {
    "title": "title"
  },
  "ignores": [
    "**/node_modules",
    "**/dist"
  ]
};
