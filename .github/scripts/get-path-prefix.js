// This script retrieves the pathPrefix from the config.md file and validates it against devsite-paths.json.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file

const ROOT="../../src/pages";
const CONFIG_PATH = `${ROOT}/config.md`;
const DEVSITE_PATHS_URL = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

const getFromConfig = async () => {
  let pathPrefix;
  const fs = await require('fs');    
  if (fs.existsSync(CONFIG_PATH)) {
    let string = fs.readFileSync(CONFIG_PATH).toString() ?? "";
    const lines = string.split('\n');
    // find the " - pathPrefix:" line
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
    if (keyIndex >= 0) {
      // find the "    - %PATH_PREFIX%" line
      let line = lines.slice(keyIndex + 1)?.find(line => line.trimStart().startsWith("-"));
      if (line) {
        // remove whitespace at start, remove dash (i.e. first character), remove whitespace at start and end
        pathPrefix = line.trimStart().substring(1).trim();
      }
    }
  }
  return pathPrefix;
}

const getFromDevsitePaths = async ({ owner, repo }) => {
  const obj = await (await fetch(DEVSITE_PATHS_URL)).json();
  // find pathPrefix for owner and repo
  const entry = obj?.find(entry => entry.owner === owner && entry.repo === repo);
  return entry?.pathPrefix;
}

module.exports = async ({ core, owner, repo }) => {
  const fromConfig = await getFromConfig();
  const fromDevsitePaths = await getFromDevsitePaths({ owner, repo });

  if(!fromConfig) {
    core.setFailed(
      `The pathPrefix in the site's config.md file is missing.

      To fix this, open your config.md file, and add it to the config object:

      - pathPrefix:
          - /commerce/frontend-core/
      ...
      }`
    );
  }
  else if(!fromDevsitePaths) {
    core.setFailed(
      `The pathPrefix in the connector's devsite-paths.json file is missing.

      To fix this, reach out to the dev-site team so they can add an entry to ${DEVSITE_PATHS_URL} and redeploy the connector.
      }`
    );
  }
  else if(fromConfig !== `${fromDevsitePaths}/`) {
    core.setFailed(
      `The pathPrefix in the site's config.md file doesn't match the pathPrefix in the devsite-runtime-connector's devsite-paths.json.

      To fix this, change the pathPrefix on either file to have the same value.
      }`
    );
  }
  else if (fromConfig === '/') {
    core.setFailed(
      `The pathPrefix in the site's config.md file is set to "/". This is not allowed.

      To fix this, change the pathPrefix to include a name that starts and ends with "/":

      pathPrefix: "/commerce/frontend - core/"

      This name identifies the site within the developer.adobe.com domain:
      https://developer.adobe.com/document-services/<PATH_TO_FILES>.
      `
    );
  } 
  else if (!fromConfig.startsWith('/') || !fromConfig.endsWith('/')) {
    core.setFailed(
      `The pathPrefix in the site's config.md file file does not start or end with "/".

      To fix this, change the pathPrefix to include a name that starts and ends with "/".
      For example: "/document-services/" or "/commerce/cloud-tools/".

      This is required by convention because of the way we construct site URLs.
      For example: https://developer.adobe.com + /document-services/ + path/to/files/.
      `
    );
  }
  
  core.setOutput('path_prefix', pathPrefix);
};





