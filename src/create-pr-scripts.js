const fs = require('fs');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const githubToken = process.env.GITHUB_TOKEN;

const branchRef = "heads/ai-metadata";
const mainRef = "heads/main";

async function getLatestCommit(ref) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/${ref}`, {
            method: 'GET',
            headers: {
                'accept': 'application/vnd.github+json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ref: ${ref} - ${response.status}`);
        }
        const data = await response.json();
        return data.object.sha;
    } catch (error) {
        console.error(`Error fetching latest commit for ref ${ref}:`, error);
        throw error;
    }
}

async function createBranch(baseRefSha){
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${githubToken}`
            },
            body: JSON.stringify({
                ref: `refs/${branchRef}`,
                sha: baseRefSha
            }),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating branch:', error);
        throw error;
    }
}

async function createBlob(content){
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${githubToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                encoding: 'utf-8'
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating blob:', error);
        throw error;
    }
    return response.json();
}

async function commitChanges(treeSha, parentCommitSha) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${githubToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                message: '[ai-generated]Update metadata for all documentation files',
                tree: treeSha,
                parents: [parentCommitSha]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create commit: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error committing changes:', error);
        throw error;
    }
}

async function main(){
    // get latest commit sha from main branch
    const latestCommit = await getLatestCommit(mainRef);
    // console.log(latestCommit);
    // create a new branch from the latest commit
    // const createBranchResult = await createBranch(latestCommit);
    // console.log(createBranchResult);
}

main();