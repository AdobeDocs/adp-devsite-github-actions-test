---
title: Details HTML Quoted Angle Brackets Test
description: Test that EDS Details blocks with angle brackets in attribute values are not flagged
---

# Details HTML Quoted Angle Brackets Test

## Should NOT trigger no-details-html (EDS Details with angle brackets in attributes)

**xdmEntity** _object_

<Details slots="heading,list" repeat="2" summary="(show/hide child properties)" subText="< link relation > object" />

The Resource Change object describes how a particular resource was affected.

<Details slots="heading" repeat="3" summary="(show/hide)" subText="event:action <string>" />

Another example with angle brackets inside quoted attribute values.

## Should NOT trigger no-details-html (standard EDS Details self-closing)

<Details slots="heading,list" repeat="1" summary="Text Description" subText="Description" />

This is a standard EDS Details block without angle brackets in attributes.

## Should trigger no-details-html (HTML details element)

<details>
  <summary>Click to expand</summary>
  This is an HTML details element that should be flagged.
</details>
