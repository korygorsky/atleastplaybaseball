#!/usr/bin/env node
// Processes ottawa.raw.json (Overpass response) into src/data/ottawa.json.
// Run: node scripts/process-ottawa-raw.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IN = join(ROOT, 'ottawa.raw.json');
const OUT = join(ROOT, 'src', 'data', 'ottawa.json');

const OTTAWA_REL = 4136816;

const raw = JSON.parse(readFileSync(IN, 'utf8'));
const elements = raw.elements || [];

const centerOf = (el) => {
  if (el.type === 'node') return [el.lon, el.lat];
  if (el.center) return [el.center.lon, el.center.lat];
  if (el.geometry && el.geometry.length) {
    let sx = 0, sy = 0;
    for (const p of el.geometry) { sx += p.lon; sy += p.lat; }
    return [sx / el.geometry.length, sy / el.geometry.length];
  }
  return null;
};

const ringFromGeom = (geom) => geom.map(p => [p.lon, p.lat]);

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

// --- Process ---
const boundaryRel = elements.find(e => e.type === 'relation' && e.id === OTTAWA_REL);
if (!boundaryRel) throw new Error('No boundary relation in raw file');

const outerSegs = (boundaryRel.members || [])
  .filter(m => m.type === 'way' && m.role === 'outer' && m.geometry)
  .map(m => ringFromGeom(m.geometry));

const stitched = stitchRings(outerSegs);
stitched.sort((a, b) => b.length - a.length);
const boundary = stitched.slice(0, 1).map(r => rdp(r, 0.0008).map(p => round(p)));

const waterways = elements.filter(e =>
  e.type === 'way' && e.tags && (e.tags.waterway === 'river' || e.tags.waterway === 'canal') && e.geometry
);
const rivers = waterways
  .map(w => ({
    name: w.tags.name || '',
    kind: w.tags.waterway,
    line: rdp(ringFromGeom(w.geometry), 0.0006).map(p => round(p)),
  }))
  .filter(w => w.line.length >= 3);

const toDot = (el) => {
  const c = centerOf(el);
  if (!c) return null;
  return { c: round(c, 5) };
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

const baseball = elements.filter(e => e.tags && e.tags.leisure === 'pitch' && e.tags.sport && /baseball|softball/i.test(e.tags.sport));
const cricket = elements.filter(e => e.tags && e.tags.leisure === 'pitch' && e.tags.sport === 'cricket');

const diamonds = dedupe(baseball.map(toDot).filter(Boolean));
const pitches = dedupe(cricket.map(toDot).filter(Boolean));

const data = {
  generated: new Date().toISOString(),
  bbox: bbox(boundary[0] || []),
  boundary,
  rivers,
  diamonds,
  pitches,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data));

console.log(`Wrote ${OUT}`);
console.log(`  boundary pts: ${boundary[0]?.length || 0}`);
console.log(`  rivers:       ${rivers.length} (${rivers.reduce((s, r) => s + r.line.length, 0)} pts)`);
console.log(`  diamonds:     ${diamonds.length}`);
console.log(`  cricket:      ${pitches.length}`);
console.log(`  output size:  ${Math.round(JSON.stringify(data).length / 1024)} KB`);
