---
title: Adobe Journey Optimizer API reference
description: An API reference for the Adobe Journey Optimizer (AJO) mobile extension.
keywords:
- Adobe Journey Optimizer
- API reference
- Messaging
---

# Adobe Journey Optimizer API reference

## extensionVersion

The extensionVersion API returns the library version.

<CodeBlock slots="heading, code" repeat="7" languages="Java syntax, Java, Kotlin, Swift syntax, Swift, Objective-C syntax, Objective-C"/>

### Android

```java
public static String extensionVersion()
```

### Android

```java
Messaging extensionVersion();
```

### Android

```kotlin
Messaging extensionVersion();
```


### IOS

```swift
static func clearCachedPropositions()
```

### IOS

```swift
Optimize.clearCachedPropositions()
```

### IOS

```objc
+ (void) clearCachedPropositions;
```

### IOS

```objc
[AEPMobileOptimize clearCachedPropositions];
```

## registerExtension

<InlineAlert variant="warning" slot="text" />

This API has been deprecated starting in v2.0.0 and removed in v3.0.0 of the Android mobile extension.
Use `MobileCore.registerExtensions()` API instead.

<CodeBlock slots="heading, code" repeat="2" languages="Java syntax, Kotlin"/>

### Android

```java
public static String registerExtension()
```

### Android

```kotlin
Messaging.registerExtension();
```

## resetIdentities

The [MobileCore.resetIdentities](../../home/base/mobile-core/api-reference.md#resetidentities) API is used to inform extensions to clear any identities that it owns. Starting with release 3.3.3 on Android and 5.6.3 on iOS, the Messaging extension handles the `MobileCore.resetIdentities` API by clearing the push identifier from the Messaging extension. Using this API does not remove the push identifier from the server-side User Profile Graph.


<CodeBlock slots="heading, code" repeat="4" languages="Java, Kotlin, Swift, Objective-C"/>

### Android

```java
MobileCore.resetIdentities();
```

### Android

```kotlin
MobileCore.resetIdentities();
```

### IOS

```swift
MobileCore.resetIdentities()
```

### IOS

```objc
[AEPMobileCore resetIdentities];
```
