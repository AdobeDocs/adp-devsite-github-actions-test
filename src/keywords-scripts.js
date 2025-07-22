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
                title: [Title of the Document]
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
//   console.log(result);
  return result.choices[0].message.content;
}

// async function main() {
//   const fs = require('fs');
//   const content = fs.readFileSync('pr_content.txt', 'utf8');
//   const keywords = await generateKeywords(process.env.AZURE_OPENAI_ENDPOINT, process.env.AZURE_OPENAI_API_KEY, content);
//   console.log(keywords);
// }

// main();