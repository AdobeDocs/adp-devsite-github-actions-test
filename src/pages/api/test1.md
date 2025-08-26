### POST /runtime/admin/namespaces/{orgId}/{intId}

Creates a new namespace and returns the details of the newly created namespace. If namespace already exists it returns the details of the namespace.

#### _Parameters:_

| Name                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `orgId` (`string`: _path_)           | Organization ID                                 |
| `intId` (`string`: _path_)           | Integration ID                                  |
| `Authorization` (`string`: _header_) | Authorization token in format: `Bearer {token}` |
| `X-Api-Key` (`string`: _header_)     | Api key                                         |

#### _Responses:_

Response content type: `application/json`
|Code|Description|
|--- |--- |
|200|Successful operation Example value:
{
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
