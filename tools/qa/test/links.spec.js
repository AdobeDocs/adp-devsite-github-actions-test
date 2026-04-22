import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const PROD_BASE = 'https://developer.adobe.com';
const STAGE_BASE = 'https://developer-stage.adobe.com';

const paths = JSON.parse(readFileSync('.playwright-paths.json', 'utf-8'));

// Link checks only need one browser
test.skip(({ browserName }) => browserName !== 'chromium', 'Link checks run on Chromium only');

function normalizeHref(href, pageUrl) {
  try {
    const url = new URL(href, pageUrl);
    // Skip pure anchor links (same-page navigation)
    if (url.href === pageUrl || (url.origin + url.pathname + url.search) === (new URL(pageUrl).origin + new URL(pageUrl).pathname + new URL(pageUrl).search)) {
      return null;
    }
    // Strip hash — fragments are client-side only
    if (url.hostname === 'developer-stage.adobe.com') {
      const path = url.pathname.replace(/\/$/, '') || '/';
      return path + url.search || null;
    }
    if (url.hostname === 'developer.adobe.com') {
      // Keep as absolute prod URL — will be checked against prod directly
      url.hash = '';
      const path = url.pathname.replace(/\/$/, '') || '/';
      url.pathname = path;
      return url.href;
    }
    url.hash = '';
    const ext = url.pathname.replace(/\/$/, '') || '/';
    url.pathname = ext;
    return url.href;
  } catch {
    return null;
  }
}

async function extractLinks(page) {
  const pageUrl = page.url();
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('main a[href]')]
      .filter(a => !a.closest('footer') && !a.closest('header') && !a.closest('nav'))
      .map(a => a.getAttribute('href'))
  );
  return [...new Set(
    hrefs
      .map(h => normalizeHref(h, pageUrl))
      .filter(h => h && !h.startsWith('mailto:') && !h.startsWith('javascript:') && h !== '/' && !h.includes('github.com'))
  )].sort();
}

async function checkStatus(request, url) {
  try {
    const res = await request.head(url, { timeout: 10000 });
    return res.status();
  } catch {
    try {
      const res = await request.get(url, { timeout: 10000 });
      return res.status();
    } catch {
      return 0;
    }
  }
}

for (const path of paths) {
  test(`links: ${path}`, async ({ page }, testInfo) => {
    const request = page.request;
    await page.setViewportSize({ width: 1600, height: 900 });

    // Load prod page
    const prodRes = await page.goto(`${PROD_BASE}${path}`);
    const prodPageStatus = prodRes?.status() ?? 0;
    await page.waitForLoadState('load');
    const prodLinks = await extractLinks(page);

    // Load stage page
    const stageRes = await page.goto(`${STAGE_BASE}${path}`);
    const stagePageStatus = stageRes?.status() ?? 0;
    await page.waitForLoadState('load');
    const stageLinks = await extractLinks(page);

    // Page itself is missing from stage
    if (stagePageStatus === 404 && prodPageStatus === 200) {
      await testInfo.attach('link-report', {
        body: [
          '❌ PAGE MISSING FROM STAGE',
          '',
          `  Page: ${STAGE_BASE}${path}`,
          `  Prod status:  ${prodPageStatus} OK`,
          `  Stage status: ${stagePageStatus} Not Found`,
        ].join('\n'),
        contentType: 'text/plain',
      });
      expect(stagePageStatus, `Page missing from stage: ${STAGE_BASE}${path}`).toBe(200);
      return;
    }

    const prodSet = new Set(prodLinks);
    const stageSet = new Set(stageLinks);

    const missingFromStage = prodLinks.filter(l => !stageSet.has(l));
    const newOnStage = stageLinks.filter(l => !prodSet.has(l));

    // For each stage link, check if it's a 404 that prod doesn't also have
    const brokenOnStage = [];
    await Promise.all(
      stageLinks.map(async (link) => {
        const stageUrl = link.startsWith('http') ? link : `${STAGE_BASE}${link}`;
        const stageStatus = await checkStatus(request, stageUrl);
        if (stageStatus === 404) {
          const prodUrl = link.startsWith('http') ? link : `${PROD_BASE}${link}`;
          const prodStatus = await checkStatus(request, prodUrl);
          if (prodStatus !== 404) {
            brokenOnStage.push({ link, stageUrl, stageStatus, prodUrl, prodStatus });
          }
        }
      })
    );

    // Build readable report
    const lines = [`PAGE: ${path}`, ''];

    if (brokenOnStage.length) {
      lines.push(`❌ BROKEN LINKS ON STAGE (${brokenOnStage.length}) — ok on prod, 404 on stage:`);
      for (const { link, stageUrl, stageStatus, prodUrl, prodStatus } of brokenOnStage) {
        lines.push(`  Link text/href: ${link}`);
        lines.push(`  Stage URL:      ${stageUrl}  →  ${stageStatus}`);
        lines.push(`  Prod URL:       ${prodUrl}   →  ${prodStatus}`);
        lines.push('');
      }
    }

    if (missingFromStage.length) {
      lines.push(`⚠️  LINKS ON PROD NOT ON STAGE (${missingFromStage.length}) — may indicate missing nav/content:`);
      for (const l of missingFromStage) lines.push(`  - ${l}`);
      lines.push('');
    }

    if (newOnStage.length) {
      lines.push(`ℹ️  NEW LINKS ON STAGE NOT ON PROD (${newOnStage.length}):`);
      for (const l of newOnStage) lines.push(`  + ${l}`);
    }

    if (brokenOnStage.length || missingFromStage.length || newOnStage.length) {
      await testInfo.attach('link-report', {
        body: lines.join('\n'),
        contentType: 'text/plain',
      });
    }

    expect(
      brokenOnStage.map(b => `${b.link} (stage: ${b.stageStatus}, prod: ${b.prodStatus})`),
      `Broken links on stage for ${path}`
    ).toEqual([]);
  });
}
