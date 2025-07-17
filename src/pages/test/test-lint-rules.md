# Test Lint Rules

This file contains test cases for various markdown linting rules.

## Test Case 1: Valid - Single H1

This file has exactly one h1 heading (`# Test Lint Rules`) which is valid according to the `no-multiple-h1` rule.

## Test Case 2: Valid - Multiple H2+ Headings

### This is an H3 heading

#### This is an H4 heading

##### This is an H5 heading

Multiple h2-h6 headings are allowed.

## Test Case 3: Invalid Example (Commented Out)

The following would violate the no-multiple-h1 rule:

# First H1 Heading

his would cause a linting error because there are multiple h1 headings in the same file.
