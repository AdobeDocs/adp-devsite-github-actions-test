---
title: Adobe Experience Platform Data Collection APIs
description: Overview of the Adobe Experience Platform data collection APIs.
---

<HeroSimple slots="image, heading, text" background="rgb(154, 23, 34)"/>

![Hero image](assets/platform-hero.png)

# Adobe Experience Platform data collection APIs

The Adobe Experience Platform data collection APIs provide a universal way to ingest, standardize, and persist customer data from across your organization.


<Resources slots="heading, links"/>

#### Resources

* [Quick start guide](getting-started/index.md)
* [Endpoint guides](endpoints/index.md)
* [API reference](https://github.com/AdobeDocs/data-collection-apis)
* [Github repository](https://github.com/AdobeDocs/data-collection-apis)

## Overview

The Adobe Experience Platform data collection APIs provide endpoints for sending data to Adobe Experience Platform.

Data collection libraries, such as the Web SDK or Mobile SDK, provide methods that facilitate the usage of these endpoints. You can call data collection endpoints directly instead of using the Web SDK or Mobile SDK. This option is valuable when your project is in a code base that neither the Web SDK nor the Mobile SDK supports.

## Categories of endpoints

There are two main categories of endpoints:

* **Edge Network API**: Provides the most straightforward way to send data to Adobe. These endpoints offer both authenticated and non-authenticated methods to send data to Adobe.
* **Media Edge API**: Provides a set of endpoints that allow you to send media tracking data to Adobe. Usage of these endpoints requires the Streaming Media Collection Add-on. Contact your Adobe Account Team for more information.
