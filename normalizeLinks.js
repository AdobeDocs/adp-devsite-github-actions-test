const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { getRedirectionsFilePath } = require('./buildRedirections.js');

console.log();
console.log('Hello')
console.log();