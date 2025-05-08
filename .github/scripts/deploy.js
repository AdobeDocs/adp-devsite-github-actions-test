module.exports = async ({ core, changes, isStage, isProd }) => {
  core.debug('Inside deploy.js');

  core.debug('changes: ');
  core.debug(changes);

  core.debug('isStage: ');
  core.debug(isStage.toLowerCase() === 'true');

  core.debug('isProd: ');
  core.debug(isProd.toLowerCase() === 'true');
}