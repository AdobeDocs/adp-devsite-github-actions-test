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
        title: 'guides',
        path: '/guides/'
      }
    ],
    subPages: [
      {
        title: 'guides',
        path: '/guides/',
        pages: [
          {
            title: 'AppConfig.types',
            path: '/guides/AppConfig.types/enumerations/text_to.image-app-version'
          },
          {
            title: 'SCREAMING_SNAKE_CASE',
            path: '/guides/SCREAMING_SNAKE_CASE'
          },
          {
            title: 'SentenceCase',
            path: '/guides/SentenceCase'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
