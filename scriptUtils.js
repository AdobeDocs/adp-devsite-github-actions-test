const path = require('path');
const fs = require('node:fs');
const { globSync }= require('glob');

function getRedirectionsFilePath() {
    return path.resolve(__dirname + '/src/pages/redirects.json');
}

function readRedirectionsFile() {
    const redirectionsFilePath = getRedirectionsFilePath();
    return JSON.parse(fs.readFileSync(redirectionsFilePath)).data; 
}

function writeRedirectionsFile(data) {
    let redirectionsData = 
    {
        "total" : data.length,
        "offset": 0,
        "limit": data.length,
        "data" : data,
        ":type": "sheet"
    };

    let redirectionsFilePath = getRedirectionsFilePath();
    fs.writeFileSync(redirectionsFilePath, JSON.stringify(redirectionsData));
}

function getMarkdownFiles() {
    return globSync(__dirname + '/src/pages/**/*.md')
        .map(f => path.resolve(f));
}

function toUrl(file, renameBaseWithoutExt) {
    const base = path.basename(file);
    const ext = path.extname(file);
    const end = file.length - base.length;
    const baseWithoutExt = base.substring(0, base.length - ext.length);
    const newBaseWithoutExt = renameBaseWithoutExt(baseWithoutExt);
    return `${file.substring(0, end)}${newBaseWithoutExt}`
}

function toRelativeFile(file, fromFile) {
    const fromDir = path.dirname(fromFile);
    return path.relative(fromDir, file);
}

function toRelativeUrl(file, fromFile) {
    const relativeFile = toRelativeFile(file, fromFile);
    return toUrl(relativeFile, f => f);
}

module.exports = {
    getRedirectionsFilePath,
    readRedirectionsFile,
    writeRedirectionsFile,
    getMarkdownFiles,
    toUrl,
    toRelativeUrl,
};
