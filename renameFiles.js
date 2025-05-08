const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { 
    readRedirectionsFile, 
    writeRedirectionsFile, 
    getRedirectionsFilePath, 
    getMarkdownFiles, 
    getFindPatternForMarkdownFiles,
    getReplacePatternForMarkdownFiles,
    removeFileExtension,
    replaceLinksInFile 
} = require('./scriptUtils.js');

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

function renameFile(file, renameBaseWithoutExt) {
    const renamedFileWithoutExt = removeFileExtension(file, renameBaseWithoutExt);
    const ext = path.extname(file);
    return `${renamedFileWithoutExt}${ext}`
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
        let fromRelFile = path.relative(relativeToDir, fromFile);
        fromRelFile = fromRelFile.replaceAll(path.sep, '/');

        let toRelFile = path.relative(relativeToDir, toFile);
        toRelFile = toRelFile.replaceAll(path.sep, '/');

        linkMap.set(fromRelFile, toRelFile);
    });
    return linkMap;
}

function renameLinksInMarkdownFile(fileMap, file) {
    const dir = path.dirname(file);
    replaceLinksInFile({ 
        file, 
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: getFindPatternForMarkdownFiles,
        getReplacePattern: getReplacePatternForMarkdownFiles,
    });
}

function renameLinksInRedirectsFile(fileMap) {
    const file = getRedirectionsFilePath();
    const dir = path.dirname(file);
    replaceLinksInFile({
        file,
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(['"]?)(Source|Destination)(['"]?\\s*:\\s*['"])(${pathPrefix}${removeFileExtension(from)})(/?)(#[^'"]*)?(['"])`,
        getReplacePattern: (to) => `$1$2$3${pathPrefix}${removeFileExtension(to)}$5$6$7`,
    });
}

function renameLinksInGatsbyConfigFile(fileMap, file) {
    const dir = path.join('src', 'pages');
    replaceLinksInFile({
        file,
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(['"]?path['"]?\\s*:\\s*['"])(/|./)?(${from})(#[^'"]*)?(['"])`,
        getReplacePattern: (to) => `$1$2${to}$4$5`,
    });
}

function appendRedirects(fileMap) {
    const file = getRedirectionsFilePath();
    const dir = path.dirname(file);
    const linkMap = getLinkMap(fileMap, dir);
    const newData = [];
    linkMap.forEach((to, from) => {
        newData.push({
            Source:  `${pathPrefix}${removeFileExtension(from)}`, 
            Destination: `${pathPrefix}${removeFileExtension(to)}`,
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
    const files = getMarkdownFiles();
    const fileMap = getFileMap(files);

    const mdFiles = getMarkdownFiles();
    mdFiles.forEach(mdFile => {
        renameLinksInMarkdownFile(fileMap, mdFile);
    });

    const redirectsFile = getRedirectionsFilePath();
    if(fs.existsSync(redirectsFile)) {
        renameLinksInRedirectsFile(fileMap);
        appendRedirects(fileMap);
    }

    const gatsbyConfigFile = 'gatsby-config.js';
    if(fs.existsSync(gatsbyConfigFile)) {
        renameLinksInGatsbyConfigFile(fileMap, gatsbyConfigFile);
    }

    renameFiles(fileMap);

} catch (err) {
    console.error(err);
}