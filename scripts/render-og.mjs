#!/usr/bin/env node
// Renders scripts/og-src/og-image.html to public/og-image.png via headless Chrome.
// Run: node scripts/render-og.mjs
// Requires Google Chrome installed at /Applications/Google Chrome.app (macOS).

import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = join(ROOT, 'scripts', 'og-src', 'og-image.html');
const OUT = join(ROOT, 'public', 'og-image.png');

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const chrome = CHROME_CANDIDATES.find(existsSync);
if (!chrome) {
  console.error('No Chrome/Chromium binary found. Install Google Chrome or add a path.');
  process.exit(1);
}

if (!existsSync(SRC)) {
  console.error(`Missing source: ${SRC}`);
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
if (existsSync(OUT)) unlinkSync(OUT);

const url = pathToFileURL(SRC).href;
const args = [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-sandbox',
  '--window-size=1200,630',
  '--default-background-color=00000000',
  '--virtual-time-budget=4000',
  `--screenshot=${OUT}`,
  url,
];

console.log(`Rendering ${SRC}\n → ${OUT}`);
try {
  execFileSync(chrome, args, { stdio: ['ignore', 'inherit', 'inherit'] });
} catch (e) {
  console.error('Chrome failed:', e.message);
  process.exit(1);
}

if (!existsSync(OUT)) {
  console.error('Screenshot not produced.');
  process.exit(1);
}

console.log('OK');
