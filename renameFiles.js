const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { readRedirectionsFile, writeRedirectionsFile, getRedirectionsFilePath } = require('./scriptUtils.js');

function getMarkdownFiles() {
    return globSync(__dirname + '/src/pages/**/*.md')
        .map(f => path.resolve(f));
}

function toKebabCase(str) {
    const isScreamingSnakeCase = new RegExp(/^[A-Z0-9_]*$/gm).test(str);
    str = isScreamingSnakeCase ? str.toLowerCase() : str;
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}

function toEdsCase(str) {
    const isValid = Boolean((/^([a-z0-9-]*)$/.test(str)));
    return isValid ? str : toKebabCase(str);
}

function toUrl(file, renameBaseWithoutExt) {
    const base = path.basename(file);
    const ext = path.extname(file);
    const end = file.length - base.length;
    const baseWithoutExt = base.substring(0, base.length - ext.length);
    const newBaseWithoutExt = renameBaseWithoutExt(baseWithoutExt);
    return `${file.substring(0, end)}${newBaseWithoutExt}`
}

function toRelativeUrl(fromDir, file) {
    const relativeFile = path.relative(fromDir, file);
    return toUrl(relativeFile, f => f);
}

function renameFile(file, renameBaseWithoutExt) {
    const url = toUrl(file, renameBaseWithoutExt);
    const ext = path.extname(file);
    return `${url}${ext}`
}

function getFileMap(files) {
    const map = new Map();
    files.forEach(from => { 
        const to = renameFile(from, toEdsCase)
        if(to !== from) {
            map.set(from, to) 
        }
    });
    return map;
}

function getLinkMap(fileMap, relativeToDir) {
    const linkMap = new Map();    
    fileMap.forEach((toFile, fromFile) => {
        const fromUrl = toRelativeUrl(relativeToDir, fromFile);
        const toUrl = toRelativeUrl(relativeToDir, toFile);
        linkMap.set(fromUrl, toUrl);
    });
    return linkMap;
}

function replaceLinksInFile({ file, linkMap, getFindPattern, getReplacePattern }) {
    let data = fs.readFileSync(file, 'utf8');
    linkMap.forEach((to, from) => {
        const find = getFindPattern(from);
        const replace = getReplacePattern(to);
        data = data.replaceAll(new RegExp(find, "gm"), replace);
    });
    fs.writeFileSync(file, data, 'utf-8');
}

function renameLinksInMarkdownFile(fileMap, file) {
    const dir = path.dirname(file);
    replaceLinksInFile({ 
        file, 
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(\\[[^\\]]*]\\()(${from})(#[^\\()]*)?(\\))`,
        getReplacePattern: (to) => `$1${to}$3$4`,
    });
}

function renameLinksInRedirectsFile(fileMap) {
    const file = getRedirectionsFilePath();
    const dir = path.dirname(file);
    replaceLinksInFile({
        file,
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(['"]?)(Source|Destination)(['"]?\\s*:\\s*['"])(${pathPrefix}${from})(#[^'"]*)?(['"])`,
        getReplacePattern: (to) => `$1$2$3${pathPrefix}${to}$5$6`,
    });
}

function renameLinksInGatsbyConfigFile(fileMap, file) {
    const dir = 'src/pages';
    replaceLinksInFile({
        file,
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(['"]?path['"]?\\s*:\\s*['"])(/${from})(#[^'"]*)?(['"])`,
        getReplacePattern: (to) => `$1/${to}$3$4`,
    });
}

function appendRedirects(fileMap) {
    const file = getRedirectionsFilePath();
    const dir = path.dirname(file);
    const linkMap = getLinkMap(fileMap, dir);
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

function renameFiles(map) {
    map.forEach((to, from) => {
        fs.renameSync(from, to);
    });
}

try {
    const markdownFiles = getMarkdownFiles();
    const fileMap = getFileMap(markdownFiles);
    markdownFiles.forEach(file => {
        renameLinksInMarkdownFile(fileMap, file);
    });
    renameFiles(fileMap);

    const redirectsFile = getRedirectionsFilePath();
    if(fs.existsSync(redirectsFile)) {
        renameLinksInRedirectsFile(fileMap);
        appendRedirects(fileMap);
    }

    const gatsbyConfigFile = 'gatsby-config.js';
    if(fs.existsSync(gatsbyConfigFile)) {
        renameLinksInGatsbyConfigFile(fileMap, gatsbyConfigFile);
    }

} catch (err) {
    console.error(err);
}