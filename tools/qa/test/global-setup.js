import { writeFileSync, unlinkSync } from 'fs';
import { chromium } from '@playwright/test';

const SITEMAP_URL = 'https://developer.adobe.com/sitemap.xml';
const PATHS_FILE = '.playwright-paths.json';
const DEVBIZ_FLAG = '.playwright-devbiz';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

async function fetchAllPaths(prefix) {
  const xml = await fetchText(SITEMAP_URL);
  const locs = extractLocs(xml);

  // Check if this is a sitemap index (contains child .xml sitemaps)
  const childSitemaps = locs.filter(l => l.endsWith('.xml'));
  let allUrls = locs.filter(l => !l.endsWith('.xml'));

  if (childSitemaps.length > 0) {
    const results = await Promise.all(childSitemaps.map(async (url) => {
      try {
        const childXml = await fetchText(url);
        return extractLocs(childXml).filter(l => !l.endsWith('.xml'));
      } catch {
        return [];
      }
    }));
    allUrls = allUrls.concat(results.flat());
  }

  const base = 'https://developer.adobe.com';
  return [...new Set(
    allUrls
      .filter(url => url.startsWith(base))
      .map(url => url.slice(base.length))
      .filter(path => path.startsWith(prefix))
      .sort()
  )];
}

async function isDevBiz(prefix) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`https://developer-stage.adobe.com${prefix}`);
    await page.waitForLoadState('load');
    return await page.evaluate(() => document.querySelector('main')?.classList.contains('dev-biz') ?? false);
  } catch {
    return false;
  } finally {
    await browser.close();
  }
}

export default async function globalSetup() {
  const prefix = process.env.PATH_PREFIX;
  if (!prefix) throw new Error('PATH_PREFIX env var is required (e.g. /experience-cloud/cloud-manager)');

  const normalizedPrefix = prefix.endsWith('/') ? prefix : prefix + '/';

  if (await isDevBiz(normalizedPrefix)) {
    console.log(`\nDev-biz page detected — running checks on single page: ${normalizedPrefix}`);
    writeFileSync(DEVBIZ_FLAG, '1');
    writeFileSync(PATHS_FILE, JSON.stringify([normalizedPrefix], null, 2));
    return;
  }

  try { unlinkSync(DEVBIZ_FLAG); } catch { /* not present */ }
  console.log(`\nFetching sitemap for prefix: ${prefix}`);
  const paths = await fetchAllPaths(prefix);
  console.log(`Found ${paths.length} paths`);

  writeFileSync(PATHS_FILE, JSON.stringify(paths, null, 2));
}
