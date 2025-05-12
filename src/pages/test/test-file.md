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


Response content type: `application/json`
|Code|Description|
|--- |--- |
|200|Successful operation Example value:
{
  "name": "string",
  "code": "string",
  "namespace": "string",
  "version": "string",
  "params": [
    {
      "key": "string",
      "value": {}
    }
  ],
  "annotations": [
    {
      "key": "string",
      "value": {}
    }
  ],
  "limits": {
    "timeout": "string",
    "memory": "string",
    "logs": "string"
  },
  "exec": {
    "kind": "string",
    "binary": false,
    "components": [
      "string"
    ]
  },
  "url": "string"
}
Model: 
[ActionResultDTO {
description: OpenWhisk Action invocation result
name        string
            Action name
code        string
            Action code
namespace   string
            Action namespace
version     string
            Action version
annotations [Action annotations
            KeyValuePairDTO {
            description: OpenWhisk Action param
            key     string
                    Param Name
            value   {
                        description: Param value
                    }
            }]
duration    integer($int32)
            Duration
version     string
            Action Version
response    {
            description:    
            Action invocation response
}|
