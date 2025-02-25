// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const test = async () => {
    const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

    const { pathPrefix } = await require('../../gatsby-config.js');
    console.log('~~ pathPrefix from gatsby: ', pathPrefix);

    const configPath = '../../src/pages/config.md';

    const fs = await require('fs');    
    if (!fs.existsSync(configPath)) {
        console.log('file doesnt exist');
    }

    let configContent = fs.readFileSync(configPath).toString();
    const lines = configContent.split('\n');
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
    const line = lines.slice(keyIndex + 1).find(line => line.trimStart().startsWith("-"));
    

    const startIndex = line.indexOf('/');
    const endIndex = line.lastIndexOf('/');
    const pathPrefixFromConfig = line.substring(startIndex, endIndex + 1); 
    console.log(`pathPrefix from config: "${pathPrefixFromConfig}"`);


    
    const devsitePaths = await (await fetch(url)).json();
};

test();


  

