export async function getFileContent(owner, repo, path) {
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
}

export async function getLatestCommit(owner, repo, ref) {
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

export async function createBranch(owner, repo, branchRef, baseRefSha) {
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

export async function createBlob(owner, repo, content) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
            method: 'POST',
            headers: {
                'accept': 'application/vnd.github+json',
                'authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
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
}

export async function createTree(owner, repo, blobSha, branchRefSha) {
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
                tree: [
                    { path: 'test.txt', mode: '100644', type: 'blob', sha: blobSha }
                ]
            })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating tree:', error);
        throw error
    }
}

export async function commitChanges(owner, repo, treeSha, parentCommitSha) {
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

export async function pushCommit(owner, repo, branchRef, commitSha) {
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