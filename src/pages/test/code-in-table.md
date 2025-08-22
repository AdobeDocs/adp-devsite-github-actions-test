---
title: SignatureOptions Object
description: Documentation for the SignatureOptions object, outlining its properties and usage in digital signature verification with Adobe I/O Events SDK.
keywords:
- SignatureOptions
- digital signature
- Adobe I/O Events
- public key path
- SDK verification
faqs:
- question: What is the SignatureOptions object used for?
  answer: The SignatureOptions object is used to manage and verify digital signatures and public key paths within applications that process Adobe I/O Events.
- question: How do I obtain values for digiSignature and publicKeyPath properties?
  answer: Both digiSignature and publicKeyPath values are typically extracted from specific HTTP headers included in Adobe I/O Event requests to your application.
---
// copied from https://github.com/AdobeDocs/adobe-io-events/blob/main/src/pages/guides/sdk/sdk_signature_verification.md?plain=1#L43
// page https://developer.adobe.com/events/docs/guides/sdk/sdk_signature_verification/

#### SignatureOptions : `object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [digiSignature1] | `string` | Value of digital signature retrieved from the x-adobe-digital-signature1 header |
| [digiSignature2] | `string` | Value of digital signature retrieved from the x-adobe-digital-signature2 header |
| [publicKeyPath1] | `string` | Relative path of ioevents public key retrieved from the x-adobe-public-key1-path header |
| [publicKeyPath2] | `string` | Relative path of ioevents public key retrieved from the x-adobe-public-key2-path header |
