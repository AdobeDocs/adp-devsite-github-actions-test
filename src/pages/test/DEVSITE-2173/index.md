---
title: DEVSITE-2173 OnThisPage excludes block headings
description: Test page verifying that OnThisPage only includes headings from default content, not from inside blocks such as Tab.
---

# DEVSITE-2173: OnThisPage — Block Heading Exclusion

This page verifies the fix for DEVSITE-2173.

**Expected OnThisPage entries (default content only):**
- Section One
- Sub-section A
- Section Two
- Section Three
- Section Four
- Section Five

**NOT expected in OnThisPage (inside blocks):**
- Tab heading: "Request" / "Response"
- Tab heading: "Overview" / "Details" / "Example"
- AccordionItem heading: "Start session" / "Send ping"
- CodeBlock heading: "Request" / "Response"

## Section One

This is default content under Section One. The heading above lives outside any block and should appear in OnThisPage.

### Sub-section A

This is a sub-heading in default content. It should also appear in OnThisPage (indented).

## Section Two

Default content section. Below is a horizontal Tab block — its `### Request` and `### Response` headings should **not** appear in OnThisPage.

<Tab orientation="horizontal" slots="heading, content" repeat="2" theme="light" />

### Request

```json
{
  "query": "{ user { id name email } }"
}
```

### Response

```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Ada Lovelace",
      "email": "ada@example.com"
    }
  }
}
```

## Section Three

Default content section. Below is a vertical Tab block — its `## Overview`, `## Details`, and `## Example` headings should **not** appear in OnThisPage.

<Tab orientation="vertical" slots="heading, content" repeat="3" theme="dark" />

## Overview

A brief summary of what this feature does and why it matters.

## Details

In-depth information about configuration options and behaviour.

## Example

A complete working example showing end-to-end usage.

## Section Four

Default content section. Below is an AccordionItem block — its `### Start session` and `### Send ping` headings are **rendered as live `<h3>` elements** in the DOM after decoration. With the original selector they incorrectly appeared in OnThisPage.

<AccordionItem slots="heading, text" repeat="2" />

### Start session

The player sends a session start event to the backend.

### Send ping

A ping is sent every 10 seconds to keep the session alive.

## Section Five

Default content section. Below is a **CodeBlock** block — the exact block from the ticket. Its `decorate()` puts heading slot content into `tab.innerHTML`, so the `<h3>` nodes survive **inside `<button>` elements** after decoration. With the original selector these h3s were incorrectly found by OnThisPage.

<CodeBlock slots="heading, code" repeat="2" />

### Request

```json
{
  "query": "{ user { id name email } }"
}
```

### Response

```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Ada Lovelace"
    }
  }
}
```
