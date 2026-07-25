#!/usr/bin/env node
// Every proper noun in the event data must have an Arabic and a French form in
// one of the registries. A name with no entry falls back to English, which
// renders silently: the page looks fine and an Arabic reader sees Latin script
// in the middle of Arabic prose. This makes that gap loud.
//
// Pass --orphans to also list registry entries no event cites. That list is
// advisory, not a failure: the registries deliberately carry alternate
// spellings so both forms resolve, and author names used only by the about page
// through `src/config/sources.ts`.

import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EVENTS = path.join(ROOT, "data", "events");
const CONFIG = path.join(ROOT, "src", "config");

// The registries are TypeScript, so read the keys rather than importing them.
// A key is a quoted string at the start of an object entry.
function registryKeys(file, ...constants) {
  const source = readFileSync(path.join(CONFIG, file), "utf8");
  const keys = new Set();
  for (const constant of constants) {
    const start = source.indexOf(constant);
    if (start === -1) continue;
    const body = source.slice(start);
    for (const match of body.matchAll(/^\s{2}(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*:/gm)) {
      keys.add((match[1] ?? match[2]).replace(/\\'/g, "'").replace(/\\"/g, '"'));
    }
  }
  return keys;
}

const figures = registryKeys("figures.ts", "FIGURE_NAMES");
const names = registryKeys(
  "names.ts",
  "SOURCE_NAMES",
  "MONTH_NAMES",
  "SURAH_NAMES",
  "YEAR_PHRASES",
);

// field -> which registry has to carry it
const FIELDS = [
  { collect: (e) => e.keyFigures ?? [], registry: figures, label: "keyFigures" },
  {
    collect: (e) => (e.hadithReferences ?? []).map((r) => r.narrator),
    registry: figures,
    label: "narrator",
  },
  { collect: (e) => e.primarySources ?? [], registry: names, label: "primarySources" },
  {
    collect: (e) => (e.hadithReferences ?? []).map((r) => r.source),
    registry: names,
    label: "hadith source",
  },
  {
    collect: (e) => (e.quranReferences ?? []).map((r) => r.surahName),
    registry: names,
    label: "surahName",
  },
  { collect: (e) => [e.month], registry: names, label: "month" },
  { collect: (e) => [e.year], registry: names, label: "year" },
];

const missing = new Map();
const seen = new Set();

for (const file of readdirSync(EVENTS).filter((f) => f.endsWith(".json"))) {
  const data = JSON.parse(readFileSync(path.join(EVENTS, file), "utf8"));
  for (const event of data.events) {
    for (const { collect, registry, label } of FIELDS) {
      for (const value of collect(event)) {
        if (typeof value !== "string" || !value.trim()) continue;
        seen.add(value);
        if (registry.has(value)) continue;
        // Numeric year and month values are formatted, not looked up.
        if (label === "year" || label === "month") continue;
        const key = `${label}: ${value}`;
        if (!missing.has(key)) missing.set(key, new Set());
        missing.get(key).add(event.id);
      }
    }
  }
}

const orphans = [...figures, ...names].filter((key) => !seen.has(key));

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const [key, events] of missing) {
    console.error(`no localized form for ${key}  (${[...events].sort().join(", ")})`);
  }
  if (process.argv.includes("--orphans")) {
    for (const key of orphans) {
      console.error(`registry entry "${key}" is not cited by any event`);
    }
  }
  console.error(
    `\n${seen.size} proper nouns in the data, ${missing.size} without a localized form ` +
      `(${orphans.length} registry entries uncited, run with --orphans to list)`,
  );
  process.exit(missing.size ? 1 : 0);
}
