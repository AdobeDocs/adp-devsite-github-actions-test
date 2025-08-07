const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const githubToken = process.env.GITHUB_TOKEN;

const fs = require('fs');

// List of file extensions to skip (images and binary files)
const SKIP_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', 
    '.mp4', '.webm', '.mov', '.mp3', '.wav',
    '.pdf', '.zip', '.tar', '.gz', '.json'
];

async function fetchMainBranchContent() {
    try {
        // Recursively get all files in src/pages directory
        const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/src/pages`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!contentsResponse.ok) {
            throw new Error(`GitHub API request failed: ${contentsResponse.status}`);
        }

        const contents = await contentsResponse.json();
        let allContent = '';

        // Process directories and files recursively
        async function processPath(path) {
            const pathResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `Bearer ${githubToken}`
                }
            });

            if (!pathResponse.ok) {
                throw new Error(`GitHub API request failed when fetching path ${path}: ${pathResponse.status}`);
            }

            const items = await pathResponse.json();

            for (const item of items) {
                // Skip if it's a binary/image file
                const fileExt = item.name.substring(item.name.lastIndexOf('.')).toLowerCase();
                if (SKIP_EXTENSIONS.includes(fileExt)) {
                    console.log(`Skipping binary/image file: ${item.path}`);
                    continue;
                }

                if (item.type === 'dir') {
                    // Recursively process subdirectories
                    await processPath(item.path);
                } else if (item.type === 'file' && !item.name.endsWith('config.md')) {
                    // Fetch content for files (excluding config.md)
                    const contentResponse = await fetch(item.download_url, {
                        headers: {
                            'Accept': 'application/vnd.github.v3.raw',
                            'Authorization': `Bearer ${githubToken}`
                        }
                    });

                    if (contentResponse.ok) {
                        const content = await contentResponse.text();
                        // skip files with components
                        if (content.includes("/>"))  continue;
                        allContent += `\n\n--- File: ${item.path} ---\n\n${content}`;
                    } else {
                        console.log(`Failed to fetch content for ${item.path}`);
                    }
                }
            }
        }

        // Start processing from src/pages
        await processPath('src/pages');

        if (allContent === '') {
            console.log('No matching files found in src/pages directory (excluding config.md)');
            allContent = 'No matching files found in src/pages directory (excluding config.md)';
        }

        // Write content to all_pages_content.txt
        try {
            fs.writeFileSync('all_pages_content.txt', allContent);
            console.log('Content successfully written to all_pages_content.txt');
        } catch (error) {
            console.error('Error writing to all_pages_content.txt:', error);
        }

    } catch (error) {
        console.error('Error fetching repository content:', error);
    }
}

fetchMainBranchContent();