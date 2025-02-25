// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const test = async () => {
    const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

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
    const pathPrefix = line.substring(startIndex, endIndex + 1); 
    console.log(`pathPrefix from config: "${pathPrefix}"`);

    // TODO - pass repo as an arg to this script. 
    // e.g. https://github.com/AdobeDocs/adp-devsite-github-actions-test/actions/runs/13468667666/job/37639187537
    // 
    const owner = "AdobeDocs";
    const repo = "adp-devsite-github-actions-test";
    // TODO - get root from devsite paths, but adjust it so that 
    // use these 3 as a key to the pathPrefix from devsite paths, and then make sure pathPrefix is the same.

    const devsitePaths = await (await fetch(url)).json();
    
};

test();


  

