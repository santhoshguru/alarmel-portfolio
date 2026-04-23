import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const VIEWPORTS = [
  { name: 'iphone-se',  width: 375,  height: 812 },
  { name: 'iphone-13',  width: 390,  height: 844 },
  { name: 'pixel-7',    width: 412,  height: 915 },
  { name: 'ipad-mini',  width: 768,  height: 1024 },
  { name: 'ipad-pro',   width: 1024, height: 1366 },
  { name: 'desktop',    width: 1440, height: 900 },
];

const SHOT_DIR = path.join(process.cwd(), 'test-results', 'responsive');
fs.mkdirSync(SHOT_DIR, { recursive: true });

for (const vp of VIEWPORTS) {
  test(`${vp.name} (${vp.width}×${vp.height}) — no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    // Wait for web fonts so screenshots are comparable run-to-run.
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForLoadState('networkidle');

    const { docW, viewW } = await page.evaluate(() => ({
      docW: document.documentElement.scrollWidth,
      viewW: window.innerWidth,
    }));
    // Allow 1px rounding slop.
    expect(docW, `document scroll-width exceeds viewport at ${vp.name}`).toBeLessThanOrEqual(viewW + 1);

    // Flag any element wider than the viewport whose overflow is NOT being intentionally
    // clipped by an ancestor (e.g. marquee sits inside a wrapper with overflow:hidden — fine).
    // We ignore clipping by html/body itself since that's the page-level safety net and
    // relying on it alone would hide real cropping bugs.
    const overflowing = await page.evaluate((vw) => {
      const clippedByAncestor = (el) => {
        let cur = el.parentElement;
        while (cur && cur !== document.body && cur !== document.documentElement) {
          const s = getComputedStyle(cur);
          if (/hidden|scroll|auto|clip/.test(s.overflowX) || /hidden|scroll|auto|clip/.test(s.overflow)) {
            return true;
          }
          cur = cur.parentElement;
        }
        return false;
      };
      const offenders = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if ((r.width > vw + 1 || r.right > vw + 1) && !clippedByAncestor(el)) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: el.className?.toString().slice(0, 80) || '',
            w: Math.round(r.width),
            right: Math.round(r.right),
          });
          if (offenders.length >= 5) break;
        }
      }
      return offenders;
    }, vp.width);
    expect(overflowing, `elements wider than viewport at ${vp.name}: ${JSON.stringify(overflowing)}`).toEqual([]);

    await page.screenshot({
      path: path.join(SHOT_DIR, `${vp.name}.png`),
      fullPage: true,
    });
  });
}
