// This script retrieves the pathPrefix from the config.md file and validates it against the pathPrefix from devsite-paths.json.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file

const CONFIG_PATH = `./src/pages/config.md`;

module.exports = async ({ core, pathPrefixFromDevsitePaths }) => {
    const fs = await require('fs');    
    if (!fs.existsSync(CONFIG_PATH)) {
      core.setFailed(
        `The site's config.md file is missing.
  
        To fix this, either create one in ./src/pages, or auto-generate one from the site's gatsby-config.md file by building navigation file.`
      );
      return;
    }
  
    const string = fs.readFileSync(CONFIG_PATH).toString() ?? "";
    const lines = string.split('\n');
  
    // find the pathPrefix key
    const keyIndex = lines.findIndex(line => line.includes("pathPrefix:"));
  
    if (keyIndex < 0) {
      core.setFailed(
        `The pathPrefix in the site's config.md file is missing.
  
        To fix this, open your config.md file, and add it to the config object:
  
        - pathPrefix:
        ...`
      );
      return;
    }
  
    // find the pathPrefix value
    const line = lines.slice(keyIndex + 1)?.find(line => line.trimStart().startsWith("-")) ?? "";
  
    // remove whitespace at start, remove dash (i.e. first non-whitespace character), and remove whitespace at start and end
    const pathPrefix = line.trimStart().substring(1).trim();
  
    if (!pathPrefix) {
      core.setFailed(
        `The pathPrefix in the site's config.md file is missing.
  
        To fix this, open your config.md file, and add it to the config object:
  
        - pathPrefix:
            - /commerce/frontend-core/
        ...`
      );
    } else if (pathPrefix === '/') {
        core.setFailed(
            `The pathPrefix in the site's config.md file is set to "/". This is not allowed.

            To fix this, change the pathPrefix to include a name that starts and ends with "/".

            For example: "/commerce/frontend - core/"

            This name identifies the site within the developer.adobe.com domain:
            https://developer.adobe.com/document-services/<PATH_TO_FILES>.
            `
        );
    } else if (!pathPrefix.startsWith('/') || !pathPrefix.endsWith('/')) {
        core.setFailed(
            `The pathPrefix in the site's config.md file does not start or end with "/".

            pathPrefix: "${pathPrefix}"

            To fix this, change the pathPrefix to include a name that starts and ends with "/".
            For example: "/document-services/" or "/commerce/cloud-tools/".

            This is required by convention because of the way we construct site URLs.
            For example: https://developer.adobe.com + /document-services/ + path/to/files/.
            `
        );
    } else if(pathPrefix !== `${pathPrefixFromDevsitePaths}/`) {
        core.setFailed(
          `The pathPrefix in the site's config.md file doesn't match the pathPrefix in the runtime-connector's devsite-paths.json.

          pathPrefix from config.md: "${pathPrefix}"
          pathPrefix from devsite-paths.json: "${pathPrefixFromDevsitePaths}"
    
          To fix this, change the pathPrefix on either file to have the same value - except with trailing slash for config.md and without trailing slash for devsite-paths.json. To change devsite-paths.json, reach out to the dev-site team.
          `
        );
    }
}


