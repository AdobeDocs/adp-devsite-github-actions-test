const path = require('path');
const fs = require('node:fs');
const matchAll = require('string.prototype.matchall');
const { 
    getMarkdownFiles, 
    replaceLinksInFile, 
    getFindPatternForMarkdownFiles: getFindPattern, 
    getReplacePatternForMarkdownFiles: getReplacePattern, 
} = require('./scriptUtils.js');

function normalizeLinksInMarkdownFile(file, files) {
    const relativeToDir = path.dirname(file);
    const relativeFiles = files.map(file => path.relative(relativeToDir, file));
    const linkMap = new Map();    

    const linkPattern = getFindPattern('[^)#]*');
    let data = fs.readFileSync(file, 'utf8');
    const links = matchAll(data, new RegExp(linkPattern, "gm"));
    [...links].forEach(link => {
        const optionalPrefix = link[2] ?? '';
        const from = link[3] ?? '';
        let to = from;

        // ensure link includes file name and extension
        const toHasTrailingSlash = to.endsWith('/') || optionalPrefix.endsWith('/') && !to;
        if(toHasTrailingSlash) {
            to = `${to}index.md`
        }
        if(!to.endsWith('.md') && to) {
            to = `${to}.md`;
        }

        // temporarily use local machine's path separator (i.e. '\' for Windows, '/' for Mac) 
        // to compare files retrieved from local machine
        to = to.replaceAll('/', path.sep);

        // ensure simplest relative path
        // this removes trailing slash, so need to do this after check for trailing slash above
        const absolute = path.resolve(relativeToDir, to);
        const relative = path.relative(relativeToDir, absolute);
        to = relative;

        // ensure the link we constructed above exists
        const toExists = relativeFiles.find(file => to === file);

        // revert back to URL path separator '/'
        to = to.replaceAll(path.sep, '/');

        if(to !== from && toExists) {
            linkMap.set(from, to);
        }
    })

    replaceLinksInFile({ 
        file, 
        linkMap,
        getFindPattern,
        getReplacePattern,
    });
}

try {
    const files = getMarkdownFiles();
    const mdFiles = getMarkdownFiles();
    mdFiles.forEach(mdFile => {
        normalizeLinksInMarkdownFile(mdFile, files);
    });
    
} catch (err) {
    console.error(err);
}