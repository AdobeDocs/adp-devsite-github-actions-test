const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";

const prNumber = process.env.PR_ID;
const githubToken = process.env.GITHUB_TOKEN;

async function generateKeywords( endpoint, apiKey, content) {

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          { 
            role: "system", 
            content: "You are an AI assistant that generates summaries in a specific format. Focus on providing a structured summary with a title, description, and a list of keywords."
          },
          { 
            role: "user", 
            content: `Generate a summary of the following content in the format:
                  ---
                  title: [Short summary of the entire document]
                  description: [Brief description of the document]
                  keywords:
                  - [Keyword 1]
                  - [Keyword 2]
                  - [Keyword 3]
                  - [Keyword 4]
                  - [Keyword 5]
                  ---
                  Content: ${content}`
          }
        ],
        max_tokens: 800,
        temperature: 1,
        top_p: 1,
      })
    });
  
    const result = await response.json();
    console.log(result.choices[0].message.content);
  }

async function fetchPRInformation() {
    try {
        // fetch PR data
        const prResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!prResponse.ok) {
            throw new Error(`GitHub API request failed: ${prResponse.status}`);
        }

        // fetch the files changed in this PR
        const filesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (!filesResponse.ok) {
            throw new Error(`GitHub API request failed when fetching files: ${filesResponse.status}`);
        }
        const filesData = await filesResponse.json();
        
        // Filter files in src/pages directory and exclude config.md
        const pagesFiles = filesData.filter(file => 
            file.filename.startsWith('src/pages/') && 
            !file.filename.endsWith('config.md')
        );
        
        let allContent = '';
        
        for (const file of pagesFiles) {
            const contentResponse = await fetch(file.raw_url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            
            if (contentResponse.ok) {
                const content = await contentResponse.text();
                allContent += `\n\n--- File: ${file.filename} ---\n\n${content}`;
                // console.log(allContent);
            } else {
                console.log(`Failed to fetch content for ${file.filename}`);
            }
        }
        
        if (pagesFiles.length === 0) {
            console.log('No matching files found in src/pages directory (excluding config.md)');
            allContent = 'No matching files found in src/pages directory (excluding config.md)';
        }


        // Generate keywords using the content
        const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const openAIAPIKey = process.env.AZURE_OPENAI_API_KEY;
        await generateKeywords(openAIEndpoint, openAIAPIKey, allContent);
        // console.log('Generated Keywords:', keywords);

    } catch (error) {
        console.error('Error fetching PR information:', error);
    }
}

// Call the function
fetchPRInformation();