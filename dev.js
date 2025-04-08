// content/docs
// serve static on 3001

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 3003;

// TODO: ensure `DOCS_DIRECTORY` starts with `/`
const DOCS_DIRECTORY = process.env.DIRECTORY ||  'src/pages';
const OWNER = process.env.OWNER || 'AdobeDocs';
const REPO = process.env.OWNER || 'adp-devsite-github-actions-test';
const REF = process.env.OWNER || 'main';

const app = express();

app.use(
  `/${OWNER}/${REPO}/${REF}/${DOCS_DIRECTORY}`,
  express.static(path.resolve(__dirname, `./${DOCS_DIRECTORY}`), {
    setHeaders: (res) => {
      res.setHeader('last-modified', new Date().toGMTString());
    },
  }),
);

app.listen(PORT, () => {
  console.debug(`Docs dev server is running on port ${PORT}`);
});