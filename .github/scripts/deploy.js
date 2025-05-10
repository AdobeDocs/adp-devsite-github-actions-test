const { exec } = require('child_process');

module.exports = async ({ core, changes, deletions, operation, siteEnv, branch, pathPrefix }) => {
  let httpMethod, edsSiteEnv, codeRepoBranch, args;
  if(operation.includes('cache') || operation.includes('preview') || operation.includes('live')) {
    httpMethod = 'POST';
  } else {
    console.error('Unknown operation method');
  }

  if(siteEnv.includes('stage')) {
    edsSiteEnv = "adp-devsite-stage";
    codeRepoBranch = "stage";
  } else if(siteEnv.includes('prod')) {
    edsSiteEnv = "adp-devsite";
    codeRepoBranch = "main";
  } else {
    console.error('Unknown env to deploy to');
  }

  // hacky way to deploy to our adp-devsite-stage env
  if(siteEnv.includes('stage') && operation.includes('preview')) {
    args = `"--header x-content-source-authorization: ${branch}"`;
  }

  changes.forEach((file) => {
    const theFilePath = `${pathPrefix}/${file}`;
    const url = `https://admin.hlx.page/${operation}/adobedocs/${edsSiteEnv}/${codeRepoBranch}${theFilePath}`;
    const cmd = `curl -X${httpMethod} -vi ${args} ${url}`;

    console.log('the command: ');
    console.log(cmd);
    console.log();

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  });
}