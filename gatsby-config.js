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
    pages: [
      {
        title: 'index',
        path: '/'
      },
      {
        title: 'SCREAMING_SNAKE_CASE',
        path: '/SCREAMING_SNAKE_CASE'
      },
      {
        title: 'with.dot',
        path: '/with.dot'
      },
      {
        title: 'Guides',
        path: '/Guides/'
      }
    ],
    subPages: [
      {
        title: 'Guides',
        path: '/Guides/',
        pages: [
          {
            title: 'SCREAMING_SNAKE_CASE',
            path: '/Guides/SCREAMING_SNAKE_CASE'
          },
          {
            title: 'same-name-same-dir',
            path: '/Guides/same-name-same-dir'
          },
          {
            title: 'SentenceCase',
            path: '/Guides/SentenceCase'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
