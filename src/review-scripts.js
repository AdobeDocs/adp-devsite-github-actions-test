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

        // Create a review with a comment suggestion
        const reviewResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`, {
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
                        position: 0,
                        body: `\`\`\`suggestion\n${suggestion}\n\`\`\`\n`
                    }
                ]
            })
        });

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