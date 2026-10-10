# Sources and methodology

What each kind of content on the site rests on, what a script checks, and what nothing checks.

## Works the events name

Each event lists the works its account draws on. The list below is the set of works that appear across the 49 events and on the about page (`src/config/sources.ts`). It says where an account comes from. It is not a record that every sentence was checked against every work.

**Hadith collections**
- Sahih al-Bukhari, Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)
- Sahih Muslim, Imam Muslim ibn al-Hajjaj (d. c. 875 CE)
- Jami' at-Tirmidhi, Imam Abu Isa at-Tirmidhi (d. 892 CE)
- Sunan Abu Dawud, Imam Abu Dawud as-Sijistani (d. 889 CE)
- Sunan Ibn Majah

**Seerah works**
- Ar-Raheeq Al-Makhtum (The Sealed Nectar), Sheikh Safiur Rahman al-Mubarakpuri. The order of the events and the frame for each account.
- Sirat Rasul Allah, Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)

**Other works named in the events**
- Musnad Ahmad, Imam Ahmad ibn Hanbal
- As-Sunan al-Kubra, al-Bayhaqi
- Al-Mustadrak, al-Hakim
- Abu Ubayd's Kitab al-Amwal

Death years follow the English Wikipedia entry for each author, with "c." where that entry gives an approximate year.

## Qur'an passages

The site shows 36 passages. The text is fetched, never typed: `npm run fetch:scripture` reads each cited ayah range from api.alquran.cloud in three editions and writes it back to the event data.

| Language | Edition |
|---|---|
| Arabic | `quran-uthmani` |
| English | `en.sahih` (Saheeh International) |
| French | `fr.hamidullah` (Hamidullah) |

The three come from the same ayah range, so they describe the same passage. `npm run fetch:scripture -- --check` compares the stored text with the editions without writing. The basmalah is dropped from the opening ayah of a range where the edition prepends it, because the citation does not cover it.

## Hadith

The events cite 54 hadith references, which are 50 distinct narrations, because some narrations are used under more than one event. `data/citation-review.json` has one entry for each narration. An entry names the narrator, the wording that was confirmed at the collection under the number the event cites, the grading shown on the page, and where it was read. 48 were read at sunnah.com. Two were read at dorar.net because no sunnah.com collection carries them: al-Hakim's Mustadrak 5777 and al-Bayhaqi's Sunan al-Kubra 13211.

What a page shows depends on where the text came from:

- For the 52 references read at sunnah.com, the Arabic and the English are pasted from the page for that collection and number, and each page says so. sunnah.com publishes no French, so French pages show the English with a note to that effect. Where only part of a narration is shown, the page says that the narration continues beyond the words shown. The sunnah.com text is kept as published, including its own misprints and its English additions in parentheses.
- For the two references sunnah.com does not carry, the Arabic was read at dorar.net and the English and French are renderings made for this project. They are marked `translationProvenance: "project"` in the data and labelled on the page. Read them against the Arabic.

`npm run verify:citations` runs before every build. It fails when a cited hadith has no entry, when an entry is no longer cited, and when an entry marked verified names no source. It does not decide whether a narration is the right one for its event. It makes sure none is unaccounted for.

### Gradings

Narrations in Sahih al-Bukhari and Sahih Muslim are shown as sahih because of the collection they are in; those collections carry no separate grading line. For the others the record names the grader. Across the 54 references: 48 sahih, 3 hasan, 1 hasan sahih, 1 da'if and 1 mursal.

- Jami' at-Tirmidhi 324 and 3681 and Sunan Ibn Majah 150: hasan (Darussalam).
- Sunan Abu Dawud 499: hasan sahih (al-Albani).
- Jami' at-Tirmidhi 3620, the meeting with the monk Bahira: da'if (Darussalam), while al-Tirmidhi himself calls it hasan gharib. It stays because the episode is standard in the seerah literature, and the page shows the grading so the reader can weigh it.
- Al-Mustadrak 5777, the words to the family of Yasir: sahih on the condition of Muslim (al-Hakim, agreed by adh-Dhahabi).
- Al-Bayhaqi's Sunan al-Kubra 13211, the Hilf al-Fudul report: the chain is sahih but mursal, and corroborating narrations strengthen it (al-Albani, Fiqh as-Sirah, p. 72).

When a narration replaced an earlier citation for the same event, the entry's `note` says what it replaced and why.

## Names

`scripts/verify-names.mjs` fails the build when a proper noun in the data has no Arabic or French form in the registries under `src/config`, and `--orphans` also reports registry entries no data uses. It checks that a form exists, not that the spelling is the preferred one.

## Dates

Each event stores a Hijri reading (counted in years before the Hijrah, BH, or after it, AH), a Gregorian reading, and, for 25 of the 49 events, a Hijri month. A month is stored only where a fetched source gives one.

- A date marked `c.` is approximate, or is a range, because the sources differ. English reads "c.", Arabic reads "نحو", French reads "vers".
- Years before the Hijrah are counted back in lunar years from 1 Muharram, 1 AH. A source that counts elapsed years may give a number one lower, and Ar-Raheeq al-Makhtum's "Nth year of prophethood" has no single mapping, so those events carry a range.
- The Gregorian year is converted from the lunar year with the tabular civil calendar, not taken from a named source, and can be one year out.
- Where the sources give two months, the stored month says so: the change of qiblah reads `Rajab or Sha'ban`.

Where scholars differ on a date, a ruling, or how to read a text, the event page says so and the project does not choose between them. A reader who needs a settled date should consult the works above and a qualified scholar.

## Limits

- The summaries and the paragraphs on why an event matters are written for this site and say which source they follow. This repository does not record a line-by-line check of them against every work listed above.
- The Arabic and French prose has not been reviewed by a native-speaking reader. That includes the era descriptions, the dates written with "نحو" and "vers", the about page, and the interface strings.
- The scripts prove that records exist and that fetched text matches its edition. They do not prove a reading of the sources correct.

This is a study aid, not a substitute for learning the seerah from qualified teachers.

We ask Allah to accept this effort and make it a source of benefit.
