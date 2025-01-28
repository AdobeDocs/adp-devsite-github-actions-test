const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');

function getMdFilePaths(pattern) {
    let results = globSync(__dirname + '/src/pages' + pattern);
    return results.map(mdFilePath => {
        mdFilePath = mdFilePath.replace(__dirname + '/src/pages', pathPrefix);
        mdFilePath = path.resolve(mdFilePath);
        return mdFilePath;
    });
}

try {
    if(!pathPrefix) {
        throw new TypeError("pathPrefix not found");
    } 

    let data = [];

    // Fixes paths that end in a trailing slash but shouldn't
    getMdFilePaths('/**/*.md').forEach(mdFilePath => {
        // skip any index.md or config.md as they don't need redirect
        if(!mdFilePath.includes('index.md')) {
            if(!mdFilePath.includes('config.md')) {
                mdFilePath = mdFilePath.replace('.md', '/');
                data.push({
                    "Source" : mdFilePath,
                    "Destination" : mdFilePath.replace(/\/$/, "")
                });
            }
        }
    });

    // Fixes paths that don't end in a trailing slash but should
    getMdFilePaths('/**/index.md').forEach(mdFilePath => {
        mdFilePath = mdFilePath.replace('/index.md', '');
        data.push({
            "Source" : mdFilePath,
            "Destination" : mdFilePath + '/'
        });
    });

    let redirectionsData = 
    {
        "total" : data.length,
        "offset": 0,
        "limit": data.length,
        "data" : data,
        ":type": "sheet"
    };

    let redirectionsFilePath = path.resolve(__dirname + '/src/pages/redirects.json');
    fs.writeFileSync(redirectionsFilePath, JSON.stringify(redirectionsData));

} catch (err) {
    console.error(err);
}
