---
title: Config.md subPages and Sidenav Visibility
description: This document explains the relationship between the config.md subPages setting and the display of the sidenav in documentation pages.
keywords:
- config.md
- subPages
- sidenav
- documentation structure
- navigation settings
faqs:
- question: Why is the sidenav missing from this page?
  answer: The sidenav is not displayed because this page is not listed in config.md under subPages. Only pages defined in subPages will show the sidenav.
- question: How do I enable the sidenav for this documentation page?
  answer: To enable the sidenav, add this page to the subPages array in config.md and save your changes; the sidenav will then appear.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.