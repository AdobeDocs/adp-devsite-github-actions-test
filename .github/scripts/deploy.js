module.exports = async ({ core, exec, changes, deletions, isStage, isProd }) => {
  console.log('Inside deploy.js');

  console.log('exec: ');
  console.log(exec);

  console.log('changes: ');
  console.log(changes);

  console.log('deletions: ');
  console.log(deletions);

  console.log('isStage: ');
  console.log(isStage.toLowerCase() === 'true');

  console.log('isProd: ');
  console.log(isProd.toLowerCase() === 'true');

  // "https://admin.hlx.page/${OPERATION}/adobedocs/${site}/${code_repo_branch}/${path}"

}