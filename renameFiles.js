const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { readRedirectionsFile, writeRedirectionsFile } = require('./buildRedirections.js');

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

function toRenamedUrl(file, renameBaseWithoutExt) {
    const base = path.basename(file);
    const ext = path.extname(file);
    const end = file.length - base.length;
    const baseWithoutExt = base.substring(0, base.length - ext.length);
    const newBaseWithoutExt = renameBaseWithoutExt(baseWithoutExt);
    return `${file.substring(0, end)}${newBaseWithoutExt}`
}

function toRenamedFile(file, renameBaseWithoutExt) {
    const url = toRenamedUrl(file, renameBaseWithoutExt);
    const ext = path.extname(file);
    return `${url}${ext}`
}

function toRenamedEdsFile(file) {
    return toRenamedFile(file, toKebabCase);
}

function toDevSiteUrl(file) {
    const relativeFile = path.relative(__dirname + '/src/pages', file);
    return `${pathPrefix}${relativeFile}`;
}

function toRelativeFile(file, fromFile) {
    const fromDir = path.dirname(fromFile);
    return path.relative(fromDir, file);
}

function toRelativeUrl(file, fromFile) {
    const relativeFile = toRelativeFile(file, fromFile);
    return toRenamedUrl(relativeFile, f => f);
}

function getFileMap(files) {
    const map = new Map();
    files.forEach(from => { 
        const to = toRenamedEdsFile(from);
        if(to !== from) {
            map.set(from, to) 
        }
    });
    return map;
}

function renameFiles(map) {
    map.forEach((to, from) => {
        fs.rename(from, to, function(err) {
            if(err) throw err;
        });
    });
}

function appendRedirects(fileMap) {
    const newData = [];
    fileMap.forEach((toFile, fromFile) => {
        newData.push({
            Source: toDevSiteUrl(fromFile), 
            Destination: toDevSiteUrl(toFile)
        })
    });

    const currData = readRedirectionsFile();
    const data = [...currData, ...newData];
    writeRedirectionsFile(data);
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

function renameLinksInFile(linkMap, file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if(err) throw err;

        linkMap.forEach((to, from) => {
            data = data.replaceAll(new RegExp(`(\\[[^\\[]*]\\()(${from})([^)]*\\))`, "g"), `$1${to}$3`);
        });
    
        fs.writeFile(file, data, 'utf8', function (err) {
            if(err) throw err;
        });
    });
}

try {
    const files = getMarkdownFiles();
    const fileMap = getFileMap(files);
    renameFiles(fileMap);
    appendRedirects(fileMap);
    
    files.forEach(fileBeforeRename => {
        const file = fileMap.get(fileBeforeRename) ?? fileBeforeRename;
        const linkMap = getLinkMap(fileMap, file);
        renameLinksInFile(linkMap, file);
    });

} catch (err) {
    console.error(err);
}
