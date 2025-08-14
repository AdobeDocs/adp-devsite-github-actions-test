---
title: SignatureOptions : object
description: This document details the SignatureOptions object used in Adobe I/O Events SDK for digital signature verification. It outlines the properties required for handling digital signatures and public key paths, specifying their types and functions within the verification process.
keywords:
- SignatureOptions
- digital signature
- public key
- Adobe I/O Events
- SDK
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
