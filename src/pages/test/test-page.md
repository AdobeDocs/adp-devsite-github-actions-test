---
title: Integrate Analytics Triggers with Adobe I/O Events
---

# Integrate Analytics Triggers with Adobe I/O Events

These instructions describe how to use Adobe Analytics triggers to notify you of Adobe I/O events, including the behavior of your site's users. Follow the instructions below to try the solution yourself.

## Introduction

### What are Triggers?

Triggers is an Experience Cloud Activation core service that enables marketers to identify, define, and monitor key consumer behaviors, and then generate cross-solution communication to re-engage visitors. Triggers uses Adobe Analytics as the data source for consumer behavior.
For more information on triggers, see the [Triggers Help Page](https://experienceleague.adobe.com/en/docs/core-services/interface/services/triggers).

Before setting up and using Adobe I/O, you will need to do the following:

1. [Obtain product authorization](#obtain-product-authorization)
2. [Obtain administrative permissions](#obtain-administrative-permissions)

### Obtain product authorization

To complete this solution, you will need authorization to use the following services:

* Adobe Analytics, including Triggers
* Adobe Campaign
* Adobe Experience Cloud Activation Core Services
* An [Adobe ID](https://helpx.adobe.com/x-productkb/global/adobe-id-account-change.html), if you do not have one already

### Obtain administrative permissions

You will also need administrative permissions for the following:

* Adobe Analytics
* Your enterprise organization

If you do not have administrative permissions, please contact your Adobe System Administrator. After requesting administrative permissions, watch for an email from Adobe Systems Incorporated, as shown:

![Admin rights email](../img/events_atrig_01.png)

### Set up products

To set up Analytics Triggers:

1. [Get product access through Adobe Admin Console](#get-product-access-through-adobe-admin-console)
2. [Specify a new trigger](#specify-a-new-trigger)

#### Get product access through Adobe Admin Console

To get access through the Adobe Admin Console:

1. Sign into the console by clicking the **Sign in** button on the administrator rights email you received from Adobe and then providing your credentials.
2. On the main screen of the Admin Console, select **Products**.
3. On the Products page of the console, verify that your requested products have been added to the site and then select the **Adobe Analytics** icon.

   ![Admin Console products page](../img/events_atrig_31.png "Admin Console products page")

4. Select the **Details** links and verify that **Triggers** appears in the **Inclued Services** section.

   ![Admin Console: configure product](../img/events_atrig_32.png "Admin Console: configure product")

5. To give permissions to users who want access to Adobe services in the cloud:
    1. Select **User management** and then select **Users**.
    2. Select the user's name.

       ![Selecting the user name](../img/events_atrig_05.png "Selecting the user name")

    3. For the user's **Access and rights**, provide **Product Access** and **Admin Rights** from the drop-down for the available products and services.

       ![Setting the user access rights](../img/events_atrig_06.png "Setting the user access rights")

#### Specify a new trigger

You can specify triggers for many events on your site. This example will set notifications to be sent when carts are abandoned: set a trigger for sessions when the user visits either a **cart.html**, **checkout.html** or **order.html** page, but never reaches the **thank-you.html** page within a ten minute session. The trigger indicates that the user added products to the cart, and was about to make a purchase, but later decided otherwise, or forgot to complete the purchase.

To specify a new trigger:

1. On the Experience Cloud home page, select the **Apps** icon, and then select **Activation**.

   ![Experience Cloud Admin, selecting Activation](../img/events_atrig_34.png "Experience Cloud Admin, selecting Activation")

2. In the **Web Activation** section, select the **Triggers** option.

   ![Launching Triggers](../img/events_atrig_33.png "Launching Triggers")

3. On the **Triggers** page, select the **New Triggers** button, and then choose **Abandonment**.

   ![Selecting the Abandonment trigger](../img/events_atrig_19.png "Selecting the Abandonment trigger")

4. On the **New Trigger** box, specify a **Name** and provide a **Description** for your trigger. Select the **Report Suite** that contains the Adobe Analytics data you want to trigger from.

   ![Entering trigger details](../img/events_atrig_20.png "Entering trigger details")

5. On the **Triggers Settings** page, define the business rules for your trigger. You can drag a dimension/metric box from the left panel to the right side of the screen and then specify the business rules for what must happen and what must not happen in a session. In this case, set the trigger to fire after 10 minutes of inactivity after the rules are met.

   ![Defining trigger business rules](../img/events_atrig_21.png "Defining trigger business rules")

6. Save your changes.

Once you save the trigger, any event in your report suite that meets the defined business rules criteria will cause a trigger to fire. You can view the status of triggers on the **Triggers** page.

![Viewing triggers listing](../img/events_atrig_22.png "Viewing triggers listing")

## Use Adobe Developer Console

Integrations are created as part of a project within Adobe Developer Console. This requires you to have access to [Console](https://www.adobe.com/go/devs_console_ui) in order to create a project, add events to your project, configure the events, and register your webhook.

For detailed instructions on completing these steps, please begin by reading the [Adobe Developer Console Getting Started guide](https://www.adobe.com/go/devs_console_getting_started).

When you are ready to [add events to your project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-event) follow the steps provided, making sure to select **Analytics Triggers**.

Once you have completed the event registration, you will be taken to the *Registration Details* page where you will be able to see the details of your new registration.

For more information, read the [Introduction to Webhooks](../index.md).

*The following image shows an example of an event registration using Creative Cloud Libraries. Results for Adobe Analytics will be similar.*

![Event Registration Details tab in Adobe Developer Console](../img/events-registration-details.png)

## Watch the solution work

Your enterprise may have its own tool that you can use to subscribe and listen to webhook events. Alternatively, you can use the following procedure to set up notifications with Slack.

To watch your trigger work on Slack:

1. Clone the repository and follow the setup described on [https://github.com/hirenshah111/webhook_server].
2. Modify the Slack details in webhook_server/public/javascripts/app.js according to how you want to see the notifications.
3. Run the application and create a **triggers2** listener, then select **Connect**.
   ![Listening to webhook events](../img/events_atrig_29.png "Listening to webhook events")

Trigger messages are received as `POST` requests on this thread.

Here is a sample Analytics Triggers event payload:

```json
{
  "event_id": "52ebf673-8aeb-4347-8852-bf86a18292e4",
  "event": {
    "com.adobe.mcloud.pipeline.pipelineMessage": {
      "header": {
        "sentTime": 1727104300204,
        "imsOrg": "6578A55456E84E247F000101@AdobeOrg"
      },
      "com.adobe.mcloud.protocol.trigger": {
        "triggerId": "697514a8-3337-4efc-ba75-1f0ba896c288",
        "triggerTimestamp": 1516324157228,
        "mcId": "00000000000000000000000000000000000000",
        "enrichments": {
          "analyticsHitSummary": {
            "dimensions": {
              "eVar3": {
                "type": "string",
                "data": [
                  "localhost:4502/content/we-retail.html",
                  "localhost:4502/content/we-retail/us/en.html",
                  "localhost:4502/content/we-retail/us/en/products/men/shirts/eton-short-sleeve-shirt.html",
                  "localhost:4502/content/we-retail/us/en/men.html",
                  "localhost:4502/content/we-retail/us/en/user/cart.html"
                ],
                "name": "eVar3",
                "source": "session summary"
              },
              "pageURL": {
                "type": "string",
                "data": [
                  "http://localhost:4502/content/we-retail.html",
                  "http://localhost:4502/content/we-retail/us/en.html",
                  "http://localhost:4502/content/we-retail/us/en/products/men/shirts/eton-short-sleeve-shirt.html",
                  "http://localhost:4502/content/we-retail/us/en/men.html",
                  "http://localhost:4502/content/we-retail/us/en/user/cart.html"
                ],
                "name": "pageURL",
                "source": "session summary"
              }
            },
            "products": {}
          }
        },
        "triggerPath": [
          {
            "timestamp": 1516324118010,
            "stateId": "start_and_and",
            "transition": "null"
          },
          {
            "timestamp": 1516324148711,
            "stateId": "vmi_and_1",
            "transition": "conditional -> select * where evars.evars.eVar3 like 'localhost:4502/content/we-retail/us/en/user/cart.html'"
          },
          {
            "timestamp": 1516324148711,
            "stateId": "notify_wait",
            "transition": "states visited -> [StateVisitedNode [stateId=vmi_and_1, count=1, operator=GE]]"
          },
          {
            "timestamp": 1516324153994,
            "stateId": "notify",
            "transition": "inactive_timeout -> 5"
          }
        ]
      }
    }
  }
}
```
