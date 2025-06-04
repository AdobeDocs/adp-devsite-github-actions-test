<HeroSimple slots="heading, text"  className="hero-gradient" background="red" />

## Build add-ons for Adobe Express

Expand the capabilities of the quick and easy create-anything app. Empower the global creative community with solutions for millions of users.

## Class: Editor

Entry point for APIs that read or modify the document's content.

## Accessors

### context

• `get` **context**(): [`Context`](context.md)

User's current selection context

# Adobe I/O Runtime API Reference

## API endpoints

Adobe I/O Runtime supports the following API endpoints for interacting programmatically with the service. 

**Notes:**

1. Unless otherwise noted, all parameters are required. 
2. For all the API calls on this page, the base URL is:  
   `https://api.adobe.io/`

### GET /runtime/admin/namespaces/{orgId}/{intId}

Returns the details of the namespace associated with the specified organization and integration.

#### _Parameters:_

| Name                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `orgId` (`string`: _path_)           | Organization ID                                 |
| `intId` (`string`: _path_)           | Integration ID                                  |
| `Authorization` (`string`: _header_) | Authorization token in format: `Bearer {token}` |
| `X-Api-Key` (`string`: _header_)     | Api key                                         |

#### _Responses:_

#### Returns

[`Context`](context.md)
