import { readFileSync, mkdirSync, writeFileSync } from 'fs';

function suiteKey(file) {
  if (file.includes('links')) return 'links';
  if (file.includes('nav')) return 'nav';
  if (file.includes('images')) return 'images';
  if (file.includes('content')) return 'content';
  return 'visual';
}

const emptySuite = () => ({ passed: 0, failed: 0, skipped: 0, issues: [] });

const summary = {
  timestamp: new Date().toISOString(),
  path_prefix: process.env.PATH_PREFIX || '/',
  suite: process.env.SUITE || 'all',
  threshold: parseFloat(process.env.DIFF_THRESHOLD || '5'),
  status: 'passed',
  report_url: process.env.REPORT_URL || null,
  suites: {
    visual: emptySuite(),
    links: emptySuite(),
    nav: emptySuite(),
    images: emptySuite(),
    content: emptySuite(),
  },
};

let raw;
try {
  raw = JSON.parse(readFileSync('test-results.json', 'utf-8'));
} catch {
  summary.status = 'error';
  summary.error = 'Test run did not produce results';
  mkdirSync('results', { recursive: true });
  writeFileSync('results/latest.json', JSON.stringify(summary, null, 2));
  console.log('Summary written to results/latest.json (no test-results.json found)');
  process.exit(0);
}

function processSpecs(specs, key) {
  for (const spec of specs || []) {
    for (const test of spec.tests || []) {
      const statuses = (test.results || []).map((r) => r.status);
      if (!statuses.length || statuses.every((s) => s === 'skipped')) {
        summary.suites[key].skipped += 1;
        continue;
      }
      if (statuses.every((s) => s === 'passed')) {
        summary.suites[key].passed += 1;
      } else {
        summary.suites[key].failed += 1;
        summary.status = 'failed';
        const errMsg = test.results?.[0]?.error?.message
          ?.split('\n')
          .map((l) => l.trim())
          .find((l) => l && !l.startsWith('at ') && l !== 'Error');
        summary.suites[key].issues.push(
          errMsg ? `${spec.title} — ${errMsg.slice(0, 120)}` : spec.title,
        );
      }
    }
  }
}

for (const suite of raw.suites || []) {
  const key = suiteKey(suite.file || suite.title || '');
  processSpecs(suite.specs, key);
  for (const child of suite.suites || []) {
    processSpecs(child.specs, key);
  }
}

mkdirSync('results', { recursive: true });
writeFileSync('results/latest.json', JSON.stringify(summary, null, 2));
console.log('Summary written to results/latest.json');
