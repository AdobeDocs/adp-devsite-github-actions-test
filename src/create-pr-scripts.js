const fs = require('fs');
const { getFileContent, getLatestCommit, createBranch, createBlob, createTree, commitChanges, pushCommit, createPR } = require('./github-api');
const { hasMetadata, replaceOrPrependFrontmatter } = require('./file-operation');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";
const branchRef = "heads/ai-metadata";
const mainRef = "heads/main";

async function processAIContent() {
    let tree = [];
    try {
        // Read the ai_content.txt file
        const content = fs.readFileSync('ai_content.txt', 'utf8');

        // Split the content using the regex pattern
        const files = content.split(/--- File: (?=.*? ---)/);

        // Remove empty first element if exists
        if (files[0].trim() === '') {
            files.shift();
        }

        for (const file of files) {
            if (!file.trim()) continue;

            const pathMatch = file.match(/(.*?) ---\n([\s\S]*)/);
            const [, path, suggestion] = pathMatch;

            console.log("path", path);
            let fileContent = await getFileContent(owner, repo, path);
            fileContent = replaceOrPrependFrontmatter(fileContent, suggestion.trim());
            let blob = await createBlob(owner, repo, fileContent);
            tree.push({ path: path, mode: '100644', type: 'blob', sha: blob.sha });
        }

        return tree;
    } catch (error) {
        console.error('Error processing AI content:', error);
        throw error;
    }
}


async function main() {

    // get latest commit sha from main branch
    const latestCommit = await getLatestCommit(owner, repo, mainRef);

    // create a new branch from the latest commit
    const createdBranch = await createBranch(owner, repo, branchRef, latestCommit.object.sha);

    // get the tree SHA from the latest commit
    const baseCommitSha = createdBranch.object.sha;
    const baseCommitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${baseCommitSha}`, {
        headers: {
            'accept': 'application/vnd.github+json',
            'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    }).then(res => res.json());
    const baseTreeSha = baseCommitResponse.tree.sha;

    const treeArray = await processAIContent();

    const tree = await createTree(owner, repo, baseTreeSha, treeArray);

    const commit = await commitChanges(owner, repo, tree.sha, createdBranch.object.sha);

    const pushCommitResult = await pushCommit(owner, repo, branchRef, commit.sha);

    const pr = await createPR(owner, repo, "ai-metadata", "main");
}

main();

