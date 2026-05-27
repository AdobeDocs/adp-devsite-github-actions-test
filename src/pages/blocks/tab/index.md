---
title: Tab Block
description: Organize related content using tabbed layouts with the Tab block component.
---

# Tab Block Example

// copied from https://github.com/AdobeDocs/commerce-webapi/blob/ae6507dd2ffa343f79bd16b842b72a2f9de0a594/src/pages/graphql/schema/customer/mutations/create-v2.md?plain=1#L2
// page https://developer.adobe.com/commerce/webapi/graphql/schema/customer/mutations/create-v2/

<Tab orientation="horizontal" slots="heading, content" repeat="2" theme="light"/>

### Request

```graphql
mutation {
  createCustomerV2(
    input: {
      firstname: "Bob"
      lastname: "Loblaw"
      email: "bobloblaw@example.com"
      password: "b0bl0bl@w"
      is_subscribed: true
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
```

### Response

```json
{
  "data": {
    "createCustomer": {
      "customer": {
        "firstname": "Bob",
        "lastname": "Loblaw",
        "email": "bobloblaw@example.com",
        "is_subscribed": true
      }
    }
  }
}
```

## Vertical Tab — Dark / Navy Theme

<Tab orientation="vertical" slots="heading, image, content" repeat="4" className="background-color-navy" />

## Create PDF from URL

![Adobe PDF Services](/images/adobe-express.svg)

```bash
curl --location --request POST \
  'https://pdf-services.adobe.io/operation/createpdf' \
  --header 'Authorization: Bearer {{token}}' \
  --header 'x-api-key: {{client_id}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "createTaggedPDF": true
  }'
```

## Dynamic PDF Document Generation

![Adobe Document Generation](/assets/ae_appicon_64.svg)

```javascript
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const credentials = PDFServicesSdk.Credentials
  .servicePrincipalCredentialsBuilder()
  .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
  .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
  .build();

const documentMergeOptions = new PDFServicesSdk.DocumentMerge.options
  .DocumentMergeOptions(jsonDataForMerge, OutputFormat.PDF);

const documentMergeOperation = PDFServicesSdk.DocumentMerge.Operation
  .createNew(documentMergeOptions);
```

## Extract PDF Content & Structure

![Adobe PDF Extract](/images/adobe-express.svg)

```python
from adobe.pdfservices.operation.auth.service_principal_credentials import (
    ServicePrincipalCredentials
)
from adobe.pdfservices.operation.pdf_services import PDFServices
from adobe.pdfservices.operation.pdfjobs.jobs.extract_pdf_job import ExtractPDFJob

credentials = ServicePrincipalCredentials(
    client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
    client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
)
pdf_services = PDFServices(credentials=credentials)

input_asset = pdf_services.upload(
    input_stream=input_stream,
    mime_type=PDFServicesMediaType.PDF
)
extract_job = ExtractPDFJob(input_asset=input_asset)
location = pdf_services.submit(extract_job)
```

## Embed PDF for Viewing

![Adobe PDF Embed](/assets/ae_appicon_64.svg)

```html
<div id="adobe-dc-view"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
  document.addEventListener("adobe_dc_view_sdk.ready", function () {
    var adobeDCView = new AdobeDC.View({
      clientId: "YOUR_CLIENT_ID",
      divId: "adobe-dc-view",
    });
    adobeDCView.previewFile({
      content: { location: { url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFfiles/Sample.pdf" } },
      metaData: { fileName: "Sample.pdf" },
    });
  });
</script>
```
