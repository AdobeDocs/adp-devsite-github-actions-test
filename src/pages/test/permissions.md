# Roles and Permissions

Adobe cloud storage includes an access control systm that manages access to projects, folders, and files. Authorization is granted based on roles:

| Permission                           |  Administrator | Creator | Edit | Comment |
| ------------------------------------ | -------------- | ------- | ---- | ------- |
| Rename a project                     | ✅             | ✅      |      |         |
| Discard a project                    | ✅             | ✅      |      |         |
| View files and folders               | ✅             | ✅      | ✅   | ✅      |
| Edit files                           | ✅             | ✅      | ✅   |         |
| Create and add files, create folders | ✅             | ✅      | ✅   |         |
| Set roles                            | ✅             | ✅      | ✅   |         |

## Assigning Roles

### Administrators

Users and groups can ony be assigned to an administrator role using the [Adobe Admin Console](https://helpx.adobe.com/enterprise/using/admin-roles.html).
Note that both System Administrators and Storage Administrators have admin permissions to content in Adobe cloud storage

### Creator

=== TOOD: check if this is true of the 3p api ===
The Creator role is automatically assigned to a user when they create a project

### Edit and Comment

The Edit and Comment roles can be assigned to a user or group in two ways:

1. By inviting others as collaborators using an Adobe UI, such as Creative Cloud Home. See [Share Projects](https://helpx.adobe.com/creative-cloud/help/share-project.html) for more information
2. Using the **Adobe Cloud Storage and Collaboration API** to set the user/group's permission to either _edit_ or _comment_

## Setting roles with the API

The `[Project permissions API](=== TODO: insert the link to the API reference ===)` takes a JSON document that defines the changes in a project's permissions. The document has three sections (JSON objects):

1. additions: grants a role to one or more principals
2. updates: changes the role for one or more principals
3. deletions: removes the role for one or more principals

The sections contain an array of objects that define the principal type, the principal's identifier, and their assigned role (role is not needed for the _deletions_ section).

There are three types of principals, each with different applicable values for their principal id:

| Principal type | Principal id         | Notes |
| -------------- | -------------------- | ----- |
| user           | user's email address | Indicates a specific user |
| group          | user group name      | Indicates a [user goup](https://helpx.adobe.com/enterprise/using/user-groups.html) |
| predefined     | either: <br />- everybody<br /> - authenticated<br /> - all | Indicates a special principal (see below) |

### Predefined principals

There are three special principals:

- _everybody - includes all users that are [members of the organization](https://helpx.adobe.com/enterprise/using/manage-directory-users.html)
- authenticated - includes all users that have signed in, whether they are members of the organization or not
- all - includes both authenticated and unauthenticated users (public access)

## Examples

The following adds a user `_bob@acme.com_` as an editor, updates the _Marketing_ group's permissions to allow editing, allows anyone in the organization to comment on the project's content, and removes public access

```JSON
{
  "direct": {
    "additions": [
      {
        "principalId": "bob@acme.com",
        "principalType": "user",
        "role": "edit"
      }
    ],
    "updates": [
      {
        "principalId": "Marketing",
        "principalType": "group",
        "role": "edit"
      },
      {
        "principalId": "_everybody",
        "principalType": "predefined",
        "role": "comment"
      }
    ],
    "deletions": [
      {
        "principalId": "all",
        "principalType": "predefined"
      }
    ]
  }
}
```