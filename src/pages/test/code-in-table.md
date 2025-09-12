---
title: Understanding SignatureOptions for Adobe IO Events SDK Signature Verification
description: An overview of the SignatureOptions object used in Adobe IO Events SDK for verifying digital signatures through specific header values and public key paths.
keywords:
- Adobe IO Events
- SDK Signature Verification
- digital signature
- public key path
- SignatureOptions
faqs:
- question: What is the purpose of the digiSignature1 and digiSignature2 properties in SignatureOptions?
  answer: They hold the values of digital signatures retrieved from the respective x-adobe-digital-signature1 and x-adobe-digital-signature2 headers for verification purposes.
- question: How are publicKeyPath1 and publicKeyPath2 used in the signature verification process?
  answer: These properties contain relative paths to the ioevents public keys, referenced from the x-adobe-public-key1-path and x-adobe-public-key2-path headers, which are needed to verify the signatures.
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
