---
title: Sidenav Exclusion for Pages Not in config.md subPages
description: This document explains why certain pages do not display a sidenav when they are not listed in the config.md subPages array.
keywords:
- config.md
- subPages
- sidenav
- documentation structure
- page navigation
faqs:
- question: Why is there no sidenav on this page?
  answer: The sidenav is only shown for pages listed in the config.md subPages array; since this page isn't included, no sidenav appears.
- question: How can I add a sidenav to this page?
  answer: To show a sidenav, add the page to the subPages array in config.md and configure the navigation links as needed.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.