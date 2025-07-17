import { AzureOpenAI } from "openai";
const fs = require('fs').promises;

const owner = "AdobeDocs";
const repo = "adp-devsite-github-actions-test";
const prNumber = 39;
// const prNumber = process.env.PR_NUMBER;

async function fetchPRInformation() {
    try {
        // fetch PR data
        const prResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });

        if (!prResponse.ok) {
            throw new Error(`GitHub API request failed: ${prResponse.status}`);
        }

        // fetch the files changed in this PR
        const filesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
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
        
        let summaries = [];
        
        // Fetch and summarize content for each file in src/pages
        for (const file of pagesFiles) {
            const contentResponse = await fetch(file.raw_url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`
                }
            });
            
            if (contentResponse.ok) {
                const content = await contentResponse.text();
                const summary = await summarizeContent(file.filename, content);
                summaries.push(`### ${file.filename}\n\n${summary}\n`);
            } else {
                console.error(`Failed to fetch content for ${file.filename}`);
            }
        }
        
        if (pagesFiles.length === 0) {
            await fs.writeFile('pr_summary.txt', 'No changes found in src/pages directory (excluding config.md files)');
        } else {
            const fullSummary = summaries.join('\n---\n\n');
            await fs.writeFile('pr_summary.txt', fullSummary);
        }

    } catch (error) {
        console.error('Error fetching PR information:', error);
        await fs.writeFile('pr_summary.txt', `Error generating summary: ${error.message}`);
    }
}

async function summarizeContent(filename, content) {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const apiVersion = "2025-01-01-preview";
    const deployment = "gpt-4.1-mini";
  
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  
    const result = await client.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: "You are an AI assistant that generates concise summaries of code and documentation files. Focus on the main purpose, key functionality, and important changes in the content."
            },
            { 
                role: "user", 
                content: `Please provide a concise summary of the following file '${filename}':\n\n${content}`
            }
        ],
        max_tokens: 800,
        temperature: 0.7,  // Reduce this amount for more focused summaries
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null
    });
  
    return result.choices[0].message.content;
}

// Call the function
fetchPRInformation();