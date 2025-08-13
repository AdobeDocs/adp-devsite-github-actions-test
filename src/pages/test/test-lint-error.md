---
title: Guides - Cat Analytics
description: This is the guides overview page of Cat Analytics
---

# Testing path relative link relative to current directory

[path-test/index.md](path-test/index.md)

## Root relative link

[/api/index.md](/api/index.md)

### angle bracket link to check lint error
<http://www.google.com>

### angle bracket link to check lint error
<../support/index.md>

<InlineAlert slots="text">
This will fail because it has content between tags
</InlineAlert>

<InlineAlert slots="text" />
This text is outside the component and will pass

// copied from https://github.com/adobe/aio-theme?tab=readme-ov-file#code-block

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON">

#### Payload

```json
{
  "customer": {
   # testing
    "email": "mshaw@example.com",
    "firstname": "Melanie",
    "lastname": "Shaw"
  }
}
```
</CodeBlock>

<Resources slots="heading, links">

#### Resources

* [Quick start guide](getting-started/index.md)
* [Endpoint guides](endpoints/index.md)
* [API reference](https://github.com/AdobeDocs/data-collection-apis)
* [Github repository](https://github.com/AdobeDocs/data-collection-apis)

</Resources>

<img src="hero.png" />

<img src="hero2.png" alt="" />

<img src="hero3.png" alt="This is a very long description of the hero image that goes on and on and exceeds the maximum allowed length of 100 characters which is quite a lot of text to describe a single image" />

## table error

| Code | Description                        |
| ---- | ---------------------------------- |
| 200  | Successful operationExample value: |
| {    |                                    |

    "name": "string",
    "auth": "string"

}
Model:
NamespaceDTO {
description: Namespace Details
name    string
Namespace name
auth    string
Auth associated with Namespace
}|


## table error fixed

| Code | Description                        |
| ---- | ---------------------------------- |
| 200  | Successful operationExample value: |

``` 
{   

    "name": "string",
    "auth": "string"

}
Model: [NamespaceDTO] {
description: Namespace Details
name    string
Namespace name
auth    string
Auth associated with Namespace
}
```

### table error column number wrong

 |                                                      | OAuth Server-to-Server credential                                                                                         | Service Account (JWT) credential                                                                                   |
|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Do expiring certificates need to be replaced every year? | This credential does not use public certificates or private key pairs. You are not forced to rotate certificates every year. | You need to rotate the public certificate and private key pair every year. | 4th column|
| Generating access tokens for experimentation         | You can generate an access token for quick experimentation with a [one-click button](./implementation.md#generate-access-tokens) on the Developer Console.              | Generating access tokens is a 3-step process spanning the Developer Console UI and your command-line terminal. |



<!-- comment not allowed -->



