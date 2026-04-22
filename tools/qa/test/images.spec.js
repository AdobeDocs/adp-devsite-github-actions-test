import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const PROD_BASE = 'https://developer.adobe.com';
const STAGE_BASE = 'https://developer-stage.adobe.com';

const paths = JSON.parse(readFileSync('.playwright-paths.json', 'utf-8'));

test.skip(({ browserName }) => browserName !== 'chromium', 'Image checks run on Chromium only');

async function getBrokenImages(page, baseUrl, path) {
  await page.goto(`${baseUrl}${path}`);
  await page.waitForLoadState('load');
  return page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter(img => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
      .map(img => { try { return new URL(img.src).pathname; } catch { return img.src; } })
  );
}

for (const path of paths) {
  test(`images: ${path}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 900 });

    const prodBroken = await getBrokenImages(page, PROD_BASE, path);
    const stageBroken = await getBrokenImages(page, STAGE_BASE, path);

    const prodBrokenSet = new Set(prodBroken);
    const newlyBroken = stageBroken.filter(img => !prodBrokenSet.has(img));

    if (newlyBroken.length) {
      await testInfo.attach('image-report', {
        body: [
          `PAGE: ${path}`, '',
          `❌ MISSING IMAGES ON STAGE (${newlyBroken.length}) — ok on prod, broken on stage:`,
          ...newlyBroken.map(img => `  - ${img}`),
        ].join('\n'),
        contentType: 'text/plain',
      });
    }

    expect(newlyBroken, `Missing images on stage for ${path}`).toEqual([]);
  });
}
