const { execSync } = require('child_process');

try {
  console.log('🔍 Running markdown linting...');
  
  // Run linting and capture output
  const lintOutput = execSync('yarn lint 2>&1', { encoding: 'utf8' });
  
  console.log('📋 Lint output:');
  console.log(lintOutput);
  
  // Check if there are any critical errors (MD009, MD012, MD013, MD041)
  const criticalErrors = lintOutput.match(/MD009|MD012|MD013|MD041/g);
  if (criticalErrors && criticalErrors.length > 0) {
    console.log('❌ Found critical errors - PR validation failed');
    console.log('Critical errors found:', criticalErrors);
    process.exit(1);
  }
  
  // Check for warning-level violations (MD025, MD024, MD026)
  const warnings = lintOutput.match(/MD025|MD024|MD026/g);
  if (warnings && warnings.length > 0) {
    console.log('⚠️ Found style warnings (these won\'t fail the PR):');
    console.log('Warnings found:', warnings);
  }
  
  console.log('✅ Linting completed successfully');
} catch (error) {
  console.log('❌ Linting failed:', error.message);
  console.log('Error details:', error);
  process.exit(1);
} 