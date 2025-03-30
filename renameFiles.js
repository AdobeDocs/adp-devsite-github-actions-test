const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { readRedirectionsFile, writeRedirectionsFile, getRedirectionsFilePath } = require('./buildRedirections.js');

function getMarkdownFiles() {
    return globSync(__dirname + '/src/pages/**/*.md')
        .map(f => path.resolve(__dirname + '/src/pages', f));
}

function toKebabCase(str) {
    return str && str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}

function toUrl(file, renameBaseWithoutExt) {
    const base = path.basename(file);
    const ext = path.extname(file);
    const end = file.length - base.length;
    const baseWithoutExt = base.substring(0, base.length - ext.length);
    const newBaseWithoutExt = renameBaseWithoutExt(baseWithoutExt);
    return `${file.substring(0, end)}${newBaseWithoutExt}`
}

function renameFile(file, renameBaseWithoutExt) {
    const url = toUrl(file, renameBaseWithoutExt);
    const ext = path.extname(file);
    return `${url}${ext}`
}

function toRelativeFile(file, fromFile) {
    const fromDir = path.dirname(fromFile);
    return path.relative(fromDir, file);
}

function toRelativeUrl(file, fromFile) {
    const relativeFile = toRelativeFile(file, fromFile);
    return toUrl(relativeFile, f => f);
}

function getFileMap(files) {
    const map = new Map();
    files.forEach(from => { 
        const to = renameFile(from, toKebabCase)
        if(to !== from) {
            map.set(from, to) 
        }
    });
    return map;
}

function renameFiles(map) {
    map.forEach((to, from) => {
        fs.renameSync(from, to);
    });
}

function getLinkMap(fileMap, file) {
    const linkMap = new Map();    
    fileMap.forEach((toFile, fromFile) => {
        const fromUrl = toRelativeUrl(fromFile, file);
        const toUrl = toRelativeUrl(toFile, file);
        linkMap.set(fromUrl, toUrl);
    });
    return linkMap;
}

function renameLinksInFile({ fileMap, file, getFindPattern, getReplacePattern }) {
    let data = fs.readFileSync(file, 'utf8');
    const linkMap = getLinkMap(fileMap, file);
    linkMap.forEach((to, from) => {
        const find = getFindPattern(from);
        const replace = getReplacePattern(to);
        data = data.replaceAll(new RegExp(find, "gm"), replace);
    });
    fs.writeFileSync(file, data, 'utf-8');
}

function renameLinksInMarkdownFile(fileMap, file) {
    renameLinksInFile({ 
        fileMap, 
        file, 
        getFindPattern: (from) => `(\\[[^\\]]*]\\()(${from})(#[^\\()]*)?(\\))`,
        getReplacePattern: (to) => `$1${to}$3$4`,
    });
}

function renameLinksInRedirectsFile(fileMap) {
    renameLinksInFile({
        fileMap, 
        file: getRedirectionsFilePath(),
        getFindPattern: (from) => `(")(Source|Destination)("\\s*:\\s*")(${pathPrefix}${from})(#[^"]*)?(")`,
        getReplacePattern: (to) => `$1$2$3${pathPrefix}${to}$5$6`,
    });
}

function appendRedirects(fileMap) {
    const file = getRedirectionsFilePath();
    const linkMap = getLinkMap(fileMap, file);
    const newData = [];
    linkMap.forEach((to, from) => {
        newData.push({
            Source:  `${pathPrefix}${from}`, 
            Destination: `${pathPrefix}${to}`,
        })
    });
    const currData = readRedirectionsFile();
    const data = [...currData, ...newData];
    writeRedirectionsFile(data);
}

try {
    const files = getMarkdownFiles();
    const fileMap = getFileMap(files);
    files.forEach(file => {
        renameLinksInMarkdownFile(fileMap, file);
    });
    renameLinksInRedirectsFile(fileMap);
    appendRedirects(fileMap);
    renameFiles(fileMap);

} catch (err) {
    console.error(err);
}
