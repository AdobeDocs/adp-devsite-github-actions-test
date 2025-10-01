---
title: Adobe I/O Events FAQ
---

import RetryDoc from '../common/retry-doc.md'

# Adobe I/O Events Frequently Asked Questions (FAQ)

## General Questions

### Which events are currently supported by Adobe I/O Events?

Adobe I/O Events regularly adds new event providers. As of now, the following Adobe solutions are supported:

- Adobe Campaign Standard
- [Adobe Commerce](https://developer.adobe.com/commerce/extensibility/events/)
- Adobe Document Cloud
- [Adobe Experience Manager (AEM)](../guides/using/aem/index.md)
- [Adobe Experience Platform Notifications](../guides/using/experience-platform-event-setup.md)
- [Adobe Experience Platform Privacy Service](../guides/using/privacy-event-setup.md)
- [Adobe Experience Platform Data Hygiene](https://experienceleague.adobe.com/en/docs/experience-platform/data-lifecycle/best-practices#monitor)
- [Analytics Triggers](https://www.adobe.com/go/devs_events_triggers_docs)
- Asset Compute
- [Asset Events (Creative Cloud)](../guides/using/asset-events/asset-events-landing.md)
- [Cloud Manager](https://www.adobe.com/go/devs_events_cloudmanager_docs)
- [Content Log Events](../guides/using/contentlogs/contentlogs-setup.md)
- Globalization Content Service
- [Imaging APIs](https://developer.adobe.com/firefly-services/docs/photoshop/features/#webhooks-through-adobe-io-events)
- [InDesign APIs](../guides/using/indesign-apis/indesign-apis-events-data-stream-setup.md)
- [Marketo Data Streams](../guides/using/marketo/marketo-data-streams.md)
- You can also register your own [Custom Events Provider](../guides/using/custom-events.md)

### What is the guarantee of events delivery?

Adobe I/O Events provides **durable delivery**. Each event is delivered at least once for each registration.
If your webhook endpoint does not acknowledge receipt of the event delivery, Adobe I/O Events retries delivery. See the [Webhook FAQ](#webhook-faq) for more details.

**Important notes:**

- Event order is not guaranteed. Events may arrive out of order (applies to [Journaling API](../guides/journaling-intro.md) as well).
- Duplicate events may be sent.
- Each event payload includes a unique event UUID.
- The same UUID is included in the `x-adobe-event-id` header of the webhook request.

### Do you guarantee the order of events delivery?

No. Event order is not guaranteed. See the previous answer for details.

### What permissions are required to use Adobe I/O Events?

Permissions and entitlements depend on the event provider:

- Some providers are available to all Adobe customers.
- Others require enterprise developer or administrator access.
- Some providers require licensing.

For licensing questions, contact your Adobe account manager.

### Which subscription types does Adobe I/O Events support?

Adobe I/O Events supports the following subscription types:

- For near-real-time notifications (push model):
    - [Webhooks](../guides/index.md)
    - [Runtime actions as Webhooks](../guides/runtime-webhooks/index.md)
    - [Amazon EventBridge](../guides/amazon-eventbridge/index.md)
- For batch retrieval of events (pull model):
    - [Journaling API](../guides/journaling-intro.md)

### What should I do if I am unable to delete a project because of a conflicting provider?

If you see an error when deleting a project in the Developer Console, it may be due to an event provider associated with the same workspace.
You must delete the event provider before deleting the project.

**Steps to resolve:**

1. In the Developer Console, select "Project overview" from the left menu.
2. Click "Download" in the top menu to download the project metadata JSON file.
3. Open the JSON file and note:
    - Consumer organization ID (`project.org.id`)
    - Project ID (`project.id`)
    - Workspace ID (`project.workspace.id`)
4. Use the [Provider API documentation](../guides/api/provider-api.md) to fetch your I/O Events providers for the organization id.
5. Find the provider with the matching workspace id. Note the provider `id`.
6. Delete the provider using the [Provider API](../api.md#operation/deleteProvider) and the ids from above.
7. Repeat for all conflicting providers, then try deleting the project again.

![Error while deleting a project](./img/project-delete-violation.png "Error while deleting a project")

### Why do I see duplicate fields for `recipient client ID` and `event ID` in the delivered payload?

Adobe I/O Events delivers payloads with both the new and deprecated attribute names for `recipient client ID` and `event Id` to ensure compatibility during the transition to stricter [CloudEvents specification compliance](https://github.com/cloudevents/spec/blob/v1.0/spec.md#attribute-naming-convention).

**You may see all four fields in your event payload:**

- `eventid` (CloudEvents-compliant, **new**)
- `recipientclientid` (CloudEvents-compliant, **new**)
- `event_id` (**deprecated**)
- `recipient_client_id` (**deprecated**)

**Why are there duplicate fields?**

- The new attributes `eventid` and `recipientclientid` follow the [CloudEvents attribute naming convention](https://github.com/cloudevents/spec/blob/v1.0/spec.md#attribute-naming-convention) and are required for future compatibility.
- The old attributes `event_id` and `recipient_client_id` are included temporarily to avoid breaking existing integrations.
- Both sets of fields carry the same values in each event payload.

**Action required:**

- Update your integration to use the new `eventid` and `recipientclientid` fields.
- The deprecated fields (`event_id`, `recipient_client_id`) will be removed by the **end of 2025**.
- We recommend migrating as soon as possible to ensure continued compatibility.

## Webhook FAQ

### What happens if my webhook is down? Why is my event registration marked as `Unstable`?

If your webhook is down, Adobe I/O Events retries delivery (see details below). Your event registration may be marked as `Unstable`.

<RetryDoc/>

You can use the [Journaling API](../guides/journaling-intro.md) to retrieve events published while your webhook was down.
Once your webhook is restored, you can re-enable your event registration (see next question).

### How can I re-enable my event registration after downtime? How can I retrieve missed events?

1. Fix the issue preventing your webhook from responding.
2. Log in to the Adobe Developer Console.
3. Edit your event registration. This triggers a webhook challenge request and re-activates your registration.

While your registration is disabled, Adobe logs events in your Journal. You can retrieve all events for the past 7 days using the [Journaling API documentation](../guides/journaling-intro.md).

### How can I read the delivery retry count (and other request headers) in my runtime action configured as a webhook?

The (subset of) request headers pertaining to the event delivery can be read from the `__adobe_headers` action param:
```js
const { errorResponse } = require('../utils');

function main(params) {
    const headers = params['__adobe_headers'];
    const retryCountValue = headers['x-adobe-retry-count'];
    // The x-adobe-retry-count header is not always present (it's missing on the very first delivery attempt)
    // Only if the first delivery attempt fails, the subsequent requests will have this header present
    if (retryCountValue !== undefined) {
        // All header values are strings
        const retryCount = Number(retryCountValue);
        if (retryCount >= 3) {
            // Exceeded 3 retry attempts, signal to no longer retry processing this event
            return errorResponse(400, 'Exceeded 3 retry attempts')
        }    
    }

    try {
        // Process the event
    } catch (e) {
        // This will trigger a retry attempt
        return errorResponse(500, 'An unexpected error occured');
    }
    
    return {
        statusCode: 200,
        body: 'Event processed successfully'
    };
}
```

For details on which headers are passed to the user action, see [Runtime Webhooks Request Headers](../guides/runtime-webhooks/index.md#request-headers).

### What happens if my webhook cannot handle a specific event but handles others?

- If delivery fails with any of the following status codes, Adobe I/O Events retries delivery.
    - [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)
    - 5xx error codes (except [505 HTTP Version Not Supported](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505))
    - 6xx error codes ([Adobe I/O Events custom error codes](tracing.md#6xx-custom-status-codes))
- Other status codes are **not retried**.
- Retries continue for 24 hours. If all attempts fail, the event is dropped.
- The event registration remains **Active** and continues processing other events.

### What are non-standard 6xx webhook status codes?

Adobe I/O Events uses custom 6xx status codes to indicate specific issues when no HTTP response is received from your webhook server. See [Debug Tracing: 6xx Custom Status Codes](tracing.md#6xx-custom-status-codes) for details.

### Does every Adobe I/O Events webhook HTTP request include a signature?

Yes. Every request includes a [`x-adobe-signature`](../guides/index.md#security-considerations) header, including the initial challenge GET request. See [Security Considerations](../guides/index.md#security-considerations) for more information.

### Do Adobe I/O Events notifications come from static IPs?

No. Adobe I/O Events notifications are sent from AWS and Azure, and their IPs change over time.

**Security note:**

- Each request includes a signature header (see above).
- If you require static IPs, use the pull model and the [Journaling API](../guides/journaling-intro.md).

### What is the size of notifications in batch delivery style?

When registering a webhook, you can choose the delivery style:

- **Single:** One event per HTTP request.
- **Batch:** Multiple events per request. Batch size is up to 2MB and a maximum of 20 events. Please note that the batch size may vary depending on the incoming traffic.

### How can I debug and see logs for successful invocations to my runtime action (configured as webhook)?

To debug successful invocations, relay the `activation_id` of your target user action as a response header (e.g., `x-target-action-activation-id`). This allows you to trace activations in the Developer Console without enabling the `x-ow-extra-logging=on` header (which also impacts Runtime performance).

## Journaling FAQ

### How far back are I/O Events available via the Journaling API?

Adobe I/O stores 7 days of subscribed events, retrievable via the Journaling API.

### Why do I only get one event, regardless of the `limit` I use?

The Journaling API `limit` parameter sets the **maximum** number of events returned. You may receive fewer events than the limit, depending on the incoming traffic. This is expected. For example, you may only see a single event in a journal batch/page even when the journal holds more than 1 event.
See the [Journaling API documentation](../guides/api/journaling-api.md#limiting-the-size-of-the-batch) for details.

### Can I retrieve all events in one request?

No. The Journaling API does not support retrieving all events in a single query. Use the `since` parameter and follow the journal's [rel=next Link](../guides/api/journaling-api.md#fetching-the-next-batch-of-newer-events-from-the-journal) to fetch events incrementally.

### Can I start fetching events from a specific point in time?

Yes. Use the `seek` parameter with the Journaling API to start from a specific point in time, using an [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) (e.g., `-PT2H` for 2 hours ago, `-P1D` for 1 day ago).
This is especially useful for investigating events within a particular time window.
See the [Journaling API documentation](../guides/api/journaling-api.md#starting-from-a-specific-point-in-time-with-the-seek-parameter) for examples.

## Custom Events FAQ

### Why is my Custom Events Provider not showing up in the Adobe Developer Console?

If you create a Custom Events Provider using the [Provider API](../guides/api/provider-api.md), it will only appear in the Adobe Developer Console after you create at least one Event Metadata associated with it.

**After associating Event Metadata:**

- The provider appears in your Developer Console project.
- You can register against it.
- You can emit events using the [Events Publishing API](../guides/api/eventsingress-api.md).

### Does Custom Events Provider support high volume? Is there a throttling policy?

Yes, there is a throttling policy. See the [Events Publishing API guide](../guides/api/eventsingress-api.md) for details. For high-volume use cases, contact Adobe to discuss your needs.
