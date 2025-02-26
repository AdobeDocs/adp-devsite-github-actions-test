// This script validates the pathPrefix from config.md against the pathPrefix from devsite-paths.json.

const DEVSITE_PATHS_URL = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

module.exports = async ({ core, pathPrefix, owner, repo }) => {
    const entries = await (await fetch(DEVSITE_PATHS_URL)).json();
    const entry = entries?.find(entry => entry.owner === owner && entry.repo === repo);
    const pathPrefixFromDevsitePaths = entry?.pathPrefix;

    if (pathPrefix === '/') {
        core.setFailed(
            `The pathPrefix in the site's config.md file is set to "/". This is not allowed.

            To fix this, change the pathPrefix to include a name that starts and ends with "/":

            pathPrefix: "/commerce/frontend - core/"

            This name identifies the site within the developer.adobe.com domain:
            https://developer.adobe.com/document-services/<PATH_TO_FILES>.
            `
        );
    } else if (!pathPrefix.startsWith('/') || !pathPrefix.endsWith('/')) {
        core.setFailed(
            `The pathPrefix in the site's config.md file does not start or end with "/".

            To fix this, change the pathPrefix to include a name that starts and ends with "/".
            For example: "/document-services/" or "/commerce/cloud-tools/".

            This is required by convention because of the way we construct site URLs.
            For example: https://developer.adobe.com + /document-services/ + path/to/files/.
            `
        );
    } else if(!pathPrefixFromDevsitePaths) {
        core.setFailed(
            `The pathPrefix in the runtime-connector's devsite-paths.json file is missing.
        
            To fix this, reach out to the dev-site team so they can add an entry to ${DEVSITE_PATHS_URL} and redeploy the runtime-connector.
            `
        );
    } else if(pathPrefix !== `${pathPrefixFromDevsitePaths}/`) {
        core.setFailed(
          `The pathPrefix in the site's config.md file doesn't match the pathPrefix in the runtime-connector's devsite-paths.json.
    
          To fix this, change the pathPrefix on either file to have the same value. The only difference should be a trailing slash for config.md and no trailing slash for devsite-paths.json. To change devsite-paths.json, reach out to the dev-site team.
          `
        );
    }
}


