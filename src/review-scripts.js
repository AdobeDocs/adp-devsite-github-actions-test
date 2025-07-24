const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

// FIXME: hard coded, should update
const prNumber = 42;
const path = "src/pages/ai-test/app-builder-index.md";
const suggestion = `---
	title: Getting Started with App Builder
	description: This document provides comprehensive introductory guides for new users to begin working with App Builder and Adobe I/O Runtime. It covers setting up the development environment, creating applications, publishing, troubleshooting, and delves into serverless development fundamentals, deployment, and best practices.
	keywords:
	- App Builder
	- Getting Started
	- Adobe I/O Runtime
	- Development Environment
	- Serverless Deployment
	---`;
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
                        position: targetFile.patch.split('\n').length - 1,
                        body: `suggestion: Add this metadata block at the very front of the document:\n\n\`\`\`yaml\n${suggestion}\n\`\`\`\n\nThis will improve the document's discoverability and provide better context for readers.`
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