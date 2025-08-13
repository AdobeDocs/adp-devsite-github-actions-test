#!/usr/bin/env node

import fs from 'node:fs';
import path from 'path';

// Get all markdown files
function getMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Check for multiple h1 headings (returns warnings, not errors)
function checkMultipleH1(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const h1Headings = [];
  let inCodeBlock = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue; // Skip the code block delimiter lines
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check if line starts with # followed by space (h1 heading)
    if (trimmedLine.match(/^#\s+/)) {
      const headingText = trimmedLine.replace(/^#\s+/, '').trim();
      h1Headings.push({
        lineNumber,
        text: headingText
      });
    }
  }

  // If there are multiple h1 headings, report them as warnings
  if (h1Headings.length > 1) {
    const warnings = [];
    for (let i = 1; i < h1Headings.length; i++) {
      const heading = h1Headings[i];
      warnings.push(`Line ${heading.lineNumber}: custom-multiple-h1 - Multiple h1 headings found. This is the ${i + 1}nd h1 heading: "${heading.text}"`);
    }
    return { warnings, errors: [] };
  }

  return { warnings: [], errors: [] }; // No violations
}

// Check for angle bracket links
function checkAngleBracketLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check for links enclosed with <> instead of []
    const angleBracketLinks = trimmedLine.match(/<([^>]+)>/g);
    if (angleBracketLinks) {
      for (const link of angleBracketLinks) {
        // Extract the content inside the brackets
        const content = link.replace(/^<|>$/g, '');

        // Check if it's a URL (starts with http, https, www, or mailto)
        if (content.match(/^(https?:\/\/|www\.|mailto:)/)) {
          errors.push(`Line ${lineNumber}: custom-link-brackets - Link "${link}" uses angle brackets <>. Consider using square brackets [] instead for better markdown compatibility.`);
        }
      }
    }
  }

  return { warnings: [], errors };
}

// Check for HTML tags that should be avoided in markdown
function checkHtmlTags(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  let inCodeBlock = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue; // Skip the code block delimiter lines
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for HTML tags that should be avoided
    const htmlTags = trimmedLine.match(/<(\/?[a-zA-Z][a-zA-Z0-9]*)(?:\s+[^>]*)?\/?>/g);
    if (htmlTags) {
      for (const tag of htmlTags) {
        // Skip if this tag is within inline code backticks
        const tagIndex = trimmedLine.indexOf(tag);
        if (tagIndex !== -1) {
          // Check if there are unescaped backticks before this tag
          const beforeTag = trimmedLine.substring(0, tagIndex);
          const backtickCount = (beforeTag.match(/`/g) || []).length;
          if (backtickCount % 2 === 1) {
            // Odd number of backticks before tag means we're inside inline code
            continue;
          }
        }

        // Extract just the tag name (first word after < or </)
        const tagMatch = tag.match(/<\/([a-zA-Z][a-zA-Z0-9]*)|<([a-zA-Z][a-zA-Z0-9]*)/);
        if (tagMatch) {
          const tagName = (tagMatch[1] || tagMatch[2]).toLowerCase();
          const allowedTags = ['a', 'img', 'video', 'audio', 'br', 'iframe', 'script', 'style', 'herosimple', 'resources', 'inlinealert', 'hr', 'getcredential', 'discoverblock', 'announcement', 'carousel', 'summary', 'infocard', 'embed', 'redoclyapiblock', 'codeblock', 'list', 'horizontalline', 'tab', 'columns', 'details'];

          if (!allowedTags.includes(tagName)) {
            errors.push(`Line ${lineNumber}: custom-html-tags - HTML tag "${tag}" should be avoided in markdown. Use markdown syntax instead.`);
          }
        }
      }
    }
  }

  return { warnings: [], errors };
}

// Check for custom components that aren't self-closing
function checkCustomComponentSelfClosing(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  let inCodeBlock = false;

  // Custom components that must be self-closing
  const customComponents = ['herosimple', 'resources', 'inlinealert', 'getcredential', 'discoverblock', 'announcement', 'carousel', 'summary', 'infocard', 'embed', 'redoclyapiblock', 'codeblock', 'list', 'horizontalline', 'tab', 'columns', 'details'];

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue; // Skip the code block delimiter lines
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Look for opening tags of custom components
    for (const component of customComponents) {
      const openingTagRegex = new RegExp(`<${component}(?:\\s+[^>]*)?>`, 'gi');
      const closingTagRegex = new RegExp(`</${component}>`, 'gi');

      // Check if this line contains an opening tag
      if (openingTagRegex.test(trimmedLine)) {
        // Look ahead to see if there's a corresponding closing tag
        let hasClosingTag = false;
        let inComponent = false;

        for (let lookAheadLine = lineNumber; lookAheadLine <= lines.length; lookAheadLine++) {
          const lookAheadContent = lines[lookAheadLine - 1];

          // Check if we're entering/exiting code blocks
          if (lookAheadContent.trim().startsWith('```')) {
            continue;
          }

          // Check for closing tag
          if (closingTagRegex.test(lookAheadContent)) {
            hasClosingTag = true;
            break;
          }

          // Check for another opening tag of the same component (nested)
          if (openingTagRegex.test(lookAheadContent) && lookAheadLine !== lineNumber) {
            break;
          }
        }

        if (hasClosingTag) {
          errors.push(`Line ${lineNumber}: custom-component-self-closing - Custom component "${component}" should be self-closing (use <${component} /> instead of <${component}>...</${component}>).`);
        }
      }
    }
  }

  return { warnings: [], errors };
}

// Check for images and videos with proper alt text (returns warnings, not errors)
function checkMediaAltText(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const warnings = [];
  let inCodeBlock = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue; // Skip the code block delimiter lines
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for img tags
    const imgTags = trimmedLine.match(/<img[^>]*>/gi);
    if (imgTags) {
      for (const imgTag of imgTags) {
        // Check if alt attribute exists
        const altMatch = imgTag.match(/alt\s*=\s*["']([^"']*)["']/i);
        if (!altMatch) {
          warnings.push(`Line ${lineNumber}: custom-media-alt-text - Image tag missing alt text: ${imgTag.trim()}`);
        } else {
          // Check alt text length and content
          const altText = altMatch[1];
          if (altText.length === 0) {
            warnings.push(`Line ${lineNumber}: custom-media-alt-text - Image tag has empty alt text: ${imgTag.trim()}`);
          } else if (altText.length > 100) {
            warnings.push(`Line ${lineNumber}: custom-media-alt-text - Image alt text exceeds 100 characters (${altText.length} chars): "${altText}"`);
          }
        }
      }
    }

    // Check for video tags
    const videoTags = trimmedLine.match(/<video[^>]*>/gi);
    if (videoTags) {
      for (const videoTag of videoTags) {
        // Check if alt attribute exists
        const altMatch = videoTag.match(/alt\s*=\s*["']([^"']*)["']/i);
        if (!altMatch) {
          warnings.push(`Line ${lineNumber}: custom-media-alt-text - Video tag missing alt text: ${videoTag.trim()}`);
        } else {
          // Check alt text length and content
          const altText = altMatch[1];
          if (altText.length === 0) {
            warnings.push(`Line ${lineNumber}: custom-media-alt-text - Video tag has empty alt text: ${videoTag.trim()}`);
          } else if (altText.length > 100) {
            warnings.push(`Line ${lineNumber}: custom-media-alt-text - Video alt text exceeds 100 characters (${altText.length} chars): "${altText}"`);
          }
        }
      }
    }
  }

  return { warnings, errors: [] };
}

// Check for problematic filename characters (returns errors)
function checkFilenameCharacters(filePath) {
  const filename = path.basename(filePath);
  const errors = [];

  // Check for underscores
  if (filename.includes('_')) {
    errors.push(`custom-filename-characters - Filename "${filename}" contains underscore (_). Use hyphens (-) instead.`);
  }

  // Check for dots (except the .md extension)
  const nameWithoutExtension = filename.replace(/\.md$/, '');
  if (nameWithoutExtension.includes('.')) {
    errors.push(`custom-filename-characters - Filename "${filename}" contains dots (.) in the name. Use hyphens (-) instead.`);
  }

  return { warnings: [], errors };
}

// Check for nested components and complex content within table cells (returns errors)
function checkTableContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  let inTable = false;
  let tableStartLine = -1;
  let inCodeBlock = false;
  let tableLines = [];

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      // If we're starting a code block and we're in a table, the table has ended
      if (inCodeBlock && inTable) {
        analyzeTableStructure(tableLines, errors);
        inTable = false;
        tableStartLine = -1;
        tableLines = [];
      }
      continue;
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for table boundaries - look for lines that start and end with |
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableStartLine = lineNumber;
        tableLines = [];
      }
      tableLines.push({ lineNumber, content: trimmedLine });
      continue;
    }

    // Check for table separator row (contains only |, -, :, and spaces)
    if (inTable && /^[\s|\-:]+$/.test(trimmedLine)) {
      tableLines.push({ lineNumber, content: trimmedLine });
      continue;
    }

    // Exit table mode if we hit a clear non-table boundary
    if (inTable && trimmedLine.startsWith('#')) {
      // Analyze the table we just finished
      analyzeTableStructure(tableLines, errors);
      inTable = false;
      tableStartLine = -1;
      tableLines = [];
      continue;
    }

    // If we're in a table, check if this line breaks table structure
    if (inTable) {
      // If this line doesn't start with | and isn't empty, the table has ended
      if (!trimmedLine.startsWith('|') && trimmedLine !== '') {
        // This line is not part of the table - analyze the table and exit table mode
        analyzeTableStructure(tableLines, errors);
        inTable = false;
        tableStartLine = -1;
        tableLines = [];
        continue;
      }

      // If this line starts with |, it's a valid table row
      if (trimmedLine.startsWith('|')) {
        tableLines.push({ lineNumber, content: trimmedLine });
      }
      // Empty lines within tables are allowed and don't need to be added to tableLines
    }
  }

  // Don't forget to analyze the last table if we're still in one
  if (inTable && tableLines.length > 0) {
    analyzeTableStructure(tableLines, errors);
  }

  return { warnings: [], errors };
}

// Helper function to analyze table structure for violations
function analyzeTableStructure(tableLines, errors) {
  if (tableLines.length < 2) return; // Need at least header and separator

  for (let i = 0; i < tableLines.length; i++) {
    const { lineNumber, content } = tableLines[i];

    // Skip separator rows
    if (/^[\s|\-:]+$/.test(content)) {
      continue;
    }

    // Check for code block markers
    if (content.includes('```')) {
      errors.push(`Line ${lineNumber}: custom-table-content - Code blocks cannot be contained within tables. Move code blocks outside the table.`);
      return;
    }

    // Check for HTML tags
    if (content.includes('<') && content.includes('>')) {
      errors.push(`Line ${lineNumber}: custom-table-content - HTML tags cannot be contained within tables. Move HTML content outside the table.`);
      return;
    }

    // Check for actual JSON-like content (curly braces, quotes, colons) - but be more specific
    // Only flag if it looks like actual JSON/object syntax, not descriptive text
    if ((content.includes('{') && content.includes('}')) ||
        (content.includes('"') && (content.includes('{') || content.includes('}')))) {
      errors.push(`Line ${lineNumber}: custom-table-content - Code-like content (JSON, objects) cannot be contained within tables. Move this content outside the table.`);
      return;
    }

    // Check for multi-line content indicators
    if (content.includes('Model:') || content.includes('NamespaceDTO') ||
        content.includes('description:')) {
      errors.push(`Line ${lineNumber}: custom-table-content - Multi-line content indicators cannot be contained within tables. Move this content outside the table.`);
      return;
    }

    // Check if this line is supposed to be a table row but doesn't have proper structure
    if (content.includes('|')) {
      // This should be a table row - check if it has proper cell structure
      const cells = content.split('|').filter(cell => cell.trim() !== '');
      if (cells.length < 2) {
        errors.push(`Line ${lineNumber}: custom-table-content - Malformed table row. Table rows must have at least 2 cells separated by pipes.`);
        return;
      }
    } else if (content !== '') {
      // This line is not empty and doesn't have pipes - it's breaking table structure
      errors.push(`Line ${lineNumber}: custom-table-content - Table content must be properly formatted with pipe separators. This line breaks table structure: "${content}"`);
      return;
    }
  }
}

// Check for consistent table column counts (returns errors)
function checkTableColumnCount(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  let inTable = false;
  let tableStartLine = -1;
  let expectedColumns = 0;
  let inCodeBlock = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for table boundaries - look for lines that start and end with |
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableStartLine = lineNumber;
        // Count columns in the first row
        expectedColumns = (trimmedLine.match(/\|/g) || []).length - 1;
      } else {
        // Check if this row has the same number of columns
        const currentColumns = (trimmedLine.match(/\|/g) || []).length - 1;
        if (currentColumns !== expectedColumns) {
          errors.push(`Line ${lineNumber}: custom-table-columns - Table row has ${currentColumns} columns, expected ${expectedColumns}. All table rows must have the same number of columns.`);
        }
      }
      continue;
    }

    // Check for table separator row (contains only |, -, :, and spaces)
    if (inTable && /^[\s|\-:]+$/.test(trimmedLine)) {
      continue;
    }

    // If we're in a table and encounter a line that doesn't start with |
    if (inTable && !trimmedLine.startsWith('|') && trimmedLine !== '') {
      // Only exit table if we hit an empty line or a heading (##)
      if (trimmedLine === '' || trimmedLine.startsWith('##')) {
        inTable = false;
        tableStartLine = -1;
        expectedColumns = 0;
      }
    }
  }

  return { warnings: [], errors };
}

// Check for required frontmatter metadata (returns warnings, not errors)
function checkFrontmatterMetadata(filePath) {
  // Skip config.md file
  if (filePath.includes('config.md')) {
    return { warnings: [], errors: [] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let warnings = [];

  // Check if file starts with frontmatter
  const hasFrontmatterStart = lines.length > 0 && lines[0].trim().startsWith('---');

  if (!hasFrontmatterStart) {
    // If no frontmatter at all, just report that one issue
    warnings.push(`Line 1: custom-frontmatter - File must start with frontmatter (---)`);
    return { warnings, errors: [] };
  }

  let inFrontmatter = false;
  let frontmatterEndLine = -1;
  let hasKeywords = false;
  let hasTitle = false;
  let hasDescription = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check for frontmatter boundaries
    if (trimmedLine === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        inFrontmatter = false;
        frontmatterEndLine = lineNumber;
        break;
      }
      continue;
    }

    if (!inFrontmatter) {
      continue;
    }

    // Check for required metadata fields
    if (trimmedLine.startsWith('keywords:')) {
      hasKeywords = true;
    } else if (trimmedLine.startsWith('title:')) {
      hasTitle = true;
    } else if (trimmedLine.startsWith('description:')) {
      hasDescription = true;
    }
  }

  // Check if frontmatter was properly closed
  if (frontmatterEndLine === -1) {
    warnings.push(`Line ${lines.length}: custom-frontmatter - Frontmatter not properly closed with ---`);
    // If frontmatter isn't closed, still check what fields we found
    if (!hasKeywords) {
      warnings.push(`Line 1: custom-frontmatter - Missing required 'keywords' field in frontmatter`);
    }
    if (!hasTitle) {
      warnings.push(`Line 1: custom-frontmatter - Missing required 'title' field in frontmatter`);
    }
    if (!hasDescription) {
      warnings.push(`Line 1: custom-frontmatter - Missing required 'description' field in frontmatter`);
    }
    return { warnings, errors: [] };
  }

  // Check for missing fields in complete frontmatter
  if (!hasKeywords) {
    warnings.push(`Line 1: custom-frontmatter - Missing required 'keywords' field in frontmatter`);
  }
  if (!hasTitle) {
    warnings.push(`Line 1: custom-frontmatter - Missing required 'title' field in frontmatter`);
  }
  if (!hasDescription) {
    warnings.push(`Line 1: custom-frontmatter - Missing required 'description' field in frontmatter`);
  }

  return { warnings, errors: [] };
}

// Check for HTML comments in markdown (returns errors)
function checkHtmlComments(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  let inCodeBlock = false;

  for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
    const line = lines[lineNumber - 1];
    const trimmedLine = line.trim();

    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Skip lines within code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for HTML comments
    if (trimmedLine.includes('<!--') || trimmedLine.includes('-->')) {
      errors.push(`Line ${lineNumber}: custom-html-comments - HTML comments (<!-- -->) should not be used in markdown. Use markdown syntax instead.`);
    }
  }

  return { warnings: [], errors };
}

// Run custom lint
function runCustomLint() {
  const markdownFiles = getMarkdownFiles('./src/pages');

  console.log(`Linting ${markdownFiles.length} markdown files for multiple h1 headings, angle bracket links, HTML tags, custom component self-closing, media alt text, frontmatter metadata, filename characters, table content, table column consistency, and HTML comments...`);

  let allWarnings = [];
  let allErrors = [];

  for (const file of markdownFiles) {
    const relativePath = file.replace('./src/pages/', '');

    // Run all checks
    const h1Result = checkMultipleH1(file);
    const linkResult = checkAngleBracketLinks(file);
    const htmlResult = checkHtmlTags(file);
    const componentResult = checkCustomComponentSelfClosing(file);
    const mediaResult = checkMediaAltText(file);
    const frontmatterResult = checkFrontmatterMetadata(file);
    const filenameResult = checkFilenameCharacters(file);
    const tableContentResult = checkTableContent(file); // Add new check
    const tableColumnCountResult = checkTableColumnCount(file); // Add new check
    const htmlCommentsResult = checkHtmlComments(file); // Add new check

    // Collect warnings and errors
    const fileWarnings = [];
    const fileErrors = [];

    // Add warnings and errors from each check
    fileWarnings.push(...h1Result.warnings);
    fileWarnings.push(...linkResult.warnings);
    fileWarnings.push(...htmlResult.warnings);
    fileWarnings.push(...componentResult.warnings);
    fileWarnings.push(...mediaResult.warnings);
    fileWarnings.push(...frontmatterResult.warnings);
    fileWarnings.push(...filenameResult.warnings);
    fileWarnings.push(...tableContentResult.warnings); // Add new check warnings
    fileWarnings.push(...tableColumnCountResult.warnings); // Add new check warnings
    fileWarnings.push(...htmlCommentsResult.warnings); // Add new check warnings

    fileErrors.push(...h1Result.errors);
    fileErrors.push(...linkResult.errors);
    fileErrors.push(...htmlResult.errors);
    fileErrors.push(...componentResult.errors);
    fileErrors.push(...mediaResult.errors);
    fileErrors.push(...frontmatterResult.errors);
    fileErrors.push(...filenameResult.errors);
    fileErrors.push(...tableContentResult.errors); // Add new check errors
    fileErrors.push(...tableColumnCountResult.errors); // Add new check errors
    fileErrors.push(...htmlCommentsResult.errors); // Add new check errors

    // Display results for this file
    if (fileWarnings.length > 0 || fileErrors.length > 0) {
      console.log(`\n${relativePath}:`);

      // Display warnings
      for (const warning of fileWarnings) {
        console.log(`  ⚠️  WARNING: ${warning}`);
      }

      // Display errors
      for (const error of fileErrors) {
        console.log(`  ❌ ERROR: ${error}`);
      }
    }

    // Collect all warnings and errors
    allWarnings.push(...fileWarnings);
    allErrors.push(...fileErrors);
  }

  // Summary
  if (allWarnings.length === 0 && allErrors.length === 0) {
    console.log("\n✅ No violations found.");
  } else {
    console.log(`\n📊 Summary:`);
    console.log(`  Warnings: ${allWarnings.length}`);
    console.log(`  Errors: ${allErrors.length}`);

    if (allWarnings.length > 0) {
      console.log(`\n⚠️  Total Warnings: ${allWarnings.length}`);
    }

    if (allErrors.length > 0) {
      console.log(`\n❌ Total Errors: ${allErrors.length}`);
    }
  }

  // Exit with error code only if there are actual errors (not warnings)
  if (allErrors.length > 0) {
    console.log(`\n🚫 Linting failed with ${allErrors.length} error(s). Please fix these issues.`);
    process.exit(1);
  } else if (allWarnings.length > 0) {
    console.log(`\n⚠️  Linting completed with ${allWarnings.length} warning(s). These are recommendations but won't block deployment.`);
  } else {
    console.log(`\n✅ Linting passed successfully!`);
  }
}

runCustomLint();
