---
title: Roles and Permissions - Adobe Cloud Storage and Collaboration API
description: Adobe Cloud Storage and Collaboration API roles and permissions
keywords:
  - Adobe Cloud Storage and Collaboration
  - Adobe Cloud Storage and Collaboration API
  - Adobe Cloud Storage
  - Creative production workflows
  - Adobe workflows
  - Cloud Storage endpoints
  - Cloud Storage autorization
  - User roles
  - Access Control
  - Permissions
  - User group
contributors:
  - https://github.com/michael-hodgson
  - https://github.com/lijumjose
layout: none

---

# Roles and permissions

Adobe cloud storage provides an access control system to enaure only authorized users can access cloud content. Access to projects, folders, and files is based on the permissions granted to a user through their assigned role.

The following table indicates the permissions available to each role:

| Permission                           | Administrator | Creator | Edit | Comment |
| :----------------------------------- | :-----------: | :-----: | :--: | :-----: |
| Rename a project                     |      ✅       |   ✅    |      |         |
| Discard a project                    |      ✅       |   ✅    |      |         |
| View files and folders               |      ✅       |   ✅    |  ✅  |   ✅    |
| Edit files                           |      ✅       |   ✅    |  ✅  |         |
| Create and add files, create folders |      ✅       |   ✅    |  ✅  |         |
| Set roles                            |      ✅       |   ✅    |  ✅  |         |

## Assigning roles

### Administrators

The Administrator role can be assigned to users and groups exclusively through [Adobe Admin Console](https://helpx.adobe.com/enterprise/using/admin-roles.html).
Both **System Administrators** and **Storage Administrators** have administrative  permissions to content in Adobe Cloud Storage.

### Creator

The Creator role is automatically assigned to a user who creates a project.

### Edit and Comment

The Edit and Comment roles can be assigned to a user or group in two ways:

1. By inviting collaborators through an Adobe UI, such as Creative Cloud Home. See [Share Projects](https://helpx.adobe.com/creative-cloud/help/share-project.html) for more information.
2. By using the **Adobe Cloud Storage and Collaboration API**.

## Setting roles with the API

The [Project permissions API](../api/specification.md#operation/patchProjectPermissions) accepts a JSON document that defines changes to a project's permissions. This document includes up to three optional sections:

1. additions: Grants a role to one or more principals.
2. updates: Modifies existing roles for one or more principals.
3. deletions: Removes the role for one or more principals.

The sections are optional, and you only need to include the ones that are necessary for the changes you want to make to the project's permissions.

Each section contains an array of objects that specify the principal and the role being assigned, updated, or removed.

### Additions

To grant access, include entries in the _additions_ section. Each entry must include:

- **type**: The type of principal. There are three types of principals:
  - **user** - An individual user
  - **group** - A named group of users. See [Manage user groups](https://helpx.adobe.com/enterprise/using/user-groups.html).
  - **predefined** - One of the special [predefined principals](./permissions.md#predefined-principals).
- **recipient**: The principal to whom you are giving access
  - The recipient value for _user_ types is the prefix _mailto:_ followed by the user's email address
  - The recipient value for _group_ or _predefined_ types is the prefix _name:_ followed by the name of the group or predefined principal
- **role**: The role they will be assigned. Possible values are edit and comment. See [Roles and Permissions](#roles-and-permissions).

For example, the following invites Bob Smith to be an editor, sets all members of the Graphic Design group to be editors, and allows anyone in the organization to comment on the files in a project.

```bash
{
  "direct": {
    "additions": [
      {
        "recipient": "mailto:bob-smith@mycompany.com",
        "type": "user",
        "role": "edit"
      },
      {
        "recipient": "name:Graphic Design",
        "type": "group",
        "role": "edit"
      },
      {
        "recipient": "name:_everybody",
        "type": "predefined",
        "role": "comment"
      }
    ]
  }
}
```

### Updates

Changing existing permissions is done using the _updates_ section of the request. Each update entry consists of three properties:

- **type**: The type of principal. Same as with [additions](#additions).
- **id**: The unique identifier for a user, group, or predefined principal. The _id_ is not the same as the additions _recipient_ property. It is a unique identifier that the system assigns when permission is granted.
- **role** - the role they will be assigned. Same as with [additions](#additions).

  - You can find a user or group's _id_ using the [GET permissions](../api/specification.md/#operation/getProjectPermissions) call for the project.

  For example, the following _GET permissions_ response provides the _id_ properties for the _\_everybody_ predefined principal, as well as two users. One who has accepted the invitation, and one whose invitation is pending.

  ```json
  {
  "direct": [
    {
      "type": "predefined",
      "id": "orgEverybody",
      "name": "_everybody",
      "role": "comment"
    },
    {
      "type": "user",
      "id": "C1D71E08680BCA8C0A49420A@c1651e08680bc694494118.e",
      "role": "edit",
      "email": "alice-gupta@mycompany.com"
    }
  ],
  "pending": [
    {
      "email": "bob-smith@mycompany.com",
      "role": "edit",
      "created": "2025-07-09T17:13:11.588Z",
      "id": "mailto:bob-smith@mycompany.com"
    }
  ]
  }

For example, the following request updates the permissions of two users to the *comment* role. The first user has accepted the invitation and therefore their ID is a unique GUID. The second user has not yet accepted the invitation, so their id is still their email address.

```bash
{
"direct": {
  "updates": [
    {
      "id": "C1D71E08680BCA8C0A49420A@c1651e08680bc694494118.e",
      "type": "user",
      "role": "comment"
    },
    {
      "id": "mailto:bob-smith@mycompany.com",
      "type": "user",
      "role": "comment"
    }
  ]
}
}
```

### Deletions

You can remove a user, group, or predefined principal's access to a project using the deletions section of a request. Each deletion entry consists of two properties:

- **type**: The type of principal. Same as with [additions](#additions).
- **id**: The unique identifier for a user, group, or predefined principal. Same as with [updates](#updates).

For example, the following request deletes the permissions of two users. The first user has accepted the invitation and therefore their ID is a unique GUID. The second user has not yet accepted the invitation, so their id is still their email address.

```json
{
  "direct": 
  {
  "deletions": [
    {
    "id": "C1D71E08680BCA8C0A49420A@c1651e08680bc694494118.e",
    "type": "user"
    },
    {
      "id": "mailto:bob-smith@mycompany.com",
      "type": "user"
    }
    ]
  }
}
```

### Predefined principals

There are two special principals:

- **_everybody**: Includes all users who are [members of the organization](https://helpx.adobe.com/enterprise/using/manage-directory-users.html)
- **authenticated**: Includes all users who have signed in, whether they are members of the organization or not.

### Summary

| Principal Type | Additions recipient              | Updates and Deletion id   | Notes                                                                               |
| -------------- | -------------------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| user           | mailto:&#123;user's email address&#125;    | &#123;user id&#125;                 | Indicates a specific user                                                           |
| group          | name:&#123;user group name&#125;           | &#123;group id&#125;                | Indicates a [user goup](https://helpx.adobe.com/enterprise/using/user-groups.html) |
| predefined     | name:&#123;predefined principal name&#125; | &#123;predifined principal id&#125; | Indicates a special [predefined principal](#predefined-principals)                  |