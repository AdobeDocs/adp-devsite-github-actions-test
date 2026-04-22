import { test, expect } from '@playwright/test';

const PROD_BASE = 'https://developer.adobe.com';
const STAGE_BASE = 'https://developer-stage.adobe.com';

// Use the root path of the prefix as a representative page to check nav/footer
const PATH_PREFIX = process.env.PATH_PREFIX || '/';
const CHECK_PATH = PATH_PREFIX.endsWith('/') ? PATH_PREFIX : PATH_PREFIX + '/';

test.skip(({ browserName }) => browserName !== 'chromium', 'Nav checks run on Chromium only');

function normalizeHref(href, pageUrl) {
  try {
    const url = new URL(href, pageUrl);
    if ((url.origin + url.pathname + url.search) === (new URL(pageUrl).origin + new URL(pageUrl).pathname + new URL(pageUrl).search)) return null;
    if (url.hostname === 'developer-stage.adobe.com') {
      const path = url.pathname.replace(/\/$/, '') || '/';
      return path + url.search || null;
    }
    if (url.hostname === 'developer.adobe.com') {
      url.hash = '';
      const path = url.pathname.replace(/\/$/, '') || '/';
      url.pathname = path;
      return url.href;
    }
    url.hash = '';
    const ext = url.pathname.replace(/\/$/, '') || '/';
    url.pathname = ext;
    return url.href;
  } catch { return null; }
}

async function extractSectionLinks(page, selector) {
  const pageUrl = page.url();
  const hrefs = await page.evaluate((sel) =>
    [...document.querySelectorAll(sel + ' a[href]')]
      .filter(a => {
        const r = a.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .map(a => a.getAttribute('href')),
    selector
  );
  return [...new Set(
    hrefs
      .map(h => normalizeHref(h, pageUrl))
      .filter(h => h && !h.startsWith('mailto:') && !h.startsWith('javascript:') && h !== '/')
  )].sort();
}

async function checkStatus(request, url) {
  try {
    const res = await request.head(url, { timeout: 10000 });
    return res.status();
  } catch {
    try { return (await request.get(url, { timeout: 10000 })).status(); }
    catch { return 0; }
  }
}

for (const section of ['header', 'footer']) {
  test(`nav: ${section} links match on ${CHECK_PATH}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    const request = page.request;

    await page.goto(`${PROD_BASE}${CHECK_PATH}`);
    await page.waitForLoadState('load');
    const prodLinks = await extractSectionLinks(page, section);

    await page.goto(`${STAGE_BASE}${CHECK_PATH}`);
    await page.waitForLoadState('load');
    const stageLinks = await extractSectionLinks(page, section);

    const prodSet = new Set(prodLinks);
    const stageSet = new Set(stageLinks);
    const missingFromStage = prodLinks.filter(l => !stageSet.has(l));
    const newOnStage = stageLinks.filter(l => !prodSet.has(l));

    // Check for 404s on stage links not also 404 on prod
    const brokenOnStage = [];
    await Promise.all(
      stageLinks.map(async (link) => {
        const stageUrl = link.startsWith('http') ? link : `${STAGE_BASE}${link}`;
        const stageStatus = await checkStatus(request, stageUrl);
        if (stageStatus === 404) {
          const prodUrl = link.startsWith('http') ? link : `${PROD_BASE}${link}`;
          const prodStatus = await checkStatus(request, prodUrl);
          if (prodStatus !== 404) brokenOnStage.push({ link, stageUrl, stageStatus, prodUrl, prodStatus });
        }
      })
    );

    const lines = [`${section.toUpperCase()} NAV: ${CHECK_PATH}`, ''];
    if (brokenOnStage.length) {
      lines.push(`❌ BROKEN LINKS (${brokenOnStage.length}) — ok on prod, 404 on stage:`);
      for (const { link, stageUrl, stageStatus, prodUrl, prodStatus } of brokenOnStage) {
        lines.push(`  href:  ${link}`);
        lines.push(`  stage: ${stageUrl}  →  ${stageStatus}`);
        lines.push(`  prod:  ${prodUrl}  →  ${prodStatus}`);
        lines.push('');
      }
    }
    if (missingFromStage.length) {
      lines.push(`⚠️  MISSING FROM STAGE (${missingFromStage.length}):`);
      for (const l of missingFromStage) lines.push(`  - ${l}`);
      lines.push('');
    }
    if (newOnStage.length) {
      lines.push(`ℹ️  NEW ON STAGE (${newOnStage.length}):`);
      for (const l of newOnStage) lines.push(`  + ${l}`);
    }

    if (brokenOnStage.length || missingFromStage.length || newOnStage.length) {
      await testInfo.attach(`${section}-link-report`, {
        body: lines.join('\n'),
        contentType: 'text/plain',
      });
    }

    expect(
      brokenOnStage.map(b => `${b.link} (stage: ${b.stageStatus}, prod: ${b.prodStatus})`),
      `Broken ${section} links on stage`
    ).toEqual([]);
  });
}
