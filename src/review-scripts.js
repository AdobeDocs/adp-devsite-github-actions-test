const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

// FIXME: hard coded, should update
const prNumber = 42;
const path = "pages/ai-test/app-builder-index.md";
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
                        path: path,
                        body: `suggestion: Add this metadata block at the very front of the document:\n\n\`\`\`yaml\n${suggestion}\n\`\`\`\n\nThis will improve the document's discoverability and provide better context for readers.`,
                        line: 1,
                        side: 'RIGHT'
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