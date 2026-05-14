// Build-time transform: public/portfolio.csv -> src/tracks.json
// Reads the CSV, drops rows where Display=no, resolves MP3 durations, sorts by Order,
// and emits the JSON that the React app imports. Exits non-zero on any missing file
// or malformed row so that broken data never reaches production.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import { parseFile as parseAudioFile } from 'music-metadata';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CSV_PATH = resolve(ROOT, 'public/portfolio.csv');
const AUDIO_DIR = resolve(ROOT, 'public/audio');
const OUT_PATH = resolve(ROOT, 'src/tracks.json');
const INDEX_HTML_PATH = resolve(ROOT, 'index.html');
const SITE_BASE_URL = 'https://santhoshguru.github.io/alarmel-portfolio/';
const PERSON_ID = SITE_BASE_URL + '#person';
const JSONLD_MARKER_START = '<!-- AUDIO_LIST_JSONLD:start -->';
const JSONLD_MARKER_END = '<!-- AUDIO_LIST_JSONLD:end -->';

function isYes(v) {
  if (v == null) return true;
  const s = String(v).trim().toLowerCase();
  if (s === '') return true;
  return s === 'yes' || s === 'true' || s === 'y' || s === '1';
}

function formatDuration(seconds) {
  if (!seconds || !Number.isFinite(seconds)) return '';
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ISO 8601 duration — schema.org AudioObject expects this format (PT4M12S).
function isoDuration(seconds) {
  if (!seconds || !Number.isFinite(seconds)) return '';
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  let out = 'PT';
  if (h) out += `${h}H`;
  if (m) out += `${m}M`;
  if (s || (!h && !m)) out += `${s}S`;
  return out;
}

// Cheap deterministic hash so the decorative waveform looks unique per file.
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 1_000_000;
}

async function main() {
  if (!existsSync(CSV_PATH)) {
    console.error(`[build-manifest] CSV not found at ${CSV_PATH}`);
    process.exit(1);
  }

  const csvRaw = readFileSync(CSV_PATH, 'utf8');
  const rows = parse(csvRaw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  const errors = [];
  const kept = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2; // +1 for header, +1 for 1-indexed
    const filename = row.Filename;

    if (!filename) {
      errors.push(`row ${rowNum}: missing Filename`);
      continue;
    }
    if (!isYes(row.Display)) continue;

    const audioPath = resolve(AUDIO_DIR, filename);
    if (!existsSync(audioPath)) {
      errors.push(`row ${rowNum}: file not found in public/audio/: ${filename}`);
      continue;
    }

    const orderRaw = String(row.Order ?? '').trim();
    const order = orderRaw === '' ? null : Number(orderRaw);
    if (orderRaw !== '' && !Number.isFinite(order)) {
      errors.push(`row ${rowNum}: Order must be a number or blank, got "${orderRaw}"`);
      continue;
    }

    kept.push({
      _csvIndex: i,
      _order: order,
      row,
      audioPath,
      filename,
    });
  }

  if (errors.length) {
    console.error('[build-manifest] CSV errors:');
    for (const e of errors) console.error('  - ' + e);
    process.exit(1);
  }

  // Ordered rows first (ascending), then unordered in CSV row order.
  kept.sort((a, b) => {
    const ao = a._order, bo = b._order;
    if (ao != null && bo != null) return ao - bo;
    if (ao != null) return -1;
    if (bo != null) return 1;
    return a._csvIndex - b._csvIndex;
  });

  const tracks = [];
  for (const entry of kept) {
    const { row, audioPath, filename } = entry;
    let durationSec = 0;
    try {
      const meta = await parseAudioFile(audioPath, { duration: true });
      durationSec = meta.format.duration || 0;
    } catch (err) {
      console.error(`[build-manifest] could not read duration for ${filename}: ${err.message}`);
      process.exit(1);
    }

    const id = filename.replace(/\.[^.]+$/, '');
    tracks.push({
      id,
      filename,
      audioUrl: `audio/${filename}`,
      title: row.Title || id,
      category: row.Category || 'Uncategorized',
      description: row.Description || '',
      duration: formatDuration(durationSec),
      durationISO: isoDuration(durationSec),
      seed: hashString(filename),
    });
  }

  writeFileSync(OUT_PATH, JSON.stringify(tracks, null, 2) + '\n', 'utf8');
  console.log(`[build-manifest] wrote ${tracks.length} tracks to src/tracks.json`);

  injectAudioJsonLd(tracks);
}

// Build an ItemList of AudioObjects and inject it between the marker comments
// in index.html. Re-running the script replaces the block in place, so output
// is idempotent.
function injectAudioJsonLd(tracks) {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': SITE_BASE_URL + '#voice-samples',
    name: 'Alarmel Mangai — Voice Samples',
    numberOfItems: tracks.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: tracks.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'AudioObject',
        '@id': SITE_BASE_URL + '#sample-' + t.id,
        name: t.title,
        description: t.description || t.title,
        contentUrl: SITE_BASE_URL + t.audioUrl,
        encodingFormat: 'audio/mpeg',
        duration: t.durationISO,
        inLanguage: 'ta',
        genre: t.category,
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
      },
    })),
  };

  const block =
    JSONLD_MARKER_START +
    '\n<script type="application/ld+json">\n' +
    JSON.stringify(itemList, null, 2) +
    '\n</script>\n' +
    JSONLD_MARKER_END;

  const html = readFileSync(INDEX_HTML_PATH, 'utf8');
  const startIdx = html.indexOf(JSONLD_MARKER_START);
  const endIdx = html.indexOf(JSONLD_MARKER_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.error(`[build-manifest] AUDIO_LIST_JSONLD markers not found in ${INDEX_HTML_PATH}`);
    process.exit(1);
  }
  const next =
    html.slice(0, startIdx) +
    block +
    html.slice(endIdx + JSONLD_MARKER_END.length);

  if (next !== html) {
    writeFileSync(INDEX_HTML_PATH, next, 'utf8');
    console.log(`[build-manifest] injected AudioObject ItemList (${tracks.length} items) into index.html`);
  } else {
    console.log('[build-manifest] index.html AudioObject block already up to date');
  }
}

main().catch((err) => {
  console.error('[build-manifest] fatal:', err);
  process.exit(1);
});
