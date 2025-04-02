const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');
const { getRedirectionsFilePath } = require('./buildRedirections.js');
const matchAll = require('string.prototype.matchall');

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

function normalizeLink(link, file) {
    // e.g. with.dot - can't assume this is the file extension
    // need to compare with the actual equivalent file
    // easy enough to remove '/' prefix, './' prefix, 
    // and replacing '/index' with '/' (but this must be done after the file extension is removed)

    // - remove file extension
        // if it matches a file, then it must have file extension. can remove via path.extname
        // if it doesn't, then leave no file extension to remove
    // - remove '/' prefix
        // simply remove because it's not needed and def not part of file name
    // - remove './' prefix
        // simply remove because it's not needed and def not part of file name
    // - remove index filename
        // at this point, extension has been removed, and unnecessary prefixes have been stripped off
        // so can straight up see if the path ends with index
        // if it's in the current dir of file, then replace with '/'. if not, then just delete 'index', e.g. Guides/index turns into Guides/
}

function normalizeLinksInFile({ file, filePattern, fileIndex, getFindPattern, getReplacePattern }) {
    let data = fs.readFileSync(file, 'utf8');

    const findFile = getFindPattern(filePattern);
    const matches = matchAll(data, new RegExp(findFile, "gm"));
    const links = [...matches].map(m => m[fileIndex]);
    console.log([...links]);

    // const linkMap = new Map();
    // links.forEach(link => {
    //     // TODO
    //     linkMap.set(link,'Chewie');
    // })

    // linkMap.forEach((to, from) => {
    //     const findFrom = getFindPattern(from);
    //     const replaceTo = getReplacePattern(to);
    //     data = data.replaceAll(new RegExp(findFrom, "gm"), replaceTo);
    // });

    // fs.writeFileSync(file, data, 'utf-8');
}

function normalizeLinksInMarkdownFile(files, file) {
    console.log(file);
    normalizeLinksInFile({
        file,
        filePattern: '[^)#]*',
        fileIndex: 2,
        getFindPattern: (from) => `(\\[[^\\]]*]\\()(${from})(#[^\\()]*)?(\\))`,
        getReplacePattern: (to) => `$1${to}$3$4`,
    })
}

function normalizeLinksInRedirectsFile(files) {
    const file = getRedirectionsFilePath();
    normalizeLinksInFile({
        file,
        filePattern: '[^"#]*',
        fileIndex: 5,
        getFindPattern: (from) => `(")(Source|Destination)("\\s*:\\s*")(${pathPrefix})(${from})(#[^"]*)?(")`,
        getReplacePattern: (to) => `$1$2$3${pathPrefix}${to}$6$7`,
    });
}

console.log();
try {
    const files = getMarkdownFiles();
    files.forEach(file => {
        if(file === '/Users/melissag/Projects/adp-devsite-github-actions-test/src/pages/Guides/index.md') {
            normalizeLinksInMarkdownFile(files, file);
        }
    });
    normalizeLinksInRedirectsFile(files);

} catch (err) {
    console.error(err);
}
console.log();

module.exports = {
    getMarkdownFiles,
    toUrl,
    toRelativeUrl,
};