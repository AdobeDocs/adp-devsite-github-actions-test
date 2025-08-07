const fs = require('fs');
const path = require('path');

// Custom markdown linting implementation
function customLintMarkdown() {
  console.log('🔧 Running custom markdown linting...');
  const errors = [];
  const warnings = [];
  
  // Find all markdown files
  const markdownFiles = [];
  function findMarkdownFiles(dir) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
          findMarkdownFiles(filePath);
        } else if (file.endsWith('.md')) {
          markdownFiles.push(filePath);
        }
      }
    } catch (err) {
      // Skip directories we can't read
    }
  }
  
  findMarkdownFiles('.');
  console.log(`📁 Found ${markdownFiles.length} markdown files to lint`);
  
  for (const file of markdownFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      // Check for trailing spaces (MD009)
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].endsWith(' ')) {
          errors.push(`MD009: ${file}:${i + 1}: Trailing spaces`);
        }
      }
      
      // Check for multiple blank lines (MD012)
      let blankLineCount = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          blankLineCount++;
          if (blankLineCount > 1) {
            errors.push(`MD012: ${file}:${i + 1}: Multiple blank lines`);
          }
        } else {
          blankLineCount = 0;
        }
      }
      
      // Check for first line heading (MD041) - but be more lenient
      if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine && !firstLine.startsWith('#') && !firstLine.startsWith('---') && !firstLine.startsWith('<!DOCTYPE')) {
          // Only flag if it's not a frontmatter start
          if (!firstLine.startsWith('---')) {
            errors.push(`MD041: ${file}:1: First line should be a heading or frontmatter`);
          }
        }
      }
      
    } catch (err) {
      console.log(`⚠️ Could not read file ${file}:`, err.message);
    }
  }
  
  return { errors, warnings };
}

try {
  console.log('🔍 Running markdown linting...');
  console.log('📦 Current directory:', process.cwd());
  console.log('🔧 Node version:', process.version);
  
  // Check if we're in a GitHub Actions environment
  if (process.env.GITHUB_ACTIONS) {
    console.log('🏗️ Running in GitHub Actions environment');
  }
  
  // Use custom linting implementation
  const customResult = customLintMarkdown();
  
  console.log('📋 Lint output:');
  if (customResult.errors.length > 0) {
    console.log('❌ Critical errors found:');
    customResult.errors.forEach(error => console.log(error));
  }
  
  if (customResult.warnings.length > 0) {
    console.log('⚠️ Warnings found:');
    customResult.warnings.forEach(warning => console.log(warning));
  }
  
  // Check if there are any critical errors
  if (customResult.errors.length > 0) {
    console.log('❌ Found critical errors - PR validation failed');
    console.log(`Total critical errors: ${customResult.errors.length}`);
    process.exit(1);
  }
  
  if (customResult.warnings.length > 0) {
    console.log('⚠️ Found style warnings (these won\'t fail the PR):');
    console.log(`Total warnings: ${customResult.warnings.length}`);
  }
  
  console.log('✅ Linting completed successfully');
} catch (error) {
  console.log('❌ Linting failed:', error.message);
  console.log('Error details:', error);
  process.exit(1);
} 