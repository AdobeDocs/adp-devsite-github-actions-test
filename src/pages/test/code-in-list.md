---
title: 3. Sign in from CLI
description: Instructions on how to sign in to the Adobe Developer Console from the command line interface (CLI) to enable building App Builder applications.
keywords:
- Adobe Developer Console
- CLI login
- aio login
- App Builder
- user token
# --- FAQs ---
faqs:
- question: How do I sign in to Adobe Developer Console from the CLI?
  answer: Run the command `aio login` in your terminal which opens a browser window for Adobe ID sign-in.
- question: What if the browser window does not open automatically?
  answer: Copy and paste the URL printed in your terminal into your browser to complete the login.
- question: Where is my user token stored after login?
  answer: The user token is automatically saved in the CLI config for seamless subsequent requests.
- question: Can I modify my project after signing in?
  answer: Yes, you can always go back to the Adobe Developer Console to update your project settings.
- question: What command do I use to start building App Builder apps after login?
  answer: After signing in successfully, you can start building apps using the aio CLI commands.
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
