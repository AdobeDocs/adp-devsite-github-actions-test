module.exports = async ({ core, changes, isStage, isProd }) => {
  console.log('Inside deploy.js');

  console.log('changes: ');
  console.log(changes);

  console.log('isStage: ');
  console.log(isStage.toLowerCase() === 'true');

  console.log('isProd: ');
  console.log(isProd.toLowerCase() === 'true');
}