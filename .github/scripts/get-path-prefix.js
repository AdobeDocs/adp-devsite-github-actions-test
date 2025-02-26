// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const CONFIG_PATH = '../../src/pages/config.md';
const DEVSITE_PATHS_URL = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

const getFromConfig = async () => {
    // fail if config.md is missing
    const fs = await require('fs');    
    if (!fs.existsSync(CONFIG_PATH)) {
        return null;
    }
  
    // get pathPrefix from config
    let config = fs.readFileSync(CONFIG_PATH).toString();
    const lines = config.split('\n');
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
    const line = lines.slice(keyIndex + 1).find(line => line.trimStart().startsWith("-"));
    const startIndex = line.indexOf('/');
    const endIndex = line.lastIndexOf('/');
    const pathPrefixFromConfig = line.substring(startIndex, endIndex); 
    return pathPrefixFromConfig;
}

const getFromDevsitePaths = async ({owner, repo}) => {
  // get pathPrefix from devsite-paths
  const devsitePaths = await (await fetch(DEVSITE_PATHS_URL)).json();
  const entry = devsitePaths.find(entry => entry.repo === repo && entry.owner === owner);
  const pathPrefixFromDevsitePaths = entry.pathPrefix;
  return pathPrefixFromDevsitePaths;
}

const test = async ({owner, repo}) => {
  const fromConfig = await getFromConfig();
  console.log('fromConfig: ', fromConfig);

  const fromDevsitePaths = await getFromDevsitePaths({owner, repo});
  console.log('fromDevsitePaths: ', fromDevsitePaths);
};

test({owner: "AdobeDocs", repo: "adp-devsite-github-actions-test"});




