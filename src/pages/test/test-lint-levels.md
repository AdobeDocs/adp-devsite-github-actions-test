# Test Lint Rule Levels

This file demonstrates different markdown linting rule levels.

## Error Rules (Will Fail PR)

### MD009 - No Trailing Spaces
This line has a trailing space: 

### MD012 - No Multiple Blanks


This line has multiple blank lines above it.

### MD013 - Line Length
This is a very long line that exceeds the default line length limit and should trigger an error because it's too long and violates the line length rule.

### MD041 - First Line Heading
This file starts with an h1 heading, which is correct.

## Warning Rules (Will Show Warning but Pass PR)

### MD025 - Single H1 (Multiple Top-Level Headings)
This file has one h1 heading at the top, which is correct.

### MD024 - No Duplicate Heading
## Duplicate Heading
Some content here.
## Duplicate Heading
This duplicate heading should trigger a warning.

### MD026 - No Trailing Punctuation in Heading
## Heading with trailing punctuation?

## Summary

- **Errors** (fail PR): trailing spaces, multiple blanks, long lines, missing first heading
- **Warnings** (pass PR): multiple h1s, duplicate headings, trailing punctuation in headings 
