// copied from https://github.com/AdobeDocs/adobe-io-events/blob/main/src/pages/guides/sdk/sdk_signature_verification.md?plain=1#L43
// page https://developer.adobe.com/events/docs/guides/sdk/sdk_signature_verification/

#### SignatureOptions : `object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [digiSignature1] | <code>string</code> | Value of digital signature retrieved from the x-adobe-digital-signature1 header |
| [digiSignature2] | <code>string</code> | Value of digital signature retrieved from the x-adobe-digital-signature2 header |
| [publicKeyPath1] | <code>string</code> | Relative path of ioevents public key retrieved from the x-adobe-public-key1-path header |
| [publicKeyPath2] | <code>string</code> | Relative path of ioevents public key retrieved from the x-adobe-public-key2-path header |
