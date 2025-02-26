// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const devsitePathsUrl = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";
const root='../../src/pages';
const configPath = `${root}/config.md`;
// // TODO - pass repo as an arg to this script. 
// // e.g. https://github.com/AdobeDocs/adp-devsite-github-actions-test/actions/runs/13468667666/job/37639187537
const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const getFromConfig = async () => {
    // fail if config.md is missing
    const fs = await require('fs');    
    if (!fs.existsSync(configPath)) {
        return null;
    }
  
    // get pathPrefix from config
    let config = fs.readFileSync(configPath).toString();
    const lines = config.split('\n');
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
    const line = lines.slice(keyIndex + 1).find(line => line.trimStart().startsWith("-"));
    const startIndex = line.indexOf('/');
    const endIndex = line.lastIndexOf('/');
    const pathPrefixFromConfig = line.substring(startIndex, endIndex); 
    return pathPrefixFromConfig;
}

const getFromDevsitePaths = async () => {
  // get pathPrefix from devsite-paths
  const devsitePaths = await (await fetch(devsitePathsUrl)).json();
  const entry = devsitePaths.find(entry => entry.repo === repo && entry.owner === owner);
  const pathPrefixFromDevsitePaths = entry.pathPrefix;
  return pathPrefixFromDevsitePaths;
}

const test = async () => {
  const fromConfig = await getFromConfig();
  console.log('fromConfig: ', fromConfig);

  const fromDevsitePaths = await getFromDevsitePaths();
  console.log('fromDevsitePaths: ', fromDevsitePaths);
};

test();




