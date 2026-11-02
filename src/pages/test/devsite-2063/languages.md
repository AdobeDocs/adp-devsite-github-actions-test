# Languages listed as supported that don't highlight

`php`, `javadoc` and `jsdoc` are in the supported language lists, but their Prism grammars depend on files missing from `hlx_statics/scripts/prism-grammars/` (`prism-markup-templating.min.js` and `prism-javadoclike.min.js`), so they render as plain text. The `java` and `javascript` blocks are controls and should be highlighted.

## php (not highlighted)

```php
<?php
function greet(string $name): string {
    return "Hello, " . $name;
}
echo greet('World');
```

## javadoc (not highlighted)

```javadoc
/**
 * Returns a greeting.
 * @param name the name to greet
 * @return the greeting
 */
public String greet(String name) {
    return "Hello, " + name;
}
```

## jsdoc (not highlighted)

```jsdoc
/**
 * Returns a greeting.
 * @param {string} name - The name to greet.
 * @returns {string} The greeting.
 */
function greet(name) {
  return `Hello, ${name}`;
}
```

## java (control, highlighted)

```java
/**
 * Returns a greeting.
 * @param name the name to greet
 * @return the greeting
 */
public String greet(String name) {
    return "Hello, " + name;
}
```

## javascript (control, highlighted)

```javascript
/**
 * Returns a greeting.
 * @param {string} name - The name to greet.
 * @returns {string} The greeting.
 */
function greet(name) {
  return `Hello, ${name}`;
}
```
