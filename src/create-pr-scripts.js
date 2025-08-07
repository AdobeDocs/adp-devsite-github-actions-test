const fs = require('fs');
const { getFileContent, getLatestCommit, createBranch, createBlob, createTree, commitChanges, pushCommit } = require('./github-api');

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";
const branchRef = "heads/ai-metadata";
const mainRef = "heads/main";

function hasMetadata(content) {
    return content.split('---').length >= 2;
}

async function processAIContent() {
    try {
        // Read the ai_content.txt file
        const content = fs.readFileSync('ai_content.txt', 'utf8');
        
        // Split the content using the regex pattern
        const files = content.split(/--- File: (?=.*? ---)/);
        
        // Remove empty first element if exists
        if (files[0].trim() === '') {
            files.shift();
        }

        const pathMatch = files[1].match(/(.*?) ---\n([\s\S]*)/);

        const [, path, suggestion] = pathMatch;

        console.log(path);
        // console.log(suggestion);
        let fileContent = await getFileContent(owner, repo, path);
        console.log("fileContent", fileContent);
        // let cont = await fetch(fileContent.download_url, {
        //     headers: {
        //         'Accept': 'application/vnd.github.v3.raw',
        //         'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        //     }
        // })
        // cont = await cont.text();
        // console.log("content", cont);
        // if (hasMetadata(fileContent)) {

        // }else{
        //     fileContent = suggestion + "\n" + fileContent;
        // }
        // console.log(fileContent);

        // Process each file content
        // for (const fileContent of files) {
        //     if (!fileContent.trim()) continue;

        //     // Extract file path and content
        //     const pathMatch = fileContent.match(/(.*?) ---\n([\s\S]*)/);
        //     if (!pathMatch) continue;

        //     const [, path, suggestion] = pathMatch;

        // }
        
        return files;
    } catch (error) {
        console.error('Error processing AI content:', error);
        throw error;
    }
}

async function prepatreTreeObject(path, suggestionContent){
    
}


// async function main(){

//     // get latest commit sha from main branch
//     const latestCommit = await getLatestCommit(owner, repo, mainRef);

//     // create a new branch from the latest commit
//     const createdBranch = await createBranch(owner, repo, branchRef, latestCommit.object.sha);

//     await processAIContent();

//     const blob = await createBlob(owner, repo, "test contents\nanother test content");

//     const tree = await createTree(owner, repo, createdBranch.object.sha, [{ path: "test.txt", mode: '100644', type: 'blob', sha: blob.sha }]);

//     const commit = await commitChanges(owner, repo, tree.sha, createdBranch.object.sha);

//     const pushCommitResult = await pushCommit(owner, repo, branchRef, commit.sha);

// }

// main();

processAIContent();