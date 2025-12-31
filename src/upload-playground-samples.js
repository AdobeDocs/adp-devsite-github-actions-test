const fs = require('fs-extra');
const path = require('path');
const JSZip = require('jszip');
require('dotenv').config();

const DEFAULT_PAGES_DIRECTORY = path.join('src', 'pages');
const MARKDOWN_EXTENSION = '.md';
const IMS_TOKEN_ENDPOINT = '/ims/token/v1';
const FFC_PLAYGROUND_ENDPOINT = '/v1/playground/projects';
const FFC_REQUEST_ID_HEADER = 'x-request-id';


function getFilesFromArgs(args = process.argv.slice(2)) {
  const flagIndex = args.findIndex(
    (arg) => arg === '--files' || arg === '-f' || arg === '--file'
  );
  if (flagIndex === -1) return [];

  const raw = args.slice(flagIndex + 1);
  if (raw.length === 0) {
    throw new Error(
      'No files provided after --files. Example: --files src/pages/a.md src/pages/b.md'
    );
  }

  const flattened = raw
    .join(',')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  const resolved = flattened.map((p) => path.resolve(p));
  resolved.forEach((filePath) => {
    if (path.extname(filePath) !== MARKDOWN_EXTENSION) {
      throw new Error(`--files accepts only .md files. Offending path: ${filePath}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }
  });

  return resolved;
}

const CODE_BLOCK_REGEX =
  /```(\w+)\{try(?:\s+id=([a-zA-Z0-9_-]+))?\}\s*\n([\s\S]*?)\n```/g;


async function getImsServiceToken({
  imsBaseUrl,
  clientId,
  clientSecret,
  authCode,
  imsTokenEndpoint = IMS_TOKEN_ENDPOINT,
}) {
  if (!clientId || !clientSecret || !authCode) {
    throw new Error(
      'Missing IMS credentials: PLAYGROUND_CLIENT_ID, PLAYGROUND_CLIENT_SECRET, or PLAYGROUND_AUTH_CODE'
    );
  }

  const url = new URL(imsTokenEndpoint, imsBaseUrl);
  const formBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: authCode,
    grant_type: 'authorization_code',
  }).toString();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`IMS token error HTTP ${response.status}: ${errorText}`);
  }

  const parsed = await response.json();
  if (!parsed.access_token) {
    throw new Error('Missing access_token in IMS response');
  }

  return parsed.access_token;
}

/**
 * Comment out express-document-sdk import statements in code.
 * The Code Playground Script mode automatically imports these modules,
 * so we comment them out to avoid conflicts while preserving them for context.
 */
function commentOutExpressDocumentSDKImports(code) {
  const importRegex = /^(import\s+.*\s+from\s+["']express-document-sdk["'];?\s*)$/gm;
  return code.replace(
    importRegex,
    '// Note: Uncomment the import below when using in your add-on\'s code.js\n// $1'
  );
}

/**
 * Create a zip buffer containing the processed code block.
 */
async function createZipBufferFromCode(code) {
  const zip = new JSZip();
  const processedCode = commentOutExpressDocumentSDKImports(code);
  zip.file('script.js', processedCode);
  return zip.generateAsync({ type: 'nodebuffer' });
}

/**
 * Upload a code block to FFC with retry logic.
 */
async function uploadCodeBlockToFFC({
  codeBlock,
  projectId,
  imsBaseUrl,
  ffcBaseUrl,
  imsTokenEndpoint = IMS_TOKEN_ENDPOINT,
  ffcPlaygroundEndpoint = FFC_PLAYGROUND_ENDPOINT,
  ffcRequestIdHeader = FFC_REQUEST_ID_HEADER,
  playgroundApiKey,
  playgroundClientId,
  playgroundClientSecret,
  playgroundAuthCode,
  maxRetries = 3,
}) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const processedCode = commentOutExpressDocumentSDKImports(codeBlock.code);

      if (attempt === 1) {
        console.log(`\n📤 Uploading: ${projectId} (from ${codeBlock.filePath})`);
      } else {
        console.log(`   Retry ${attempt - 1}/${maxRetries - 1}: ${projectId}`);
      }

      const accessToken = await getImsServiceToken({
        imsBaseUrl,
        clientId: playgroundClientId,
        clientSecret: playgroundClientSecret,
        authCode: playgroundAuthCode,
        imsTokenEndpoint,
      });

      const url = new URL(`${ffcPlaygroundEndpoint}/${projectId}`, ffcBaseUrl);
      const zipBuffer = await createZipBufferFromCode(processedCode);

      const form = new FormData();
      form.append(
        'file',
        new Blob([zipBuffer], { type: 'application/zip' }),
        `${projectId}.zip`
      );
      form.append('name', projectId);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.adobe-ffcaddon.response+json',
          Authorization: `Bearer ${accessToken}`,
          'x-api-key': playgroundApiKey,
        },
        body: form,
      });

      if (!response.ok) {
        const text = await response.text();
        const requestId = response.headers.get(ffcRequestIdHeader);
        if (requestId) {
          console.log(`   FFC Request ID: ${requestId}`);
        }
        throw new Error(
          `Failed to upload code block to FFC - HTTP ${response.status}: ${text}`
        );
      }

      console.log(`✅ Successfully uploaded: ${projectId}`);
      return response.json();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        console.error(
          `❌ Failed to upload (${projectId}) after ${maxRetries} attempts: ${error.message}`
        );
        throw error;
      }

      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(`   ⏳ Waiting ${waitTime / 1000}s before retry...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

/**
 * Find all markdown files in a directory.
 */
async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath)));
    } else if (entry.isFile() && path.extname(entry.name) === MARKDOWN_EXTENSION) {
      files.push(fullPath);
    }
  }

  return files;
}


function extractCodeBlocks(content, filePath) {
  const codeBlocks = [];
  let match;
  CODE_BLOCK_REGEX.lastIndex = 0;

  while ((match = CODE_BLOCK_REGEX.exec(content)) !== null) {
    const [, language, explicitId, code] = match;

    if (!explicitId) {
      throw new Error(`Code block missing mandatory ID tag: ${filePath}.`);
    }

    codeBlocks.push({
      id: explicitId,
      language,
      code: code.trim(),
      filePath,
    });
  }

  return codeBlocks;
}

/**
 * Main entry point for uploading playground code blocks.
 */
async function uploadPlaygroundScripts({
  pagesDirectory,
  files,
  imsBaseUrl = process.env.IMS_BASE_URL,
  ffcBaseUrl = process.env.FFC_BASE_URL,
  imsTokenEndpoint = IMS_TOKEN_ENDPOINT,
  ffcPlaygroundEndpoint = FFC_PLAYGROUND_ENDPOINT,
  ffcRequestIdHeader = FFC_REQUEST_ID_HEADER,
  playgroundClientId = process.env.PLAYGROUND_CLIENT_ID,
  playgroundClientSecret = process.env.PLAYGROUND_CLIENT_SECRET,
  playgroundAuthCode = process.env.PLAYGROUND_AUTH_CODE,
  playgroundApiKey = process.env.PLAYGROUND_API_KEY,
  uploadDelayMs = 500,
  maxRetries = 3,
} = {}) {
  const targetPagesDir =
    pagesDirectory || process.env.PAGES_DIRECTORY || DEFAULT_PAGES_DIRECTORY;
  const explicitFiles = Array.isArray(files) ? files : [];

  if (!imsBaseUrl || !ffcBaseUrl) {
    throw new Error('IMS_BASE_URL and FFC_BASE_URL must be set');
  }

  if (!playgroundApiKey) {
    throw new Error('PLAYGROUND_API_KEY must be set');
  }

  const markdownFiles =
    explicitFiles.length > 0 ? explicitFiles : await findMarkdownFiles(targetPagesDir);
  let successCount = 0;
  let failureCount = 0;

  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, 'utf8');
    const codeBlocks = extractCodeBlocks(content, filePath);

    for (const codeBlock of codeBlocks) {
      try {
        await uploadCodeBlockToFFC({
          codeBlock,
          projectId: codeBlock.id,
          imsBaseUrl,
          ffcBaseUrl,
          imsTokenEndpoint,
          ffcPlaygroundEndpoint,
          ffcRequestIdHeader,
          playgroundApiKey,
          playgroundClientId,
          playgroundClientSecret,
          playgroundAuthCode,
          maxRetries,
        });
        successCount += 1;
        await new Promise((resolve) => setTimeout(resolve, uploadDelayMs));
      } catch (error) {
        failureCount += 1;
        console.error(`Skipping ${codeBlock.id} due to upload failure.`);
      }
    }
  }

  const total = successCount + failureCount;
  console.log(`\n${'='.repeat(80)}`);
  console.log('📊 Upload Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📦 Total: ${total}`);
  console.log('='.repeat(80));

  if (failureCount > 0) {
    console.log('\n⚠️  Some uploads failed. You may need to run the script again.');
    throw new Error('One or more playground uploads failed');
  }

  return { successCount, failureCount, total };
}

module.exports = uploadPlaygroundScripts;

if (require.main === module) {
  const explicitFiles = getFilesFromArgs();

  uploadPlaygroundScripts({ files: explicitFiles }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}


