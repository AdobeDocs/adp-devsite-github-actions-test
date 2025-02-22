// This script retrieves the pathPrefix from the gatsby-config.js file.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file

module.exports = async ({ core }) => {
    const fs = await require('fs');    
    if (!fs.existsSync('../../src/pages/config.md')) {
        core.setFailed(
            `config.md file is missing.
      
            To fix this, add a config.md file under src/pages.
            `
          );
    }
};
  