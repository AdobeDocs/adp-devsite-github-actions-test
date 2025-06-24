const path = require('path');
const fs = require('node:fs');
const {
    getPathPrefix,
    readRedirectionsFile,
    writeRedirectionsFile,
    getRedirectionsFilePath,
    getDeployableFiles,
    getMarkdownFiles,
    getFindPatternForMarkdownFiles,
    getReplacePatternForMarkdownFiles,
    removeFileExtension,
    replaceLinksInFile,
    replaceLinksInString,
} = require('./scriptUtils.js');

function toKebabCase(str) {
    const isScreamingSnakeCase = new RegExp(/^[A-Z0-9_]*$/).test(str);
    str = isScreamingSnakeCase ? str.toLowerCase() : str;
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x) => x.toLowerCase())
        .join('-');
}

function toEdsCase(str) {
    const isValid = Boolean(/^([a-z0-9-]*)$/.test(str));
    return isValid ? str : toKebabCase(str);
}

function toUrl(str) {
    let url = removeFileExtension(str);

    // replace '/index' with trailing slash
    if (url.endsWith('/index')) {
        const index = url.lastIndexOf('index');
        url = url.substring(0, index);
    }

    return url;
}

function removeTrailingSlash(str) {
    if (str.endsWith('/')) {
        const index = str.length - 1;
        str = str.substring(0, index);
    }
    return str;
}

function toEdsPath(file) {
    const renamedFileWithoutExt = removeFileExtension(file)
        .split(path.sep)
        .map((token) => toEdsCase(token))
        .join(path.sep);
    const ext = path.extname(file);
    return `${renamedFileWithoutExt}${ext}`;
}

function getFileMap(files) {
    const map = new Map();
    files.forEach((from) => {
        const to = toEdsPath(from);
        if (to !== from) {
            map.set(from, to);
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

function renameLinksInGatsbyConfigFile(fileMap, file) {
    const dir = path.join('src', 'pages');
    replaceLinksInFile({
        file,
        linkMap: getLinkMap(fileMap, dir),
        getFindPattern: (from) => `(['"]?path['"]?\\s*:\\s*['"])(/|./)?(${from})(#[^'"]*)?(['"])`,
        getReplacePattern: (to) => `$1$2${to}$4$5`,
    });
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

function getRenamedUrl(fromUrl, patterns, linkMap) {
    let pattern;
    patterns.forEach((p) => {
        linkMap.forEach((_, f) => {
            const find = p.getFindPattern(f);
            const test = new RegExp(find).test(fromUrl);
            if (test) {
                pattern = p;
            }
        });
    });
    const toUrl = pattern
        ? replaceLinksInString({
              string: fromUrl,
              linkMap,
              getFindPattern: pattern.getFindPattern,
              getReplacePattern: pattern.getReplacePattern,
          })
        : null;
    return toUrl;
}

function renameLinksInRedirectsFile(fileMap, pathPrefix) {
    const patterns = [
        // paths that exist in the repo
        {
            getFindPattern: (from) => `^(${pathPrefix}${toUrl(from)})(#.*)?$`,
            getReplacePattern: (to) => `${pathPrefix}${toUrl(to)}$2`,
        },
        // paths that don't end in a trailing slash but should, i.e. non-existent paths added by 'buildRedirections.js'
        {
            getFindPattern: (from) => `^(${pathPrefix}${removeTrailingSlash(toUrl(from))})(#.*)?$`,
            getReplacePattern: (to) => `${pathPrefix}${removeTrailingSlash(toUrl(to))}$2`,
        },
        // paths that end with '/index' but should end with a trailing slash, i.e. non-normalized paths added by 'buildRedirections.js'
        {
            getFindPattern: (from) => `^(${pathPrefix}${removeTrailingSlash(toUrl(from))}/index)(#.*)?$`,
            getReplacePattern: (to) => `${pathPrefix}${removeTrailingSlash(toUrl(to))}/index$2`,
        },
        // paths that end in a trailing slash, but shouldn't, i.e. non-existent paths added by 'buildRedirections.js'
        {
            getFindPattern: (from) => `^(${pathPrefix}${toUrl(from)}/)(#.*)?$`,
            getReplacePattern: (to) => `${pathPrefix}${toUrl(to)}/$2`,
        },
    ];

    const file = getRedirectionsFilePath();
    const dir = path.dirname(file);
    const linkMap = getLinkMap(fileMap, dir);
    const newRedirects = [];

    const currRedirects = readRedirectionsFile();
    currRedirects.forEach(({ Source: currSource, Destination: currDestination }) => {
        const newSource = getRenamedUrl(currSource, patterns, linkMap);
        const newDestination = getRenamedUrl(currDestination, patterns, linkMap);
        if (!newSource && !newDestination) {
            newRedirects.push({
                Source: currSource,
                Destination: currDestination,
            });
        } else if (!newSource && newDestination) {
            newRedirects.push({
                Source: currSource,
                Destination: newDestination,
            });
        } else if (newSource && !newDestination) {
            newRedirects.push({
                Source: currSource,
                Destination: currDestination,
            });
            newRedirects.push({
                Source: newSource,
                Destination: currDestination,
            });
        } else {
            newRedirects.push({
                Source: currSource,
                Destination: newDestination,
            });
            newRedirects.push({
                Source: newSource,
                Destination: newDestination,
            });
        }
    });

    linkMap.forEach((to, from) => {
        newRedirects.push({
            Source: `${pathPrefix}${toUrl(from)}`,
            Destination: `${pathPrefix}${toUrl(to)}`,
        });
    });

    writeRedirectionsFile(newRedirects);
}

function deleteEmptyDirectoryUpwards(startDir, stopDir) {
    const isEmpty = fs.readdirSync(startDir).length === 0;
    if (isEmpty && startDir !== stopDir) {
        fs.rmdirSync(startDir);
        deleteEmptyDirectoryUpwards(path.dirname(startDir), stopDir);
    }
}

function renameFiles(map) {
    // create new dirs
    map.forEach((to, _) => {
        const toDir = path.dirname(to);
        if (!fs.existsSync(toDir)) {
            fs.mkdirSync(toDir, { recursive: true });
        }
    });

    // rename
    map.forEach((to, from) => {
        fs.renameSync(from, to);
    });

    // delete old dirs
    map.forEach((_, from) => {
        const fromDir = path.dirname(from);
        if (fs.existsSync(fromDir)) {
            deleteEmptyDirectoryUpwards(fromDir, __dirname);
        }
    });
}

try {
    const files = getDeployableFiles();
    const fileMap = getFileMap(files);

    const mdFiles = getMarkdownFiles();
    mdFiles.forEach((mdFile) => {
        renameLinksInMarkdownFile(fileMap, mdFile);
    });

    const redirectsFile = getRedirectionsFilePath();
    const pathPrefix = getPathPrefix();
    if (fs.existsSync(redirectsFile)) {
        renameLinksInRedirectsFile(fileMap, pathPrefix);
    }

    const gatsbyConfigFile = 'gatsby-config.js';
    if (fs.existsSync(gatsbyConfigFile)) {
        renameLinksInGatsbyConfigFile(fileMap, gatsbyConfigFile);
    }

    renameFiles(fileMap);
} catch (err) {
    console.error(err);
}
