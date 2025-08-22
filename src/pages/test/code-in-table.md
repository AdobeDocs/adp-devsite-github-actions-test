---
title: SignatureOptions : `object`
description: Overview of the SignatureOptions object and its properties used for SDK signature verification in Adobe I/O Events.
keywords:
- SignatureOptions
- digital signature
- public key path
- Adobe I/O Events
- SDK verification
# --- FAQs ---
faqs:
- question: What are digiSignature1 and digiSignature2 used for?
  answer: They store the digital signature values retrieved from the x-adobe-digital-signature1 and x-adobe-digital-signature2 headers for verifying message authenticity.
- question: How do I specify the public key paths in SignatureOptions?
  answer: Use publicKeyPath1 and publicKeyPath2 to provide the relative paths to the ioevents public keys from the respective headers for signature verification.
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
