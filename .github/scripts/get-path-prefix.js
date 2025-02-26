// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const test = async () => {
  const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";
  const root='../../src/pages';
  const configPath = `${root}/config.md`;
  // // TODO - pass repo as an arg to this script. 
  // // e.g. https://github.com/AdobeDocs/adp-devsite-github-actions-test/actions/runs/13468667666/job/37639187537
  const owner = "AdobeDocs";
  const repo = "adp-devsite-github-actions-test";

  // fail if config.md is missing
  const fs = await require('fs');    
  if (!fs.existsSync(configPath)) {
      console.log('file doesnt exist');
      return;
  }

  // get pathPrefix from config
  let configContent = fs.readFileSync(configPath).toString();
  const lines = configContent.split('\n');
  const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
  const line = lines.slice(keyIndex + 1).find(line => line.trimStart().startsWith("-"));
  const startIndex = line.indexOf('/');
  const endIndex = line.lastIndexOf('/');
  const pathPrefixFromConfig = line.substring(startIndex, endIndex); 
  console.log(`pathPrefixFromConfig: "${pathPrefixFromConfig}"`);

  // get pathPrefix from devsite-paths
  const devsitePaths = await (await fetch(url)).json();
  const entry = devsitePaths.find(entry => entry.repo === repo && entry.owner === owner);
  const pathPrefixFromDevsitePaths = entry.pathPrefix;
  console.log(`pathPrefixFromDevsitePaths: "${pathPrefixFromDevsitePaths}"`);
};

test();




