---
title: Managing Oauth Tokens
---
# Managing Oauth Tokens

<InlineAlert slots="text" />

Sign Gov admins should note the minor differences from the content below. *Described HERE* [`https://developer.adobe.com/acrobat-sign/signgov/diffs.md`](../signgov/diffs.md).


| Parameter      | Value                                                  | Required   | Description                                                         |
|----------------|--------------------------------------------------------|------------|---------------------------------------------------------------------|
| grant_type     | refresh_token                                          | yes        | The value must always be <span style="color: red;">refresh_token</span>. |
| client_id      | The ID obtained from the OAuth configuration page.     | yes        | Identifies the application.                                         |
| client_secret  | The ID obtained from the OAuth configuration page.     | yes        | Authenticates the application.                                      |
| refresh_token  | The refresh token received during the previous step.   | yes        |                                                                     |

