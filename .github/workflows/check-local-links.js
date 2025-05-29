const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT_DIR = '/src/pages/'

const MD_GLOB = '**/*.md';

const LINK_REGEX = /\[.*?\]\((\/[^\)]+)\)/g;

function checkLocalLinks() {
  let brokenLinksFound = false;

  const files = glob.sync(MD_GLOB, { nodir: true });

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    let match;

    while ((match = LINK_REGEX.exec(content)) !== null) {
      const url = match[1]; // e.g., /developer-console/abc/

      if (/^(http|https|mailto):/.test(url)) continue;

      const localPath = path.join(ROOT_DIR, url.substring(1));

      if (!fs.existsSync(localPath)) {
        console.error(
          `Broken local link in file "${file}": "${url}" does not exist as "${localPath}"`
        );
        brokenLinksFound = true;
      }
    }
  });

  if (brokenLinksFound) {
    console.error('\n Some local links are broken.');
    process.exit(1);
  } else {
    console.log(' All local links are valid.');
  }
}

// Run the check
checkLocalLinks();
