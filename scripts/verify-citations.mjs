#!/usr/bin/env node
// Every hadith cited in an event must have an entry in the verification record,
// and every entry must still be cited. This does not prove a citation is right;
// it proves none is unaccounted for. Correctness comes from the per-entry
// record of what was read at sunnah.com under that number.

import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EVENTS = path.join(ROOT, "data", "events");
const RECORD = path.join(ROOT, "data", "citation-review.json");

const failures = [];

function key(reference) {
  return reference.hadithNumber
    ? `${reference.source} ${reference.hadithNumber}`
    : reference.source;
}

const cited = new Map();
for (const file of readdirSync(EVENTS).filter((f) => f.endsWith(".json"))) {
  const data = JSON.parse(readFileSync(path.join(EVENTS, file), "utf8"));
  for (const event of data.events) {
    for (const reference of event.hadithReferences ?? []) {
      const id = key(reference);
      if (!cited.has(id)) cited.set(id, []);
      cited.get(id).push(event.id);
    }
  }
}

const record = JSON.parse(readFileSync(RECORD, "utf8"));
const entries = record.citations ?? {};

if (Object.keys(entries).length === 0) {
  failures.push("citation-review.json has no entries");
}

for (const id of cited.keys()) {
  if (!(id in entries)) failures.push(`no verification entry for "${id}"`);
}

for (const id of Object.keys(entries)) {
  if (!cited.has(id)) {
    failures.push(`verification entry for "${id}" is no longer cited in any event`);
  }
}

for (const [id, entry] of Object.entries(entries)) {
  if (!["verified", "unresolved"].includes(entry.status)) {
    failures.push(`"${id}" has an unrecognised status: ${entry.status}`);
  }
  if (entry.status === "verified" && !entry.checkedAgainst) {
    failures.push(`"${id}" is marked verified but names no source it was checked against`);
  }
}

const verified = Object.values(entries).filter((e) => e.status === "verified").length;
const total = Object.keys(entries).length;

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const failure of failures) console.error(failure);
  console.error(
    `\n${total} hadith citations, ${verified} read at the collection, ` +
      `${total - verified} with no collection to read`,
  );
  console.error(`${failures.length} citation violations`);
  process.exit(failures.length ? 1 : 0);
}
