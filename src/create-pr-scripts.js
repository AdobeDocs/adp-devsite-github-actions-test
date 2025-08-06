const fs = require('fs');
const { getLatestCommit, createBranch } = require('./github-api');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const githubToken = process.env.GITHUB_TOKEN;

const branchRef = "heads/ai-metadata";
const mainRef = "heads/main";

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
                content: "test content",
                encoding: 'utf-8'
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating blob:', error);
        throw error;
    }
}

async function createTree(blobSha, branchRefSha){
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${githubToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                base_tree: branchRefSha,
                tree: [
                    { path: 'test.txt', mode: '100644', type: 'blob', sha: blobSha }
                ]
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating tree:', error);
        throw error;
    }
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

async function pushCommit(commitSha){
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/${branchRef}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sha: commitSha,
                force: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update ref: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error pushing commit:', error);
        throw error;
    }
}

async function main(){
    // get latest commit sha from main branch
    const latestCommit = await getLatestCommit(owner, repo, mainRef);
    // console.log(latestCommit);

    // create a new branch from the latest commit
    const createBranchResult = await createBranch(owner, repo, branchRef, latestCommit.object.sha);
    console.log(createBranchResult);

    // const blob = await createBlob("test content");
    // console.log(blob.sha);
    // const tree = await createTree(blob.sha, "444b29717bf4bd7b8a79918f65c81a607a8bcfd3");
    // console.log(tree);
    // const commit = await commitChanges("78ff5305ce73ef4b10e28ddf9815333935d625b5", "444b29717bf4bd7b8a79918f65c81a607a8bcfd3");
    // console.log(commit);
    // const pushCommitResult = await pushCommit("6241f281476fdf641cf92de7cdc08f323f167a3a");
    // console.log(pushCommitResult);
}

main();