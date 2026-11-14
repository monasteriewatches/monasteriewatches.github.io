// Builds public/tracks/{code}.svg from the f1-circuits GeoJSON dataset
// (github.com/bacinger/f1-circuits, MIT) and sets "outline" in tracks.json.
//
//   git clone --depth 1 https://github.com/bacinger/f1-circuits /tmp/f1c
//   node scripts/build-outlines.mjs [/tmp/f1c]
//
// Tracks with no circuit in the dataset get "outline": null.
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2] ?? '/tmp/f1c';
const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data/tracks.json');
const OUT = path.join(ROOT, 'public/tracks');
const W = 200, H = 140, PAD = 10;

// track code -> dataset circuit id
const IDS = {
  SAK: 'bh-2002', JED: 'sa-2021', MEL: 'au-1953', SUZ: 'jp-1962', SHA: 'cn-2004',
  MIA: 'us-2022', MTL: 'ca-1978', MCO: 'mc-1929', POR: 'pt-2008', SIL: 'gb-1948',
  SPI: 'at-1969', SPA: 'be-1925', HUN: 'hu-1986', MZA: 'it-1922', MAD: 'es-2026',
  BAK: 'az-2016', IST: 'tr-2005', SIN: 'sg-2008', ATX: 'us-2012', MEX: 'mx-1962',
  INT: 'br-1940', LVS: 'us-2023', LUS: 'qa-2004', YAS: 'ae-2009', NUR: 'de-1927',
  IMO: 'it-1953', ZAN: 'nl-1948', IND: 'us-1909', HOC: 'de-1932',
};

function line(geo) {
  const g = (geo.features ? geo.features[0] : geo).geometry ?? geo;
  if (g.type === 'LineString') return g.coordinates;
  if (g.type === 'MultiLineString') return g.coordinates.flat();
  if (g.type === 'Polygon') return g.coordinates[0];
  throw new Error(`unsupported geometry ${g.type}`);
}

fs.mkdirSync(OUT, { recursive: true });
const tracks = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const missing = [];

for (const t of tracks) {
  const id = IDS[t.code];
  const file = id && path.join(SRC, 'circuits', `${id}.geojson`);
  if (!file || !fs.existsSync(file)) {
    t.outline = null;
    missing.push(t.code);
    continue;
  }
  const coords = line(JSON.parse(fs.readFileSync(file, 'utf8')));
  // equirectangular projection around the circuit's mean latitude, y down
  const lat0 = (coords.reduce((s, c) => s + c[1], 0) / coords.length) * (Math.PI / 180);
  const pts = coords.map(([lng, lat]) => [lng * Math.cos(lat0), -lat]);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * PAD) / (maxX - minX), (H - 2 * PAD) / (maxY - minY));
  const ox = (W - (maxX - minX) * s) / 2, oy = (H - (maxY - minY) * s) / 2;
  const d = pts
    .map(([x, y], i) => `${i ? 'L' : 'M'}${(ox + (x - minX) * s).toFixed(1)} ${(oy + (y - minY) * s).toFixed(1)}`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${d}" stroke="currentColor" fill="none" stroke-width="3" stroke-linejoin="round"/></svg>\n`;
  fs.writeFileSync(path.join(OUT, `${t.code}.svg`), svg);
  t.outline = `tracks/${t.code}.svg`;
}

fs.writeFileSync(DATA, JSON.stringify(tracks, null, 2) + '\n');
console.log(`wrote ${tracks.length - missing.length} outlines; missing: ${missing.join(', ') || 'none'}`);
