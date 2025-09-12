---
title: Configuring Page Visibility and Navigation Settings
description: This page explains how to manage page inclusion in the navigation sidebar by modifying the config.md subPages settings.
keywords:
- page visibility
- config.md
- subPages configuration
- sidenav management
- documentation navigation
faqs:
- question: Why doesn't this page have a sidenav?
  answer: This page is not listed in the config.md subPages, so it is excluded from the navigation sidebar by design.
- question: How can I add a page to the sidenav?
  answer: To include a page in the sidenav, add its reference to the subPages array within the config.md file.
---
This page isn't in `config.md subPages`, so it shouldn't have a sidenav.