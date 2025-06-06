/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/github-actions-test/',
  siteMetadata: {
    siteWideBanner : {
      icon : "info", 
      text : ["content 1" , "content 2"],
      button : "learn more",
      buttonLink : "link",
      align : "center",
      isClose : true
    },
    versions: [
      {
        title: 'v2.0',
        selected: true
      },
      {
        title: 'v1.4',
        path: 'https://github.com/AdobeDocs/dev-site'
      }
    ],
    pages: [
      {
        title: 'Cat Analytics',
        path: '/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        menu: [
          {
            title: 'Cat Reference v2.0',
            description: 'Cat Reporting API',
            path: '/api/index.md'
          },
          {
            title: 'Cat Reference v1.4',
            description: 'Cat API Spec',
            path: '/api/1-4.md'
          }
        ]
      },
      {
        title: 'Support',
        path: '/support/'
      },
      {
        title: 'Test',
        path: '/test/'
      }
    ],
    subPages: [
      {
        title: 'Get Started',
        path: '/guides/',
        pages: [
          {
            title: 'Dummy an OAuth Client',
            path: '/guides/dummy_oauth_client/'
          },
          {
            title: 'Dummy OAuth using POSTMAN',
            path: '/guides/dummy_using_postman/'
          }
        ]
      },
      {
        title: 'Cat Metrics API',
        path: '/guides/dummy_metrics_api/'
      },
      {
        title: 'Migrating',
        path: '/guides/migrating/'
      },
      {
        title: 'Overview',
        path: '/support/',
        header: true,
        pages: [
          {
            title: 'Help',
            path: '/support/'
          },
          {
            title: 'FAQ',
            path: '/support/FAQ/'
          },
          {
            title: 'How to contribute',
            path: '/support/contribute/'
          }
        ]
      },
      {
        title: 'Community',
        path: '/support/community/',
        header: true,
        pages: [
          {
            title: 'Information',
            path: '/support/community/'
          }
        ]
      },
      {
        title: 'Test',
        path: '/test/',
        pages: [
          {
            title: 'AppConfig.types',
            path: '/test/AppConfig.types/enumerations/text-to-image-app-version'
          },
          {
            title: 'Code',
            path: '/test/code'
          },
          {
            title: 'CodeBlock',
            path: '/test/code-block'
          },
          {
            title: 'CodeBlock with Picklist',
            path: '/test/code-block-with-picklist'
          },
          {
            title: 'CodeBlock without Picklist',
            path: '/test/code-block-without-picklist'
          },
          {
            title: 'Code in List',
            path: '/test/code-in-list'
          },
          {
            title: 'Code in Table',
            path: '/test/code-in-table'
          },
          {
            title: 'InlineAlert',
            path: '/test/inline-alert'
          },
          {
            title: 'ListBlock',
            path: '/test/list-block'
          },
          {
            title: 'RedoclyAPIBlock',
            path: '/test/redocly-api-block'
          },
          {
            title: 'TabsBlock',
            path: '/test/tabs-block'
          }
        ]
      },
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
