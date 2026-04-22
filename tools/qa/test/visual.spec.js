import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync } from 'fs';

const PROD_BASE = 'https://developer.adobe.com';
const STAGE_BASE = 'https://developer-stage.adobe.com';

const paths = JSON.parse(readFileSync('.playwright-paths.json', 'utf-8'));

function buildDiff(imgA, imgB) {
  const a = PNG.sync.read(imgA);
  const b = PNG.sync.read(imgB);
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);

  const cropData = (src) => {
    const out = new PNG({ width, height });
    PNG.bitblt(src, out, 0, 0, width, height, 0, 0);
    return out;
  };

  const croppedA = cropData(a);
  const croppedB = cropData(b);
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(croppedA.data, croppedB.data, diff.data, width, height, { threshold: 0.1 });

  return { diffPixels, diffBuffer: PNG.sync.write(diff), totalPixels: width * height };
}

async function waitForNav(page) {
  const isDevBiz = await page.evaluate(() => document.querySelector('main')?.classList.contains('dev-biz') ?? false);
  if (isDevBiz) return;
  try {
    await page.waitForSelector('nav, aside, [class*="sidenav"], [class*="side-nav"], [class*="sidebar"]', {
      state: 'visible',
      timeout: 15000,
    });
  } catch {
    // nav selector didn't match, continue anyway
  }
}

async function scrollFully(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let lastHeight = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, window.innerHeight);
        if (document.body.scrollHeight === lastHeight) {
          clearInterval(interval);
          window.scrollTo(0, 0);
          resolve();
        }
        lastHeight = document.body.scrollHeight;
      }, 300);
    });
  });
  await page.waitForLoadState('networkidle');
}

test.skip(({ browserName }) => browserName !== 'chromium', 'Visual diff runs on Chromium only');

for (const path of paths) {
  test(`visual diff: ${path}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto(`${PROD_BASE}${path}`);
    await page.waitForLoadState('networkidle');
    await waitForNav(page);
    await scrollFully(page);
    const prodScreenshot = await page.screenshot({ fullPage: true });

    await page.goto(`${STAGE_BASE}${path}`);
    await page.waitForLoadState('networkidle');
    await waitForNav(page);
    await scrollFully(page);
    const stageScreenshot = await page.screenshot({ fullPage: true });

    const { diffPixels, diffBuffer, totalPixels } = buildDiff(prodScreenshot, stageScreenshot);
    const diffPercent = (diffPixels / totalPixels * 100).toFixed(2);
    const threshold = parseFloat(process.env.DIFF_THRESHOLD ?? '5');

    const slug = path.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
    await testInfo.attach(`prod-${slug}`, { body: prodScreenshot, contentType: 'image/png' });
    await testInfo.attach(`stage-${slug}`, { body: stageScreenshot, contentType: 'image/png' });
    await testInfo.attach(`diff-${slug}`, { body: diffBuffer, contentType: 'image/png' });
    await testInfo.attach('diff-summary', {
      body: `Diff: ${diffPercent}% (${diffPixels} / ${totalPixels} pixels) — threshold: ${threshold}%`,
      contentType: 'text/plain',
    });

    expect(parseFloat(diffPercent), `${path} differs by ${diffPercent}% (threshold: ${threshold}%)`).toBeLessThanOrEqual(threshold);
  });
}
