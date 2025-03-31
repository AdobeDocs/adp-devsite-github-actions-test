const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { getRedirectionsFilePath } = require('./buildRedirections.js');
const matchAll = require('string.prototype.matchall');

function getMarkdownFiles() {
    return globSync(__dirname + '/src/pages/**/*.md')
        .map(f => path.resolve(__dirname + '/src/pages', f));
}

console.log('~~ list links');