---
title: How to Sign In to Adobe App Builder CLI for Your First Application
description: Step-by-step instructions on signing in to the Adobe App Builder CLI using your Adobe ID and obtaining the user token required to start building applications.
keywords:
- Adobe App Builder
- Adobe Developer Console
- CLI login
- Adobe ID sign in
- user token
faqs:
- question: How do I sign in to the Adobe App Builder CLI?
  answer: Run the command `aio login` in your terminal. A browser window will open for you to sign in with your Adobe ID.
- question: What should I do if the browser window doesn't open automatically?
  answer: Copy and paste the URL printed in the terminal into your browser to manually complete the sign-in process.
- question: What is the user token shown after login?
  answer: The user token is a string printed in your terminal after login, which is stored in the CLI config to authenticate your sessions.
- question: Where is the user token stored after login?
  answer: It is automatically saved in the Adobe I/O CLI configuration to allow seamless access to the Adobe Developer Console.
- question: Can I modify my project settings after signing in?
  answer: Yes, you can always go back to the Adobe Developer Console to change your project details at any time.
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
