---
title: Managing Oauth Tokens
---
# Managing Oauth Tokens

<InlineAlert slots="text" />

Sign Gov admins should note the minor differences from the content below. *Described HERE* [`https://developer.adobe.com/acrobat-sign/signgov/diffs.md`](../signgov/diffs.md).


| Parameter      | Value                                                  | Required   | Description                                                         |
|----------------|--------------------------------------------------------|------------|---------------------------------------------------------------------|
| grant_type     | refresh_token                                          | yes        | The value must always be  &lt;span style="color:red"&gt;refresh_token&lt;/span&gt;. |
| client_id      | The ID obtained from the OAuth configuration page.     | yes        | Identifies the application.                                         |
| client_secret  | The ID obtained from the OAuth configuration page.     | yes        | Authenticates the application.                                      |
| refresh_token  | The refresh token received during the previous step.   | yes        |                                                                     |

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Required?</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>response_type</td>
            <td>code</td>
            <td>Yes</td>
            <td>The value must always be <em>code</em>. Tells the process you’re looking for the OAuth code on the redirect URI once your customer logs in and accepts the auth permissions.</td>
        </tr>
        <tr>
            <td>client_id</td>
            <td>Your ID obtained from the OAuth configuration page.</td>
            <td>Yes</td>
            <td>Identifies to Acrobat Sign what application your customer is requesting a token for (the one for your app/platform).</td>
        </tr>
        <tr>
            <td>redirect_uri</td>
            <td>Your custom, secure, and absolute URI; for example, <a href="https://your-oAuthInteraction-Server/your-oAuth-Page.html">https://your-oAuthInteraction-Server/your-oAuth-Page.html</a>.</td>
            <td>Yes</td>
            <td>Redirects users here at the end of the authorization process. The value must belong to the set of values specified on the OAuth Configuration page.</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>A space-delimited set of permissions specified during the OAuth configuration setup on the Configure OAuth page.</td>
            <td>Yes</td>
            <td>The permissions that the user will be asked to approve.</td>
        </tr>
        <tr>
            <td>state</td>
            <td>Any string</td>
            <td>No</td>
            <td>This value returns to the client as a parameter at the end of the authorization process. While not required, use of the <span style="color: red;">state</span> parameter <em>is highly recommended</em> to protect against CSRF <a href="https://tools.ietf.org/html/rfc6749#section-10.12">as described in the RFC</a>. You can use it to pass a unique ID that will be passed to the redirect URI so your system knows which client/instance requested the token and where to save it inside your platform.</td>
        </tr>
    </tbody>
</table>
