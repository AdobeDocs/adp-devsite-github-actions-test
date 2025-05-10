module.exports = async ({ core, exec, changes, deletions, operation, deployEnv, branch, pathPrefix }) => {
  console.log('Inside deploy.js');

  console.log('exec: ');
  console.log(exec);

  console.log('changes: ');
  console.log(changes);

  console.log('deletions: ');
  console.log(deletions);

  console.log('operation: ');
  console.log(operation);

  console.log('deployEnv: ');
  console.log(deployEnv);

  console.log('branch: ');
  console.log(branch);

  console.log('pathPrefix: ');
  console.log(pathPrefix);

  // "https://admin.hlx.page/${OPERATION}/adobedocs/${site}/${code_repo_branch}/${path}"
  // exec('curl -s https://example.com', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.error(`stderr: ${stderr}`);
  // });

}