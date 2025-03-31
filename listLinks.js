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

function listLinksInMarkdownFile(file) {
    let data = fs.readFileSync(file, 'utf8');
    
    const filePattern = '[^)#]*';
    const matches = matchAll(data, new RegExp(`(\\[[^\\]]*]\\()(${filePattern})(#[^\\()]*)?(\\))`, "gm"));
    [...matches].forEach(m => {
        console.log({file, link: m[0], index: m.index});
    })
}

try {
    const files = getMarkdownFiles();
    files.forEach(file => {
        listLinksInMarkdownFile(file);
    });

} catch (err) {
    console.error(err);
}