---
title: Sidenav Exclusion for Pages Not in config.md subPages
description: This document explains why pages that are not listed under `subPages` in `config.md` should not include a sidenav in their layout.
keywords:
- sidenav
- config.md
- subPages
- documentation navigation
- page layout
faqs:
- question: Why shouldn't a page have a sidenav if it's not in config.md subPages?
  answer: If a page isn't listed in `subPages`, it isn't part of the sidebar navigation structure, so including a sidenav would create navigation inconsistencies.
- question: How do I ensure a page does not display the sidenav?
  answer: Remove the page from the `subPages` property in `config.md` or adjust the page template to conditionally render the sidenav only for listed pages.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.