#!/usr/bin/env node
// Fetches the Quranic text for every reference in data/events from published
// editions and writes it back. It never translates: Arabic is Uthmani, English
// is Saheeh International, French is Hamidullah, and each comes from the
// edition itself so the three columns say the same thing by construction.
//
// Run with --check to compare without writing.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EVENTS = path.join(ROOT, "data", "events");
const API = "https://api.alquran.cloud/v1/ayah";

const EDITIONS = {
  textArabic: "quran-uthmani",
  textEnglish: "en.sahih",
  textFrench: "fr.hamidullah",
};

// The Uthmani edition carries the basmalah on the opening ayah of every surah
// but al-Fatihah and at-Tawbah, where it is not part of the ayah. Quoting it
// inside a verse would put words in the citation that the citation does not
// cover.
// Matched without diacritics because the edition's vowel marks are not stable
// enough to compare against a literal.
const BASMALAH = /^[^\s]*ب[^\s]*س[^\s]*م[^\s]*\s+[^\s]*ل[^\s]*ل[^\s]*ه[^\s]*\s+[^\s]*ر[^\s]*ح[^\s]*م[^\s]*ن[^\s]*\s+[^\s]*ر[^\s]*ح[^\s]*ي[^\s]*م[^\s]*\s+/u;

// The stored Arabic separates ayahs with the end-of-ayah mark rather than a
// bare space, which is how the reader sees the boundary.
const AYAH_MARK = " ۝ ";

const cache = new Map();

async function ayah(surah, number, edition) {
  const key = `${surah}:${number}/${edition}`;
  if (cache.has(key)) return cache.get(key);
  const response = await fetch(`${API}/${key}`);
  const payload = await response.json();
  if (payload.code !== 200) throw new Error(`${key} not found`);
  let text = payload.data.text;
  if (number === 1 && surah !== 1 && surah !== 9 && edition === EDITIONS.textArabic) {
    text = text.replace(BASMALAH, "").trim();
  }
  cache.set(key, text);
  return text;
}

function ayahNumbers(range) {
  const [first, last] = String(range).split("-").map(Number);
  const end = Number.isFinite(last) ? last : first;
  return Array.from({ length: end - first + 1 }, (_, i) => first + i);
}

async function passage(surah, range, edition) {
  const parts = [];
  for (const number of ayahNumbers(range)) {
    parts.push(await ayah(surah, number, edition));
  }
  return parts.join(edition === EDITIONS.textArabic ? AYAH_MARK : " ");
}

const check = process.argv.includes("--check");
let changed = 0;
let unchanged = 0;

for (const file of readdirSync(EVENTS).filter((f) => f.endsWith(".json"))) {
  const full = path.join(EVENTS, file);
  const data = JSON.parse(readFileSync(full, "utf8"));
  let touched = false;

  for (const event of data.events) {
    for (const reference of event.quranReferences ?? []) {
      for (const [field, edition] of Object.entries(EDITIONS)) {
        const text = await passage(reference.surah, reference.ayahRange, edition);
        if (reference[field] === text) {
          unchanged += 1;
          continue;
        }
        changed += 1;
        if (check) {
          console.log(
            `${event.id} ${reference.surah}:${reference.ayahRange} ${field}\n` +
              `  stored: ${(reference[field] ?? "(none)").slice(0, 90)}\n` +
              `  ${edition}: ${text.slice(0, 90)}`,
          );
        } else {
          reference[field] = text;
        }
        touched = true;
      }
      if (!check) reference.translationProvenance = "fetched";
    }
  }

  if (touched && !check) {
    writeFileSync(full, JSON.stringify(data, null, 2) + "\n", "utf8");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`\n${changed} fields ${check ? "differ from" : "written from"} the published editions`);
  console.log(`${unchanged} already matched`);
}
