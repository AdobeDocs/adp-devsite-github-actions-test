---
title: Sign in from CLI
description: This guide explains how to authenticate using the Adobe App Builder CLI, enabling local development and interaction with your project in Adobe Developer Console.
keywords:
- Adobe App Builder
- CLI login
- Adobe Developer Console
- aio login
- authentication
faqs:
- question: How do I sign in to Adobe App Builder using CLI?
  answer: Run the command 'aio login' in your terminal. Follow the prompts to log in via your browser using your Adobe ID.
- question: What should I do if the browser window doesn't open automatically?
  answer: Copy and paste the login URL printed in your terminal into your browser to complete the sign-in process.
- question: Where is my user token stored after login?
  answer: Your user token is automatically saved in the CLI configuration and is used for secure communication with Adobe Developer Console.
- question: Can I change my project details after signing in?
  answer: Yes, you can revisit Adobe Developer Console at any time to modify your project settings and configurations.
- question: What can I do after signing in with the CLI?
  answer: After signing in, you can start building and managing Adobe App Builder applications directly from your local environment using CLI commands.
---
// copied from https://github.com/AdobeDocs/app-builder/blob/main/src/pages/getting_started/first_app.md?plain=1
// page https://developer.adobe.com/app-builder/docs/getting_started/first_app/

## 3. Sign in from CLI

Once your project is set up in [Adobe Developer Console](/console), let's move onto your local environment. You can always go back to [Adobe Developer Console](/console) to modify your project later.

1. On your machine, navigate to the Terminal and enter

    ```bash
    aio login
    ```

1. A browser window should open, asking you to sign in with your Adobe ID. If the window did not automatically open, you can also copy paste the URL printed in your browser to log in.

    ```bash
    $ aio login
    Visit this url to log in:
    https://aio-login.adobeioruntime.net/api/v1/web/default/applogin?xxxxxxxx
    ```

1. Once you've logged in, you can close the browser window and go back to Terminal. You will see a string printed in the terminal. This is your user token. It is automatically stored in [CLI](https://github.com/adobe/aio-cli) config, allowing the [CLI](https://github.com/adobe/aio-cli) to use the token to talk to [Adobe Developer Console](/console).

    ```bash
    eyJ4NXUiOixxxxxxxxxxxxxxxxxxx
    ```

1. Now you can start building App Builder Applications with the [CLI](https://github.com/adobe/aio-cli)!
