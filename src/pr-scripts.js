const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";
const fs = require('fs');
const fetch = require('node-fetch');
// const path = require('path');
const { generateKeywords } = require('./keywords-scripts');

const prNumber = process.env.PR_ID;

async function fetchPRInformation() {
    try {
        // fetch PR data
        const prResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!prResponse.ok) {
            throw new Error(`GitHub API request failed: ${prResponse.status}`);
        }

        // fetch the files changed in this PR
        const filesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!filesResponse.ok) {
            throw new Error(`GitHub API request failed when fetching files: ${filesResponse.status}`);
        }
        const filesData = await filesResponse.json();
        
        // Filter files in src/pages directory and exclude config.md
        const pagesFiles = filesData.filter(file => 
            file.filename.startsWith('src/pages/') && 
            !file.filename.endsWith('config.md')
        );
        
        let allContent = '';
        
        for (const file of pagesFiles) {
            const contentResponse = await fetch(file.raw_url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            
            if (contentResponse.ok) {
                const content = await contentResponse.text();
                allContent += `\n\n--- File: ${file.filename} ---\n\n${content}`;
            } else {
                console.log(`Failed to fetch content for ${file.filename}`);
            }
        }
        
        if (pagesFiles.length === 0) {
            console.log('No matching files found in src/pages directory (excluding config.md)');
            allContent = 'No matching files found in src/pages directory (excluding config.md)';
        }

        // Write content to a file that GitHub Actions can read
        // const outputPath = path.join(process.cwd(), 'pr_content.txt');
        // fs.writeFileSync(outputPath, allContent);
        // console.log(`Content written to: ${outputPath}`);

        // Generate keywords using the content
        const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const openAIAPIKey = process.env.AZURE_OPENAI_API_KEY;
        const keywords = await generateKeywords(openAIEndpoint, openAIAPIKey, allContent);
        console.log('Generated Keywords:', keywords);

    } catch (error) {
        console.error('Error fetching PR information:', error);
    }
}

// Call the function
fetchPRInformation();