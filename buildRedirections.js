const path = require('path');
const fs = require('node:fs');
const { pathPrefix } = require('./gatsby-config.js');
const { globSync }= require('glob');

try {
    if(!pathPrefix) {
        throw new TypeError("pathPrefix not found");
    } 

    let results = globSync(__dirname + '/src/pages/**/*.md');
    let data = [];

    // Fixes paths that end in a trailing slash that shouldn't
    results.forEach((mdFilePath) => {
        let originalFilePath = mdFilePath;
        mdFilePath = mdFilePath.replace(__dirname + '/src/pages', pathPrefix);
        mdFilePath = path.resolve(mdFilePath);

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
