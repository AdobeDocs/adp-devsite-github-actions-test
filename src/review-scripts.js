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
    try {
        const parsed = matter(content);
        if (parsed.matter && parsed.matter.trim().length > 0) {
            // Count how many lines the frontmatter occupies (including closing ---)
            const fm = `---\n${parsed.matter}\n---`;
            const fmLines = fm.split('\n').length;
            return fmLines + 0; // metadata ends at this line
        }
    } catch (_e) {}
    return 0;
}

// Prepare the body of review comment
// DOCS: https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#create-a-review-for-a-pull-request
// FIXME: this might be moved to github-api.js? but it checks the metadata so is not pure api function, maybe its better to seperate metadata check and comments preparation.
function prepareReviewComment(targetFile, content, suggestion) {
    const firstLine = content.split('\n')[0];
    const hasFileMetadata = hasMetadata(content);
    
    // if has metadata, replace it
    if (hasFileMetadata) {
        const metadataEnd = findMetadataEnd(content);
        return {
            path: targetFile.filename,
            start_line: 1,
            start_side: 'RIGHT', // "RIGHT" means the content after PR, "LEFT" means the content before PR
            line: metadataEnd, // end_line
            side: 'RIGHT', // end_side, "LEFT" and "RIGHT" meaning same above
            body: `\`\`\`suggestion\n${suggestion}\n\`\`\``
        };
    }
    
    // if no metadata, add it to the first line
    return {
        path: targetFile.filename,
        line: 1,
        side: 'RIGHT',
        body: `\`\`\`suggestion\n${suggestion}\n${firstLine}\n\`\`\`` // this action is overwriting the first line with metadata, so should append the origianl first line to the suggtion's end.
    };
}


async function reviewPR() {
    try {
        // Read AI content for all files
        const files = readAiContent();

        const PRFiles = await getFilesInPR(owner, repo, prNumber);

        // Process each file and prepare comments
        const comments = [];
        for (const { path, suggestion } of files) {
            const targetFile = PRFiles.find(file => file.filename === path);
            if (!targetFile) { // for safety, should not ha
                console.warn(`Target file ${path} not found in PR, skipping...`);
                continue;
            }

            const content = await getFileContentByContentURL(targetFile.raw_url);

            // Prepare comment for this file
            const comment = prepareReviewComment(targetFile, content, suggestion);
            comments.push(comment);
        }

        if (comments.length === 0) {
            throw new Error('No valid files to review');
        }

        // Create single review with all comments
        const reviewData = await createReview(owner, repo, prNumber, comments);

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