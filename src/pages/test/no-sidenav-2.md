---
title: Sidenav Exclusion for Non-Config.md subPages
description: Explains why pages not listed in 'config.md subPages' should not display a sidenav.
keywords:
- sidenav
- config.md
- subPages
- navigation
- documentation
faqs:
- question: Why shouldn't pages outside 'config.md subPages' have a sidenav?
  answer: Pages not in 'config.md subPages' lack the navigation structure, so displaying a sidenav could confuse users with irrelevant links.
- question: How can I ensure a page does not display a sidenav?
  answer: Verify that the page is not referenced in 'config.md subPages' so the sidebar navigation is automatically omitted during rendering.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.