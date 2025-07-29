const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const fs = require('fs');

const prNumber = process.env.PR_ID;

let path;
let suggestion;
try {
    const aiContent = fs.readFileSync('ai_content.txt', 'utf8');
    const pathMatch = aiContent.match(/--- File: (.*?) ---\n/);
    path = pathMatch ? pathMatch[1] : '';
    suggestion = aiContent.replace(/--- File: .*? ---\n/, '');
    
    if (!path) {
        throw new Error('Could not extract file path from ai_content.txt');
    }
} catch (error) {
    console.error('Error reading ai_content.txt:', error);
    process.exit(1);
}

const githubToken = process.env.GITHUB_TOKEN;

function hasMetadata(content) {
    return content.split('---').length >= 2;
}

async function reviewPR() {
    try {
        const prResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!prResponse.ok) {
            throw new Error(`GitHub API request failed: ${prResponse.status}`);
        }

        const prData = await prResponse.json();
        console.log('PR found:', prData.title);

        // Fetch PR files to get the correct position information
        const filesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!filesResponse.ok) {
            throw new Error(`GitHub API request failed when fetching files: ${filesResponse.status}`);
        }

        const filesData = await filesResponse.json();
        const targetFile = filesData.find(file => file.filename === path);

        if (!targetFile) {
            throw new Error(`Target file ${path} not found in PR`);
        }

        // Fetch the original file content, and get the first line
        const contentResponse = await fetch(targetFile.raw_url, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!contentResponse.ok) {
            throw new Error(`Failed to fetch file content: ${contentResponse.status}`);
        }

        const content = await contentResponse.text();
        const firstLine = content.split('\n')[0];

        let reviewBody;
        let reviewResponse;
        if (hasMetadata(content)) {
            // If metadata exists, replace it
            const metadataStart = content.indexOf('---');
            const metadataEnd = content.indexOf('---', metadataStart + 3) + 3;
            const metadataLines = content.slice(0, metadataEnd).split('\n').length;
            const contentLines = content.split('\n');
            const startLine = contentLines.findIndex(line => line.trim() === '---') + 1;
            const endLine = startLine + metadataLines - 1;

            // Set the review body with the suggestion
            reviewBody = `\`\`\`suggestion\n${suggestion}\n\`\`\``;

            // Create a review with a comment suggestion targeting the metadata section
            reviewResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${githubToken}`
                },
                body: JSON.stringify({
                    body: `AI suggestion`,
                    event: 'COMMENT',
                    comments: [
                        {
                            path: targetFile.filename,
                            start_line: startLine - 1,
                            line: endLine,
                            start_side: 'RIGHT',
                            side: 'RIGHT',
                            body: reviewBody
                        }
                    ]
                })
            });
        } else {
            // If no metadata, insert at the beginning
            reviewBody = `\`\`\`suggestion\n${suggestion}\n${firstLine}\n\`\`\`\n`;
            
            // Create a review with a comment suggestion
            reviewResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${githubToken}`
                },
                body: JSON.stringify({
                    body: `AI suggestion`,
                    event: 'COMMENT',
                    comments: [
                        {
                            path: targetFile.filename,
                            line: 1,
                            side: 'RIGHT',
                            body: reviewBody
                        }
                    ]
                })
            });
        }

        if (!reviewResponse.ok) {
            const errorBody = await reviewResponse.text();
            throw new Error(`Review creation failed: ${reviewResponse.status} - ${errorBody}`);
        }

        const reviewData = await reviewResponse.json();
        console.log('Review created successfully:', {
            id: reviewData.id,
            state: reviewData.state,
            html_url: reviewData.html_url
        });

    } catch (error) {
        console.error('Error in reviewPR:', error.message);
    }
}

reviewPR();