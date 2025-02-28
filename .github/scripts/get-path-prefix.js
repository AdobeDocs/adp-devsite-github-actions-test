// This script retrieves the pathPrefix from the config.md file.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file

const CONFIG_PATH = `./src/pages/config.md`;

module.exports = async ({ core }) => {
  const fs = await require('fs');    
  if (!fs.existsSync(CONFIG_PATH)) {
    core.setFailed(
      `The site's config.md file is missing.

      To fix this, either create one in ./src/pages or auto-generate one from the site's gatsby-config.md file by running build navigation.`
    );
    return;
  }

  let string = fs.readFileSync(CONFIG_PATH).toString() ?? "";
  const lines = string.split('\n');

  // find the " - pathPrefix:" line
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

  // find the " - %PATH_PREFIX%" line
  let line = lines.slice(keyIndex + 1)?.find(line => line.trimStart().startsWith("-")) ?? "";

  // remove whitespace at start, remove dash (i.e. first non-whitespace character), and remove whitespace at start and end
  pathPrefix = line.trimStart().substring(1).trim();

  if (!pathPrefix) {
    core.setFailed(
      `The pathPrefix in the site's config.md file is missing.

      To fix this, open your config.md file, and add it to the config object:

      - pathPrefix:
          - /commerce/frontend-core/
      ...`
    );
    return;
  }

  core.setOutput('path_prefix', pathPrefix);
};
