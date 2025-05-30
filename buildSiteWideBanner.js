const path = require('path');
const fs = require('node:fs');

const { siteMetadata } = require('./gatsby-config.js');

try {
    let sideWideBanner = ``;
    if (siteMetadata.siteWideBanner) {
        sideWideBanner = {
            "total": 1,
            "offset": 0,
            "limit": 1,
            "data": [siteMetadata.siteWideBanner],
            ":type": "sheet"
        };
    }

    const siteWideBanner = path.resolve(__dirname, 'src/pages/site-wide-banner.json');

    fs.writeFileSync(siteWideBanner, JSON.stringify(sideWideBanner));
    console.log(`Generated file: ${siteWideBanner}`);
} catch (err) {
    console.error(err);
}
