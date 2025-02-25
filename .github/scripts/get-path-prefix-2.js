// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const test = async () => {
    console.log('~~ hello 2');
    const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

    const { pathPrefix } = await require('../../gatsby-config.js');
    console.log('~~ pathPrefix', pathPrefix);

    const configPath = '../../src/pages/config.md';

    const fs = await require('fs');    
    if (!fs.existsSync(configPath)) {
        console.log('file doesnt exist');
    }

    let configContent = fs.readFileSync(configPath).toString()
    console.log(configContent);
    
    const devsitePaths = await (await fetch(url)).json();
};

test();


  

