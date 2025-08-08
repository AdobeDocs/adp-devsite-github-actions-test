const fs = require('fs');
const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const openAIAPIKey = process.env.AZURE_OPENAI_API_KEY;

async function createMetadata(endpoint, apiKey, filepath, content) {
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

  return  `--- File: ${filepath} ---\n${aiContent}\n`;
}

async function EditMetadata(endpoint, apiKey, filepath, metadata, fileContent) {
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
          content: `Review and make minimal necessary updates to the following metadata based on the content. Keep the same format and only change what needs to be updated. If there is metadata that is not in the template, keep it at the end of the metadata.
    
            Expected format:
              ---
              title: [Same as the heading1 content]
              description: [Brief description of the document]
              keywords:
              - [Keyword 1]
              - [Keyword 2]
              - [Keyword 3]
              - [Keyword 4]
              - [Keyword 5]
              other original metadata
              ---

              Current metadata:
              ${metadata}

              Content to analyze:
              ${fileContent}`
        }
      ],
      max_tokens: 800,
      temperature: 1,
      top_p: 1,
    })
  });

  const result = await response.json();
  const aiContent = result.choices[0].message.content;
  
  return `--- File: ${filepath} ---\n${aiContent}\n`;
}

function hasMetadata(content) { // FIXME:this is a little tricky for metadata checking, need refine logic later
  return content.split('---').length >= 2;
}

// Main function to read pr_content.txt and generate metadata
async function processContent(filename) {
  if (!openAIEndpoint || !openAIAPIKey) {
    console.error('Missing required environment variables: AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY');
    return;
  }

  try {
    let content = fs.readFileSync(filename, 'utf8');
    console.log(`Successfully read content from ${filename}`);

    // Split content by file markers
    const fileContents = content.split(/--- File: (?=.*? ---)/);
    // Remove the first empty element if exists
    if (fileContents[0].trim() === '') {
      fileContents.shift();
    }

    let allGeneratedContent = '';

    for (const fileContent of fileContents) {
      if (!fileContent.trim()) continue;

      // Extract file path and content
      const pathMatch = fileContent.match(/(.*?) ---\n([\s\S]*)/);
      if (!pathMatch) continue;

      const [, filePath, fileText] = pathMatch;
      const cleanContent = fileText.trim();

      if (hasMetadata(cleanContent)) {
        const parts = cleanContent.split('---');
        const metadata = parts.slice(1, 2).join('---').trim();
        const fullContent = parts.slice(2).join('---').trim();
        allGeneratedContent += await EditMetadata(openAIEndpoint, openAIAPIKey, filePath, metadata, fullContent);
      } else {
        allGeneratedContent += await createMetadata(openAIEndpoint, openAIAPIKey, filePath, cleanContent);
      }
    }

    fs.writeFileSync('ai_content.txt', allGeneratedContent, 'utf8');
    console.log('Successfully wrote all content to ai_content.txt');

  } catch (error) {
    console.error('Error processing content:', error);
  }
}

processContent(process.env.FILE_NAME);