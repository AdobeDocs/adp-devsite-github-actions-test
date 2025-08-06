const fs = require('fs');
const { getLatestCommit, createBranch, createBlob, createTree, commitChanges, pushCommit } = require('./github-api');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const githubToken = process.env.GITHUB_TOKEN;

const branchRef = "heads/ai-metadata";
const mainRef = "heads/main";









async function main(){
    // get latest commit sha from main branch
    const latestCommit = await getLatestCommit(owner, repo, mainRef);

    // create a new branch from the latest commit
    const createdBranch = await createBranch(owner, repo, branchRef, latestCommit.object.sha);

    const blob = await createBlob(owner, repo, "test contents");

    const tree = await createTree(owner, repo, blob.sha, createdBranch.object.sha);

    const commit = await commitChanges(owner, repo, tree.sha, createdBranch.object.sha);


    const pushCommitResult = await pushCommit(owner, repo, branchRef, commit.sha);

}

main();