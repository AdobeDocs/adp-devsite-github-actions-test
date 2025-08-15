// DOCS: https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
async function getFileContent(owner, repo, path) {
    try{
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'GET',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        const fileContent = await fetch(data.download_url, {
            headers: {
                'accept': 'application/vnd.github.v3.raw',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }).then(res => res.text());
            return fileContent;
    } catch (error) {
        console.error('Error getting file content:', error);
        throw error;
    }
}

async function getFileContentByContentURL(contentURL){
    try{
        const response = await fetch(contentURL, {
            method: 'GET',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        return response.text();
    } catch (error) {
        console.error('Error getting file content by content URL:', error);
        throw error;
    }
}


// DOCS: https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#get-a-reference
async function getLatestCommit(owner, repo, ref) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/${ref}`, {
            method: 'GET',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ref: ${ref} - ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching latest commit for ref ${ref}:`, error);
        throw error;
    }
}

// DOCS: https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#create-a-reference
async function createBranch(owner, repo, branchRef, baseRefSha) {
    try {
        // Try to get the existing branch
        try {
            const existingBranch = await getLatestCommit(owner, repo, branchRef);
            return existingBranch;
        } catch (error) {
            // If branch doesn't exist, create it
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
                method: 'POST',
                headers: {
                    'accept': 'application/vnd.github+json',
                    'authorization': `Bearer ${process.env.GITHUB_TOKEN}`
                },
                body: JSON.stringify({
                    ref: `refs/${branchRef}`,
                    sha: baseRefSha
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create branch: ${response.status}`);
            }

            return response.json();
        }
    } catch (error) {
        console.error('Error in createBranch:', error);
        throw error;
    }
}

// DOCS: https://docs.github.com/en/rest/git/blobs?apiVersion=2022-11-28#create-a-blob
// Blob is a file change record  in git
async function createBlob(owner, repo, content) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: content, // this is a overwrite action, no insert/update/delete available
                encoding: 'utf-8'
            })
        });

        return response.json();

    } catch (error) {
        console.error('Error creating blob:', error);
        throw error;
    }
}

// DOCS: https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#create-a-tree
// Tree is a collection of blobs
async function createTree(owner, repo, branchRefSha, treeArray) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                base_tree: branchRefSha,
                tree: treeArray
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating tree:', error);
        throw error
    }
}

// DOCS: https://docs.github.com/en/rest/git/commits?apiVersion=2022-11-28#create-a-commit
async function commitChanges(owner, repo, treeSha, parentCommitSha) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
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

// DOCS: https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#update-a-reference
async function pushCommit(owner, repo, branchRef, commitSha) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/${branchRef}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
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

// DOCS: https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
async function createPR(owner, repo, headRef, baseRef) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: '[ai-pr]Update metadata for all documentation files',
                head: headRef,
                base: baseRef
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating PR:', error);
        throw error;
    }
}

async function getFilesInPR(owner, repo, prNumber){
    try{
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error getting files in PR:', error);
        throw error;
    }
}

// DOCS: https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#create-a-review-for-a-pull-request
async function createReview(owner, repo, prNumber, comments){
    try{
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: 'AI suggestions',
                event: 'COMMENT',
                comments: comments
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}


// doing module export instead of exporting functions directly to avoid "SyntaxError: Unexpected token 'export'" in github actions environment
module.exports = {
    getFileContent,
    getFileContentByContentURL,
    getLatestCommit,
    createBranch,
    createBlob,
    createTree,
    commitChanges,
    pushCommit,
    createPR,
    getFilesInPR,
    createReview
};