---
title: Guides - Cat Analytics
description: This is the guides overview page of Cat Analytics 
---

# Get Started 

Changing a file to test nightly refresh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada feugiat enim vel facilisis. Nunc eget enim eu lacus lobortis tincidunt a nec est. Nunc quis sapien quis orci rutrum sollicitudin. Nullam vehicula ultricies mauris, id aliquam justo aliquam vitae. Nam quis tincidunt ante. Curabitur sagittis aliquam elit, at auctor enim maximus et. Praesent in lectus facilisis, tempor magna eget, bibendum est. In quis ornare mi. Donec vestibulum viverra magna, non mollis leo vestibulum sit amet. Aenean euismod nulla augue, sit amet vehicula nibh faucibus vel. Fusce at est lacus. Nullam ante nulla, elementum nec ornare in, placerat luctus enim. Suspendisse vitae lacinia nibh. Pellentesque porta accumsan est at volutpat. Nulla aliquam dictum faucibus.

## Authentication

Mauris pellentesque ornare nulla. Proin fermentum elementum velit non consequat. Donec euismod nisl sed tellus sagittis, a consequat leo rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse neque justo, porttitor eget volutpat sed, suscipit nec mauris. Etiam nec egestas purus. Praesent suscipit in elit cursus consectetur. Duis blandit pulvinar odio, eget volutpat magna vestibulum interdum. Ut sed ultrices risus, vel gravida nisi. Sed vitae rutrum felis. Aliquam at eros molestie, sagittis augue sed, venenatis erat. Praesent at consectetur tellus, ut vehicula nunc. Pellentesque aliquet condimentum neque, fermentum consequat neque viverra vel. Aliquam accumsan dignissim turpis vitae consequat. Aenean id justo vel diam sollicitudin posuere. Sed eu mauris ac elit porta commodo et varius sem.

## OAuth

Donec imperdiet tempus ligula, sit amet pellentesque justo pharetra quis. Duis sed lacus diam. Maecenas sollicitudin diam sit amet pharetra placerat. Aliquam egestas lectus et tellus sagittis, venenatis finibus nisi volutpat. Cras laoreet, nisl sed faucibus laoreet, nibh arcu pretium enim, eget elementum ligula tellus vitae lorem. Aenean consequat in lorem at venenatis. Phasellus consequat dolor in libero vulputate rutrum. Nulla sit amet augue fringilla, elementum libero eget, accumsan velit. Suspendisse et lorem ornare, congue justo vel, ultrices felis. Ut et aliquet eros. Nulla facilisi. Nulla vitae velit a enim egestas eleifend. Etiam malesuada orci non mollis vulputate. Praesent id augue eget sapien lobortis bibendum. Praesent placerat tellus dui, vel facilisis magna condimentum in.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna tellus, fringilla sit amet lorem eget, dignissim pellentesque ligula. Donec nec dolor vitae leo laoreet aliquam vehicula at dui. Integer in tortor lacus. Aliquam convallis, lorem ac consectetur sodales, tellus.

## JWT

Donec imperdiet tempus ligula, sit amet pellentesque justo pharetra quis. Duis sed lacus diam. Maecenas sollicitudin diam sit amet pharetra placerat. Aliquam egestas lectus et tellus sagittis, venenatis finibus nisi volutpat. Cras laoreet, nisl sed faucibus laoreet, nibh arcu pretium enim, eget elementum ligula tellus vitae lorem. Aenean consequat in lorem at venenatis. Phasellus consequat dolor in libero vulputate rutrum. Nulla sit amet augue fringilla, elementum libero eget, accumsan velit. Suspendisse et lorem ornare, congue justo vel, ultrices felis. Ut et aliquet eros. Nulla facilisi. Nulla vitae velit a enim egestas eleifend. Etiam malesuada orci non mollis vulputate. Praesent id augue eget sapien lobortis bibendum. Praesent placerat tellus dui, vel facilisis magna condimentum in.


<Announcement slots="heading, text, button" variant="secondary" backgroundColor="background-color-gray" />

#### Important Update

Review these changes before your next deployment.

- [View details](https://example.com)

<Tab orientation="vertical" slots="heading, content" repeat="2"/>

### Request

```javascript-disableLineNumbers-data-line="2-4"
graphql
mutation {
  createCustomerV2(
    input: {
      firstname: "Bob"
      lastname: "Loblaw"
      email: "bobloblaw@example.com"
      password: "b0bl0bl@w"
      is_subscribed: true
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
```

### Response

```json
{
  "data": {
    "createCustomer": {
      "customer": {
        "firstname": "Bob",
        "lastname": "Loblaw",
        "email": "bobloblaw@example.com",
        "is_subscribed": true
      }
    }
  }
}
```

<List slots="text1, text2" repeat="2" iconColor="#2ac3a2" icon="checkmark" variant="fullWidth" />

Item 1 title

Item 1 description

Item 2 title

Item 2 description

<Product-Card slots="icon, text, buttons" theme="light" repeat="2" />

![typescript-logo](../images/adobe-express.svg)

Lit is a simple library for building fast, lightweight web components. It's built on top of the Web Components standard and provides a set of tools and utilities to simplify the creation of custom elements. Lit uses modern web standards like JavaScript template literals and reactive properties to create reusable and efficient components with minimal boilerplate required.

[Learn more](https://lit.dev/)
[View Docs](https://lit.dev/)

![typescript-logo](../images/adobe-express.svg)

TypeScript is a statically typed superset of JavaScript that adds optional static types to the language.TypeScript aims to improve the development experience by providing a robust type system, which helps catch errors early during development and enhances code quality and maintainability.

- [Learn more](https://https://www.typescriptlang.org/)