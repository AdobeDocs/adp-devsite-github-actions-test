---
title: Sidenav Exclusion for Non-subPages in config.md
description: Explains why pages not listed in `config.md` under subPages do not display a sidebar navigation in documentation sites.
keywords:
- config.md
- subPages
- sidenav
- documentation navigation
- page layout
faqs:
- question: Why doesn't this page display a sidenav?
  answer: The page isn't included in the `subPages` section of `config.md`, so the sidebar navigation is omitted for this page.
- question: How can I add a sidenav to this page?
  answer: To enable the sidebar navigation, add this page to the `subPages` array in your `config.md` file and ensure its path is correctly referenced.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.