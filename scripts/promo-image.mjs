/**
 * Render the square promo image for WhatsApp and LinkedIn.
 *
 * Built as HTML and screenshotted rather than drawn in a design tool, so the
 * colours and font come from the same place the site does. A forwarded image
 * that looks like the site is worth more than a prettier one that does not.
 *
 * 1080x1080: WhatsApp shows it uncropped in a chat, and LinkedIn accepts it as
 * a carousel cover without recropping.
 *
 *   node scripts/promo-image.mjs
 *
 * Requires playwright (dev only): npm i -D playwright && npx playwright install chromium
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'content', 'promo');
mkdirSync(OUT, { recursive: true });

const PAPER = '#F8F7F5';
const INK = '#1A1815';
const BODY = '#57534E';
const MUTED = '#7C7873';
const ACCENT = '#C2410C';

/**
 * The stat leads because it is the only thing that survives at thumbnail size.
 * Someone scrolling WhatsApp sees roughly two lines — they have to be the two
 * that make the point.
 */
const page = (headline, sub, stat, statLabel, foot) => `
<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1080px; background:${PAPER};
         font-family:'Plus Jakarta Sans',system-ui,sans-serif;
         display:flex; flex-direction:column; justify-content:space-between;
         padding:88px 80px; }
  .brand { font-size:30px; font-weight:800; color:${INK}; letter-spacing:-0.5px; }
  .brand span { color:${ACCENT}; }
  h1 { font-size:82px; line-height:1.06; font-weight:800; color:${INK};
       letter-spacing:-2.5px; }
  h1 em { font-style:normal; color:${ACCENT}; }
  .sub { margin-top:34px; font-size:33px; line-height:1.45; color:${BODY}; font-weight:400; }
  .statbox { display:flex; align-items:baseline; gap:26px; margin-top:56px;
             border-top:3px solid ${ACCENT}; padding-top:34px; }
  .stat { font-size:118px; font-weight:800; color:${ACCENT}; letter-spacing:-4px; line-height:1; }
  .statlabel { font-size:30px; color:${BODY}; font-weight:600; line-height:1.3; }
  .foot { font-size:27px; color:${MUTED}; font-weight:600; }
</style></head><body>
  <div class="brand">NazSats<span> AI</span></div>
  <div>
    <h1>${headline}</h1>
    <div class="sub">${sub}</div>
    <div class="statbox">
      <div class="stat">${stat}</div>
      <div class="statlabel">${statLabel}</div>
    </div>
  </div>
  <div class="foot">${foot}</div>
</body></html>`;

const VARIANTS = [
  {
    name: 'cv-tailor-square',
    html: page(
      'Your CV never<br>reached a <em>human</em>.',
      'Software screens it first, scores the overlap with the job, and sorts everyone. Most people never get past it.',
      '0',
      'skills invented across<br>100 tested rewrites',
      'ai.nazsats.com — free prompt, no signup',
    ),
  },
  {
    name: 'cv-tailor-square-alt',
    html: page(
      'I gave it <em>313</em> chances to lie about someone.',
      'Ten CVs, ten job descriptions, every combination. Each time a job wanted something the CV could not back up.',
      '0',
      'times it took<br>the opportunity',
      'ai.nazsats.com — free prompt, no signup',
    ),
  },
];

const browser = await chromium.launch();
for (const v of VARIANTS) {
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1080 } });
  const p = await ctx.newPage();
  await p.setContent(v.html, { waitUntil: 'networkidle' });
  // Webfonts land after networkidle occasionally; a beat avoids a fallback-font render.
  await p.waitForTimeout(900);
  await p.screenshot({ path: path.join(OUT, `${v.name}.png`) });
  console.log('wrote', path.join('content/promo', `${v.name}.png`));
  await ctx.close();
}
await browser.close();
