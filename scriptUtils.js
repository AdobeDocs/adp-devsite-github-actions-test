const path = require('path');
const fs = require('node:fs');
const { globSync } = require('glob');

function getPathPrefixFromConfig() {
    const CONFIG_PATH = path.join('src', 'pages', 'config.md');
    if (!fs.existsSync(CONFIG_PATH)) {
        return null;
    }

    const data = fs.readFileSync(CONFIG_PATH).toString();
    if (!data) {
        return null;
    }

    const lines = data.split('\n');

    // find the pathPrefix key
    const keyIndex = lines.findIndex((line) => new RegExp(/\s*-\s*pathPrefix:/).test(line));
    if (keyIndex < 0) {
        return null;
    }

    // find the pathPrefix value
    const line = lines.slice(keyIndex + 1)?.find((line) => new RegExp(/\s*-/).test(line));
    if (!line) {
        null;
    }

    // extract pathPrefix
    const pathPrefixLine = line.match(new RegExp(/(\s*-\s*)(\S*)(\s*)/));
    if (!pathPrefixLine) {
        return null;
    }
    return pathPrefixLine[2];
}

function getPathPrefixFromGatsbyConfig() {
    const { pathPrefix } = require('./gatsby-config.js');
    return pathPrefix;
}

function getPathPrefix() {
    return getPathPrefixFromConfig() ?? getPathPrefixFromGatsbyConfig();
}

function getRedirectionsFilePath() {
    const redirectionsFilePath = path.join(__dirname, 'src', 'pages', 'redirects.json');
    return path.resolve(redirectionsFilePath);
}

function readRedirectionsFile() {
    const redirectionsFilePath = getRedirectionsFilePath();
    return JSON.parse(fs.readFileSync(redirectionsFilePath)).data;
}

function writeRedirectionsFile(data) {
    let redirectionsData = {
        total: data.length,
        offset: 0,
        limit: data.length,
        data: data,
        ':type': 'sheet',
    };

    let redirectionsFilePath = getRedirectionsFilePath();
    fs.writeFileSync(redirectionsFilePath, JSON.stringify(redirectionsData));
}

function getFiles(fileExtensions) {
    const fileExtensionsPattern = fileExtensions.join('|');
    return globSync(__dirname + `/src/pages/**/*+(${fileExtensionsPattern})`).map((f) => path.relative(__dirname, f));
}

function getDeployableFiles() {
    // files types deployed to EDS in process-mds.sh
    return getFiles(['.md', '.json']);
}

function getMarkdownFiles() {
    return getFiles(['.md']);
}

function removeFileExtension(file) {
    const base = path.basename(file);
    const ext = path.extname(file);
    const end = file.length - base.length;
    const baseWithoutExt = base.substring(0, base.length - ext.length);
    return `${file.substring(0, end)}${baseWithoutExt}`;
}

const getFindPatternForMarkdownFiles = (from) => `(\\[[^\\]]*]\\()(/|./)?(${from})(#[^\\()]*)?(\\))`;
const getReplacePatternForMarkdownFiles = (to) => `$1$2${to}$4$5`;

function replaceLinksInFile({ file, linkMap, getFindPattern, getReplacePattern }) {
    let data = fs.readFileSync(file, 'utf8');
    data = replaceLinksInString({ string: data, linkMap, getFindPattern, getReplacePattern });
    fs.writeFileSync(file, data, 'utf-8');
}

function replaceLinksInString({ string, linkMap, getFindPattern, getReplacePattern }) {
    linkMap.forEach((to, from) => {
        const find = getFindPattern(from);
        const replace = getReplacePattern(to);
        string = string.replaceAll(new RegExp(find, 'gm'), replace);
    });
    return string;
}

module.exports = {
    getPathPrefix,
    getRedirectionsFilePath,
    readRedirectionsFile,
    writeRedirectionsFile,
    getDeployableFiles,
    getMarkdownFiles,
    getFindPatternForMarkdownFiles,
    getReplacePatternForMarkdownFiles,
    removeFileExtension,
    replaceLinksInFile,
    replaceLinksInString,
};
