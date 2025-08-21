---
title: SignatureOptions Object
description: Documentation of the SignatureOptions object, outlining its properties used for signature verification with Adobe I/O Events SDK.
keywords:
- SignatureOptions
- digital signature
- public key
- Adobe I/O Events
- SDK verification
faqs:
- question: What is the purpose of the SignatureOptions object in Adobe I/O Events SDK?
  answer: SignatureOptions holds digital signature values and public key paths required for verifying event authenticity in the SDK.
- question: How are digital signatures and public key paths obtained in SignatureOptions?
  answer: Digital signatures and public key paths are retrieved from specific header values in event requests and then assigned to their respective properties in the SignatureOptions object.
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
