const fs = require('fs');
const path = require('path');

function getMarkdownFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }

  return results;
}

function checkLocalLinks() {
  const markdownFiles = getMarkdownFiles('./src/pages');
  const linkRegex = /\[.*?\]\((\/[^\)]+)\)/g;
  let broken = false;

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const url = match[1];
      if (/^(http|https|mailto):/.test(url)) continue;

      const localPath = path.join('.', url.slice(1));
      if (!fs.existsSync(localPath)) {
        console.error(`warning: ${file}: Link to "${url}" not found as "${localPath}"`);
        broken = true;
      }
    }
  }

  if (broken) {
    process.exit(1);
  } else {
    console.log('✅ All local links are valid.');
  }
}

checkLocalLinks();
