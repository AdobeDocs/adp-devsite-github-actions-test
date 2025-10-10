---
title: Managing Oauth Tokens
---
# Managing Oauth Tokens

<InlineAlert slots="text" />

Sign Gov admins should note the minor differences from the content below. *Described HERE* [`https://developer.adobe.com/acrobat-sign/signgov/diffs.md`](../signgov/diffs.md).

&lt;!--comment--&gt;

| Parameter      | Value                                                  | Required   | Description                                                         |
|----------------|--------------------------------------------------------|------------|---------------------------------------------------------------------|
| grant_type     | refresh_token                                          | yes        | The value must always be  &lt;span style="color:red"&gt;refresh_token&lt;/span&gt;. |
| client_id      | The ID obtained from the OAuth configuration page.     | yes        | Identifies the application.                                         |
| client_secret  | The ID obtained from the OAuth configuration page.     | yes        | Authenticates the application.                                      |
| refresh_token  | The refresh token received during the previous step.   | yes        |                                                                     |


| Severity | Description                                                                                                                                                                                                                                                                                                |
| -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Severity: S0 | -  Affects critical data or functionality and leaves users with no workaround.&lt;br/&gt;-  Significant catastrophic impact.&lt;br/&gt;-  A problem that is blocking the ability to work. An immediate fix is needed.&lt;br/&gt;                                                                           |
| Severity: S1 | -  Affects critical data or functionality and forces users to employ a workaround.&lt;br/&gt;-  Impact to the key product qualities.&lt;br/&gt;-  An immediate fix is needed.&lt;br/&gt;                                                                                                                   |
| Severity: S2 | -  Affects non-critical data or functionality and forces users to employ a workaround.&lt;br/&gt;-  Impact to the product qualities that makes the product more usable.&lt;br/&gt; - Major restrictions or short-term circumventions are required until a fix is available. A fix is important.&lt;br/&gt; |
| Severity: S3 | -  Affects non-critical data or functionality and does not force users to employ a workaround.&lt;br/&gt; -  Problem has moderate impact requiring some restrictions. The fix is in an area that is not critical.&lt;br/&gt;                                                                               |
| Severity: S4 | -  A minor problem, annoyance, or technical issue with minimal impact.&lt;br/&gt;-  Impact that does not prevent or hinder functionality.&lt;br/&gt;-  Affects aesthetics, professional look and feel, "quality" or "usability".&lt;br/&gt;                                                                |
