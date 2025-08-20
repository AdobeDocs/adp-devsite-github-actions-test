const fs = require('fs');
const { hasMetadata } = require('./file-operation');
const matter = require('gray-matter');
const { getFileContentByContentURL, getFilesInPR, createReview } = require('./github-api');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const prNumber = process.env.PR_ID;

// File content utilities
function readAiContent() {
    try {
        const aiContent = fs.readFileSync('ai_content.txt', 'utf8');
        
        // Split content by file markers using a simpler approach
        const fileContents = aiContent.split(/--- File: /);
        // Remove the first empty element if exists
        if (fileContents[0].trim() === '') {
            fileContents.shift();
        }

        const files = [];
        for (const fileContent of fileContents) {
            if (!fileContent.trim()) continue;

            // Extract file path and content - the format is "path ---\ncontent"
            const pathMatch = fileContent.match(/^(.+?) ---\n([\s\S]*)$/);
            if (!pathMatch) {
                console.warn('Could not parse file content:', fileContent.substring(0, 100));
                continue;
            }

            const [, path, suggestion] = pathMatch;
            files.push({ path: path.trim(), suggestion: suggestion.trim() });
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
                return i + 1; // Line after the closing ---
            }
        }
    }
    return 0;
}

// Prepare the body of review comment
// DOCS: https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#create-a-review-for-a-pull-request
function prepareReviewComment(targetFile, content, suggestion) {
    const hasFileMetadata = hasMetadata(content);
    
    // The suggestion should be clean frontmatter now (no file headers after parsing fix)
    const cleanSuggestion = suggestion.trim();
    
    // if has metadata, replace it
    if (hasFileMetadata) {
        const metadataEnd = findMetadataEnd(content);
        if (metadataEnd > 0) {
            return {
                path: targetFile.filename,
                start_line: 1,
                start_side: 'RIGHT',
                line: metadataEnd,
                side: 'RIGHT',
                body: `\`\`\`suggestion\n${cleanSuggestion}\n\`\`\``
            };
        }
    }
    
    // if no metadata, add it to the first line (replace, don't append)
    const firstLine = content.split('\n')[0] || '';
    return {
        path: targetFile.filename,
        line: 1,
        side: 'RIGHT',
        body: `\`\`\`suggestion\n${cleanSuggestion}\n${firstLine}\n\`\`\``
    };
}


async function reviewPR() {
    try {
        // Read AI content for all files
        const files = readAiContent();
        console.log(`Found ${files.length} files to process`);

        const PRFiles = await getFilesInPR(owner, repo, prNumber);
        console.log(`Found ${PRFiles.length} files in PR`);

        // Process each file and prepare comments
        const comments = [];
        for (const { path, suggestion } of files) {
            console.log(`Processing file: ${path}`);
            
            const targetFile = PRFiles.find(file => file.filename === path);
            if (!targetFile) {
                console.warn(`Target file ${path} not found in PR, skipping...`);
                continue;
            }

            // Only process files that were actually added or modified in the PR
            if (targetFile.status === 'removed') {
                console.warn(`File ${path} was removed, skipping review...`);
                continue;
            }

            const content = await getFileContentByContentURL(targetFile.raw_url);

            // Prepare comment for this file
            const comment = prepareReviewComment(targetFile, content, suggestion);
            
            // Validate comment before adding
            if (comment.line && comment.line > 0) {
                console.log(`Adding comment for ${path} at line ${comment.line}`);
                comments.push(comment);
            } else {
                console.warn(`Invalid line number for ${path}: ${comment.line}, skipping...`);
            }
        }

        if (comments.length === 0) {
            console.log('No valid comments to create');
            return;
        }

        console.log(`Creating review with ${comments.length} comments`);

        // Create single review with all comments
        const reviewData = await createReview(owner, repo, prNumber, comments);

        console.log('Review created successfully:', {
            id: reviewData.id,
            state: reviewData.state,
            html_url: reviewData.html_url
        });

    } catch (error) {
        console.error('Error in reviewPR:', error.message);
        console.error('Full error:', error);
    }
}

reviewPR();