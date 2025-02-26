// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const CONFIG_PATH = '../../src/pages/config.md';
const DEVSITE_PATHS_URL = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

const getFromConfig = async () => {
  let pathPrefix;
  const fs = await require('fs');    
  if (fs.existsSync(CONFIG_PATH)) {
    let string = fs.readFileSync(CONFIG_PATH).toString();
    const lines = string.split('\n');
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
    const line = lines.slice(keyIndex + 1).find(line => line.trimStart().startsWith("-"));
    const startIndex = line.indexOf('/');
    const endIndex = line.lastIndexOf('/');
    pathPrefix = line.substring(startIndex, endIndex); 
  }
  return pathPrefix;
}

const getFromDevsitePaths = async ({owner, repo}) => {
  const obj = await (await fetch(DEVSITE_PATHS_URL)).json();
  const entry = obj.find(entry => entry.repo === repo && entry.owner === owner);
  return entry?.pathPrefix;
}

const test = async ({owner, repo}) => {
  const fromConfig = await getFromConfig();
  console.log('fromConfig: ', fromConfig);

  const fromDevsitePaths = await getFromDevsitePaths({owner, repo});
  console.log('fromDevsitePaths: ', fromDevsitePaths);

  if(!fromConfig) {
    console.log('add to config');
    return;
  }

  if(!fromDevsitePaths) {
    console.log('add to devsite-paths');
    return;
  }

  if(fromConfig !== fromDevsitePaths) {
    console.log('should match');
    return;
  }

  return fromConfig;
};

test({owner: "AdobeDocs", repo: "adp-devsite-github-actions-test"});




