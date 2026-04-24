import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const PROD_BASE = 'https://developer.adobe.com';
const STAGE_BASE = 'https://developer-stage.adobe.com';

const paths = JSON.parse(readFileSync('.playwright-paths.json', 'utf-8'));

test.skip(({ browserName }) => browserName !== 'chromium', 'Content checks run on Chromium only');

function extractIssues(page) {
  return page.evaluate(() => {
    const problems = [];
    const hints = [];
    const inMain = el => el.closest('main') && !el.closest('header') && !el.closest('footer') && !el.closest('nav');

    // --- Frontmatter ---
    const title = document.title?.trim();
    if (!title) problems.push('FRONTMATTER: Missing <title>');

    const desc = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim();
    if (!desc) problems.push('FRONTMATTER: Missing meta description');

    // --- H1 (warning only — recommended for LLM readability) ---
    const h1s = [...document.querySelectorAll('main h1')];
    if (h1s.length === 0) hints.push('H1: No H1 heading — recommended for LLM/search readability');
    if (h1s.length > 1) hints.push(`H1: Multiple H1s (${h1s.length}) — may confuse search/LLM indexers`);

    // --- Empty headings ---
    const emptyHeadings = [...document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')]
      .filter(h => inMain(h) && !h.textContent?.trim());
    if (emptyHeadings.length)
      problems.push(`STRUCTURE: ${emptyHeadings.length} empty heading(s) — ${emptyHeadings.map(h => h.tagName).join(', ')}`);

    // --- Images missing alt (skip for dev-biz — no way to set alt in Google Drive authoring) ---
    const isDevBiz = document.querySelector('main')?.classList.contains('dev-biz') ?? false;
    if (!isDevBiz) {
      const imgsNoAlt = [...document.querySelectorAll('main img')]
        .filter(img => inMain(img) && !img.closest('.contributors') && !img.closest('.site-wide-banner') && img.getAttribute('alt') === null);
      if (imgsNoAlt.length)
        problems.push(`IMAGES: ${imgsNoAlt.length} img(s) missing alt attribute`);
    }

    // --- Empty EDS block containers (stage-only check, prod is Gatsby so no .block elements) ---
    const excludedBlocks = ['site-wide-banner', 'contributors', 'discover', 'redoclyapiblock', 'side-nav', 'breadcrumbs', 'embed', 'next-prev', 'onthispage', 'fragment'];
    const emptyBlocks = [...document.querySelectorAll('main .block')]
      .filter(b => inMain(b) && !b.textContent?.trim() && !b.querySelector('img, video, iframe'))
      .filter(b => !excludedBlocks.some(name => [...b.classList].some(c => c.includes(name))));
    if (emptyBlocks.length)
      problems.push(`BLOCKS: ${emptyBlocks.length} empty block(s) — ${[...new Set(emptyBlocks.map(b => b.className.replace(' block', '')))].join(', ')}`);

    // --- Tables with inconsistent column counts ---
    for (const table of document.querySelectorAll('main table')) {
      if (!inMain(table)) continue;
      const rows = [...table.querySelectorAll('tr')];
      if (rows.length < 2) continue;
      const counts = rows.map(r => r.querySelectorAll('td, th').length).filter(n => n > 0);
      const expected = counts[0];
      if (counts.some(n => n !== expected))
        problems.push(`BLOCKS: Table with inconsistent columns [${counts.join(', ')}]`);
    }

    // --- Broken on-page anchor links ---
    const brokenAnchors = [...document.querySelectorAll('main a[href^="#"]')]
      .filter(a => inMain(a) && !a.closest('.redoclyapiblock'))
      .map(a => a.getAttribute('href'))
      .filter(href => href && href.length > 1)
      .filter(href => {
        const id = href.slice(1);
        return !document.getElementById(id) && !document.querySelector(`[name="${id}"]`);
      });
    if (brokenAnchors.length)
      problems.push(`LINKS: ${brokenAnchors.length} broken anchor(s) — ${brokenAnchors.slice(0, 5).join(', ')}`);

    // --- Unrendered markdown leaking into page (block/render failure) ---
    const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
    let node;
    const mdLeaks = [];
    while ((node = walker.nextNode())) {
      const t = node.textContent;
      if (/^\s*(#{1,6} \S|^\*\*\S.*\*\*$|\|\s*[-:]+\s*\|)/.test(t.trim()))
        mdLeaks.push(t.trim().slice(0, 60));
    }
    if (mdLeaks.length)
      problems.push(`RENDER: Unrendered markdown in page — ${mdLeaks.slice(0, 3).join(' | ')}`);

    return { issues: problems, warnings: hints };
  });
}

for (const path of paths) {
  test(`content: ${path}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 900 });

    const stageRes = await page.goto(`${STAGE_BASE}${path}`);
    if (stageRes?.status() === 404) return; // covered by links check
    await page.waitForLoadState('load');
    const { issues: stageIssues, warnings } = await extractIssues(page);

    // Load prod to filter out pre-existing issues (prod is Gatsby — only compare
    // checks that are meaningful across both frameworks: title, description, anchors)
    const prodRes = await page.goto(`${PROD_BASE}${path}`);
    let prodIssues = new Set();
    if (prodRes?.status() === 200) {
      await page.waitForLoadState('load');
      const { issues: pi } = await extractIssues(page);
      // Only carry over non-block issues from prod (blocks are EDS-specific)
      prodIssues = new Set(pi.filter(i => !i.startsWith('BLOCKS:')));
    }

    // Only flag issues that are new on stage (not already broken on prod)
    const issues = stageIssues.filter(i => i.startsWith('BLOCKS:') || !prodIssues.has(i));

    if (issues.length || warnings.length) {
      const lines = [`PAGE: ${path}`, ''];
      if (issues.length) lines.push(...issues.map(i => `  ❌  ${i}`));
      if (warnings.length) lines.push('', ...warnings.map(w => `  💡  ${w}`));
      await testInfo.attach('content-report', { body: lines.join('\n'), contentType: 'text/plain' });
    }

    for (const w of warnings) {
      testInfo.annotations.push({ type: 'warning', description: w });
    }

    expect(issues, `Content issues on stage for ${path}`).toEqual([]);
  });
}
