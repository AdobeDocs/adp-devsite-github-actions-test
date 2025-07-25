const fs = require('fs');

async function createMetadata(endpoint, apiKey, content) {
  // Extract the file path from the content
  const pathMatch = content.match(/--- File: (.*?) ---/);
  const filePath = pathMatch ? pathMatch[1] : '';

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
                title: [Same as the heading1 content]
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
  const aiContent = result.choices[0].message.content;
  
  // Write both file path and AI content to the file
  const fullContent = `--- File: ${filePath} ---\n${aiContent}`;
  fs.writeFileSync('ai_content.txt', fullContent, 'utf8');
  console.log('Successfully wrote AI content with file path to ai_content.txt');
}

async function EditMetadata(endpoint, apiKey, metadata, changedContent, fullContent) {

}

// Main function to read pr_content.txt and generate metadata
async function processContent() {
  const fs = require('fs');

  try {
    const content = fs.readFileSync('pr_content.txt', 'utf8');
    console.log('Successfully read content from pr_content.txt');

    const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const openAIAPIKey = process.env.AZURE_OPENAI_API_KEY;

    if (!openAIEndpoint || !openAIAPIKey) {
      console.error('Missing required environment variables: AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY');
      return;
    }

    await createMetadata(openAIEndpoint, openAIAPIKey, content);

  } catch (error) {
    console.error('Error processing content:', error);
  }
}

processContent();