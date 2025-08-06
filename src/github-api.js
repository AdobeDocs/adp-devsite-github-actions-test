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
        return null;
    }
}

export async function createBranch(owner, repo, branchRef, baseRefSha){
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
        return null;
    }
}