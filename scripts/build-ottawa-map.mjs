#!/usr/bin/env node
// Fetches Ottawa OSM data from Overpass and bakes a compact JSON for the map.
// Run: node scripts/build-ottawa-map.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'ottawa.json');

const OTTAWA_REL = 4136816;
const AREA = 3600000000 + OTTAWA_REL;

const Q_BOUNDARY = `
[out:json][timeout:120];
rel(${OTTAWA_REL});
out geom;
`;

const Q_WATER = `
[out:json][timeout:120];
area(${AREA})->.a;
(
  way["waterway"="river"](area.a);
  way["waterway"="canal"]["name"~"Rideau",i](area.a);
);
out geom;
`;

const Q_BASEBALL = `
[out:json][timeout:120];
area(${AREA})->.a;
(
  nwr["leisure"="pitch"]["sport"~"baseball|softball",i](area.a);
);
out center;
`;

const Q_CRICKET = `
[out:json][timeout:120];
area(${AREA})->.a;
(
  nwr["leisure"="pitch"]["sport"="cricket"](area.a);
);
out center;
`;

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function overpass(query, label, { minElements = 1 } = {}) {
  let lastErr;
  const attempts = [];
  for (const url of ENDPOINTS) {
    for (let retry = 0; retry < 3; retry++) {
      attempts.push({ url, retry });
    }
  }
  for (const { url, retry } of attempts) {
    try {
      if (retry > 0) await sleep(3000 * retry);
      console.log(`  [${label}] → ${new URL(url).host}${retry ? ` (retry ${retry})` : ''}`);
      const controller = new AbortController();
      const to = setTimeout(() => controller.abort(), 150000);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'atleastplaybaseball-mapbuild/1.0',
        },
        body: 'data=' + encodeURIComponent(query),
        signal: controller.signal,
      }).finally(() => clearTimeout(to));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.elements) throw new Error('no elements field');
      if (json.elements.length < minElements) throw new Error(`only ${json.elements.length} elements, expected ≥ ${minElements}`);
      console.log(`  [${label}]   ok (${json.elements.length} elements)`);
      return json;
    } catch (e) {
      console.warn(`  [${label}]   failed: ${e.message}`);
      lastErr = e;
    }
  }
  throw lastErr;
}

function centerOf(el) {
  if (el.type === 'node') return [el.lon, el.lat];
  if (el.center) return [el.center.lon, el.center.lat];
  if (el.geometry && el.geometry.length) {
    let sx = 0, sy = 0;
    for (const p of el.geometry) { sx += p.lon; sy += p.lat; }
    return [sx / el.geometry.length, sy / el.geometry.length];
  }
  return null;
}

const ringFromGeom = (geom) => geom.map(p => [p.lon, p.lat]);

function buildBoundary(rel) {
  if (!rel.members) return [];
  const segs = [];
  for (const m of rel.members) {
    if (m.type !== 'way' || m.role !== 'outer' || !m.geometry) continue;
    segs.push(ringFromGeom(m.geometry));
  }
  return stitchRings(segs);
}

function stitchRings(segments) {
  const out = [];
  const used = new Array(segments.length).fill(false);
  const eq = (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
  for (let i = 0; i < segments.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    let ring = segments[i].slice();
    let grew = true;
    while (grew) {
      grew = false;
      for (let j = 0; j < segments.length; j++) {
        if (used[j]) continue;
        const s = segments[j];
        const head = ring[0], tail = ring[ring.length - 1];
        const sh = s[0], st = s[s.length - 1];
        if (eq(tail, sh)) { ring = ring.concat(s.slice(1)); used[j] = true; grew = true; }
        else if (eq(tail, st)) { ring = ring.concat(s.slice(0, -1).reverse()); used[j] = true; grew = true; }
        else if (eq(head, st)) { ring = s.slice(0, -1).concat(ring); used[j] = true; grew = true; }
        else if (eq(head, sh)) { ring = s.slice(1).reverse().concat(ring); used[j] = true; grew = true; }
      }
    }
    out.push(ring);
  }
  return out;
}

function rdp(points, eps) {
  if (points.length < 3) return points;
  const sqd = (a, b, p) => {
    const x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y;
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy || 1);
    const tt = Math.max(0, Math.min(1, t));
    const px = x + dx * tt, py = y + dy * tt;
    return (p[0] - px) ** 2 + (p[1] - py) ** 2;
  };
  const keep = new Array(points.length).fill(false);
  keep[0] = keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  const eps2 = eps * eps;
  while (stack.length) {
    const [s, e] = stack.pop();
    let maxD = 0, idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = sqd(points[s], points[e], points[i]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > eps2 && idx !== -1) { keep[idx] = true; stack.push([s, idx], [idx, e]); }
  }
  return points.filter((_, i) => keep[i]);
}

const round = (p, d = 5) => {
  const k = 10 ** d;
  return [Math.round(p[0] * k) / k, Math.round(p[1] * k) / k];
};

function bbox(pts) {
  let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
  for (const [x, y] of pts) { if (x < a) a = x; if (y < b) b = y; if (x > c) c = x; if (y > d) d = y; }
  return [a, b, c, d];
}

async function main() {
  mkdirSync(dirname(OUT), { recursive: true });

  console.log('Fetching boundary…');
  const rb = await overpass(Q_BOUNDARY, 'boundary', { minElements: 1 });
  console.log('Fetching waterways…');
  const rw = await overpass(Q_WATER, 'water', { minElements: 1 });
  console.log('Fetching baseball/softball pitches…');
  const rbb = await overpass(Q_BASEBALL, 'baseball', { minElements: 1 });
  console.log('Fetching cricket pitches…');
  const rc = await overpass(Q_CRICKET, 'cricket', { minElements: 1 });

  const boundaryRel = rb.elements.find(e => e.type === 'relation' && e.id === OTTAWA_REL);
  if (!boundaryRel) throw new Error('No boundary relation found');

  const boundaryRings = buildBoundary(boundaryRel);
  boundaryRings.sort((a, b) => b.length - a.length);
  const boundary = boundaryRings.slice(0, 1).map(r => rdp(r, 0.0008).map(p => round(p)));

  const waters = rw.elements.filter(e => e.type === 'way' && e.tags && (e.tags.waterway === 'river' || e.tags.waterway === 'canal') && e.geometry);
  const rivers = waters.map(w => ({
    name: w.tags.name || '',
    kind: w.tags.waterway,
    line: rdp(ringFromGeom(w.geometry), 0.0006).map(p => round(p)),
  })).filter(w => w.line.length >= 3);

  const toDot = (el) => {
    const c = centerOf(el);
    if (!c) return null;
    return { c: round(c, 5), n: (el.tags && el.tags.name) || '' };
  };
  const dedupe = (arr) => {
    const seen = new Set();
    return arr.filter(d => {
      const k = d.c[0] + ',' + d.c[1];
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  const diamonds = dedupe(rbb.elements.map(toDot).filter(Boolean));
  const pitches = dedupe(rc.elements.map(toDot).filter(Boolean));

  const data = {
    generated: new Date().toISOString(),
    bbox: bbox(boundary[0] || []),
    boundary,
    rivers,
    diamonds,
    pitches,
  };

  writeFileSync(OUT, JSON.stringify(data));
  console.log(`\nWrote ${OUT}`);
  console.log(`  boundary pts: ${boundary[0]?.length || 0}`);
  console.log(`  rivers:       ${rivers.length} (${rivers.reduce((s, r) => s + r.line.length, 0)} pts)`);
  console.log(`  diamonds:     ${diamonds.length}`);
  console.log(`  cricket:      ${pitches.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
