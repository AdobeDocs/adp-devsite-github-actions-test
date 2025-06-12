---
title: Managing Oauth Tokens
---
# Managing Oauth Tokens

<InlineAlert slots="text" />

Sign Gov admins should note the minor differences from the content below. *Described HERE* [`https://developer.adobe.com/acrobat-sign/signgov/diffs.md`](../signgov/diffs.md).

<table border="1" columnWidths="20,30,20,30">
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
            <td>grant_type</td>
            <td>refresh_token</td>
            <td>yes</td>
            <td>The value must always be <span style="color: red;">refresh_token</span>.</td>
        </tr>
        <tr>
            <td>client_id</td>
            <td>The ID obtained from the OAuth configuration page.</td>
            <td>yes</td>
            <td>Identifies the application.</td>
        </tr>
        <tr>
            <td>client_secret</td>
            <td>The ID obtained from the OAuth configuration page.</td>
            <td>yes</td>
            <td>Authenticates the application.</td>
        </tr>
        <tr>
            <td>refresh_token</td>
            <td>The refresh token received during the previous step.</td>
            <td>yes</td>
            <td></td>
        </tr>
    </tbody>
</table>
