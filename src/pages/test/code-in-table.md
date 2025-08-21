---
title: SignatureOptions Object
description: Provides details about the SignatureOptions object, outlining its properties used for digital signature verification in Adobe I/O Events SDK integrations.
keywords:
- SignatureOptions
- digital signature
- Adobe I/O Events
- SDK
- public key
faqs:
- question: What is the purpose of the SignatureOptions object?
  answer: The SignatureOptions object encapsulates properties required for verifying digital signatures in Adobe I/O Events SDK, such as signature values and public key paths.
- question: How do I obtain the values for digiSignature and publicKeyPath properties?
  answer: The digiSignature properties come from specific headers in event requests, and the publicKeyPath properties contain relative paths to the public keys also specified in request headers.
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
