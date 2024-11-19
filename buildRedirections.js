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

    results.forEach((mdFilePath) => {
        mdFilePath = mdFilePath.replace(__dirname + '/src/pages', pathPrefix);
        mdFilePath = path.resolve(mdFilePath);

        // skip any index.md as they don't need redirect
        if(!mdFilePath.includes('index.md')) {
            mdFilePath = mdFilePath.replace('.md', '/');
            data.push({
                "Source" : mdFilePath,
                "Destinatination" : mdFilePath.replace(/\/$/, "")
            });
        }
    });

    let redirectionsData = 
    {
        "total" : data.length,
        "data" : data,
        ":type": "sheet"
    };

    let redirectionsFilePath = path.resolve(__dirname + '/src/pages/redirects.json');
    fs.writeFileSync(redirectionsFilePath, JSON.stringify(redirectionsData));

} catch (err) {
    console.error(err);
}
