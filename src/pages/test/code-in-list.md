---
title: Sign in from CLI
description: Learn how to sign in to Adobe App Builder using the CLI, enabling local development and secure access to your project via your Adobe ID.
keywords:
- Adobe App Builder
- CLI login
- Adobe Developer Console
- User token
- Local environment
faqs:
- question: How do I sign in to Adobe App Builder using the CLI?
  answer: Navigate to your terminal and run `aio login`. This initiates the authentication process and opens a browser window for you to sign in with your Adobe ID.
- question: What should I do if the browser window does not open automatically?
  answer: Copy the URL printed in your terminal and paste it into your browser to manually log in and complete authentication.
- question: Where is my user token stored after logging in?
  answer: The user token is automatically stored in the CLI configuration, allowing the CLI to authenticate your session with the Adobe Developer Console.
- question: Can I modify my project settings after logging in from CLI?
  answer: Yes, you can always return to the Adobe Developer Console to change or update your project settings at any time.
- question: What can I do after signing in from the CLI?
  answer: Once signed in, you can start building and managing App Builder applications locally using the CLI commands.
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
