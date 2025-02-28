// This script retrieves the pathPrefix from the runtime-connector's devsite-paths.json file.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file

const DEVSITE_PATHS_URL = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

module.exports = async ({ core, owner, repo }) => {
  const entries = await (await fetch(DEVSITE_PATHS_URL)).json();
  const entry = entries?.find(entry => entry.owner === owner && entry.repo === repo);
  const pathPrefix = entry?.pathPrefix;
  
  if (!pathPrefix) {
    core.setFailed(
      `The pathPrefix is missing from the runtime-connector's devsite-paths.json file.
  
      To fix this, reach out to the dev-site team.
      `
    );
  }

  core.setOutput('path_prefix', pathPrefix);
};
