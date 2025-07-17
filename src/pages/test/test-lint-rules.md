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

The following would violate the single-h1 rule:

<!-- 
# First H1 Heading

Some content here.

# Second H1 Heading

This would cause a linting warning because there are multiple h1 headings in the same file.
-->

## Test Case 4: Valid - Mixed Heading Levels

### Subsection 1
Content for subsection 1.

### Subsection 2  
Content for subsection 2.

#### Sub-subsection
More detailed content.

## Test Case 5: Valid - No Additional H1

This file demonstrates that having exactly one h1 at the top is valid, and all other headings should be h2 or lower.

### Summary

- ✅ One h1 heading at the top
- ✅ Multiple h2-h6 headings allowed
- ⚠️ Multiple h1 headings would show as warnings (not errors)
- ❌ No h1 heading would also fail (if required by other rules)
