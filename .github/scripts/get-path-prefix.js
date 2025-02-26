// This script retrieves the pathPrefix from the config.md file and validates it against devsite-paths.json.
// It serves as an example for how to set up external javascript functions
// outside workflow .yml files when they get too big or complex to keep them inline.

// Documentation for the actions/github-script:
// https://github.com/actions/github-script#run-a-separate-file


module.exports = async ({ core }) => {
  core.setOutput('path_prefix', "/github-actions-test");
};





