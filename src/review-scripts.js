const fs = require('fs');
const { hasMetadata } = require('./file-operation');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const prNumber = process.env.PR_ID;
const githubToken = process.env.GITHUB_TOKEN;

// GitHub API utilities
const githubApi = {
    headers: {
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${githubToken}`
    },
    
    async fetchWithAuth(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...this.headers,
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`GitHub API request failed: ${response.status} - ${errorBody}`);
        }

        return response;
    },

    getPrUrl() {
        return `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
    },

    getPrFilesUrl() {
        return `${this.getPrUrl()}/files`;
    },

    getReviewsUrl() {
        return `${this.getPrUrl()}/reviews`;
    }
};

// File content utilities
function readAiContent() {
    try {
        const aiContent = fs.readFileSync('ai_content.txt', 'utf8');
        
        // Split content by file markers
        const fileContents = aiContent.split(/--- File: (?=.*? ---)/);
        // Remove the first empty element if exists
        if (fileContents[0].trim() === '') {
            fileContents.shift();
        }

        const files = [];
        for (const fileContent of fileContents) {
            if (!fileContent.trim()) continue;

            // Extract file path and content
            const pathMatch = fileContent.match(/(.*?) ---\n([\s\S]*)/);
            if (!pathMatch) continue;

            const [, path, suggestion] = pathMatch;
            files.push({ path, suggestion: suggestion.trim() });
        }

        if (files.length === 0) {
            throw new Error('Could not extract any file content from ai_content.txt');
        }

        return files;
    } catch (error) {
        console.error('Error reading ai_content.txt:', error);
        process.exit(1);
    }
}

function findMetadataEnd(content) {
    const lines = content.split('\n');
    let dashCount = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            dashCount++;
            if (dashCount === 2) {
                return i + 1;
            }
        }
    }
    return 0;
}

// Review preparation
function prepareReviewComment(targetFile, content, suggestion) {
    const firstLine = content.split('\n')[0];
    const hasFileMetadata = hasMetadata(content);
    
    // if has metadata, replace it
    if (hasFileMetadata) {
        const metadataEnd = findMetadataEnd(content);
        return {
            path: targetFile.filename,
            start_line: 1,
            start_side: 'RIGHT',
            line: metadataEnd,
            side: 'RIGHT',
            body: `\`\`\`suggestion\n${suggestion}\n\`\`\``
        };
    }
    
    // if no metadata, add it to the first line
    return {
        path: targetFile.filename,
        line: 1,
        side: 'RIGHT',
        body: `\`\`\`suggestion\n${suggestion}\n${firstLine}\n\`\`\``
    };
}

async function createReview(comments) {
    const reviewData = {
        body: 'AI suggestions',
        event: 'COMMENT',
        comments: comments
    };

    const response = await githubApi.fetchWithAuth(
        githubApi.getReviewsUrl(),
        {
            method: 'POST',
            body: JSON.stringify(reviewData)
        }
    );

    const reviewResult = await response.json();
    return reviewResult;
}

async function reviewPR() {
    try {
        // Read AI content for all files
        const files = readAiContent();

        // Fetch PR data
        const prResponse = await githubApi.fetchWithAuth(githubApi.getPrUrl());
        const prData = await prResponse.json();
        console.log('PR found:', prData.title);

        // Fetch PR files
        const filesResponse = await githubApi.fetchWithAuth(githubApi.getPrFilesUrl());
        const filesData = await filesResponse.json();

        // Process each file and prepare comments
        const comments = [];
        for (const { path, suggestion } of files) {
            const targetFile = filesData.find(file => file.filename === path);

            if (!targetFile) {
                console.warn(`Target file ${path} not found in PR, skipping...`);
                continue;
            }

            // Fetch file content
            const contentResponse = await githubApi.fetchWithAuth(targetFile.raw_url);
            const content = await contentResponse.text();

            // Prepare comment for this file
            const comment = prepareReviewComment(targetFile, content, suggestion);
            comments.push(comment);
        }

        if (comments.length === 0) {
            throw new Error('No valid files to review');
        }

        // Create single review with all comments
        const reviewData = await createReview(comments);

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