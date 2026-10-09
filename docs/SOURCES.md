# Sources and methodology

What each kind of content on the site rests on, what is checked by a script, and what is not checked at all.

## Works the events name

Each event lists the works its account draws on. The list below is the set of works that appear across the 49 events and on the about page (`src/config/sources.ts`). It says where an account comes from. It is not a record that every sentence was checked against every work.

**Hadith collections**
- Sahih al-Bukhari, Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)
- Sahih Muslim, Imam Muslim ibn al-Hajjaj (d. 875 CE)
- Jami' at-Tirmidhi, Imam Abu Isa at-Tirmidhi (d. 892 CE)
- Sunan Abu Dawud, Imam Abu Dawud as-Sijistani (d. 889 CE)

**Seerah works**
- Ar-Raheeq Al-Makhtum (The Sealed Nectar), Sheikh Safiur Rahman al-Mubarakpuri. The chronological frame for the events.
- Sirat Rasul Allah, Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)
- Al-Bidaya wan-Nihaya, Imam Ibn Kathir (d. 1373 CE)

**Additional**
- Tafsir Ibn Kathir
- Tabaqat Ibn Sa'd
- Al-Sunan al-Kubra, Imam al-Bayhaqi
- Al-Mustadrak, al-Hakim
- Abu Ubayd's Kitab al-Amwal
- Musnad Ahmad, Imam Ahmad ibn Hanbal

## Qur'an passages

The site shows 36 passages. The text is fetched, never typed: `npm run fetch:scripture` reads each cited ayah range from api.alquran.cloud in three editions and writes it back to the event data.

| Language | Edition |
|---|---|
| Arabic | `quran-uthmani` |
| English | `en.sahih` (Saheeh International) |
| French | `fr.hamidullah` (Hamidullah) |

The three come from the same ayah range, so they describe the same passage. `npm run fetch:scripture -- --check` compares the stored text with the editions without writing. The basmalah is dropped from the opening ayah of a range where the edition prepends it, because the citation does not cover it.

## Hadith citations

The events cite 33 hadith references, 31 distinct citations. `data/citation-review.json` has one entry for each. An entry names the narrator, the wording that was confirmed at the collection, the grading, and where it was read: 29 at sunnah.com, and 2 at dorar.net because no sunnah.com collection carries them (al-Hakim's Mustadrak and al-Bayhaqi's Sunan al-Kubra). The record is the project's own account of that check; the entries can be re-read at those pages.

`npm run verify:citations` runs before every build. It fails when a cited hadith has no entry, when an entry is no longer cited, and when an entry marked verified names no source. It does not decide whether a citation is right. It makes sure none is unaccounted for.

What the record does not cover: the English and French text of each hadith is the project's own abridgement, and the record does not compare it with the Arabic. Those entries are marked `translationProvenance: "project"` in the data and labelled as such on the page. Read them against the Arabic matn, which is the collection's wording.

### Gradings

Every hadith shows the grading its collection gives. Across the 33 references: 28 sahih, 3 hasan, 1 hasan-sahih, 1 da'if. The weak one is the meeting with the monk Bahira, Jami' at-Tirmidhi 3620, graded da'if in Darussalam's grading. It stays because the episode is standard in the seerah literature, and the page shows the grading so the reader can weigh it.

### What checking found

Ten references pointed at a different narration than the story they sat under. Each was replaced, and the entry for the replacement says what it replaced. Two examples:

- Sahih al-Bukhari 4 is Jabir on the pause in revelation. The Aqabah pledge it was cited for is Sahih al-Bukhari 18.
- Sahih al-Bukhari 349 is Abu Dharr on the opening of the chest and has no Buraq. The Buraq narration is Sahih Muslim 162a.

Two references had no number. Both are now traced:

- The words to the family of Yasir are al-Hakim's Mustadrak 5777, from Jabir ibn Abdullah, graded sahih on the condition of Muslim with adh-Dhahabi agreeing. The authenticated wording is "glad tidings, O family of Ammar and family of Yasir". The event had carried the popular wording, "be patient".
- The Hilf al-Fudul report is al-Bayhaqi's Sunan al-Kubra 13211, from Talha ibn Abdullah ibn Awf. Its chain is sahih but mursal, strengthened by corroborating narrations (al-Albani, Fiqh as-Sirah, p. 72).

## Names

`scripts/verify-names.mjs` fails the build when a proper noun in the data has no Arabic or French form in the registries under `src/config`. It checks that a form exists, not that the spelling is the preferred one.

## Dates

Each event stores one Hijri reading and one Gregorian reading. Four carry a qualifier in the month: the first revelation (`Ramadan (17th or 21st)`), the Isra and Mi'raj (`Rajab (according to many scholars)`), the change of qiblah (`Rajab or Sha'ban`), and the conquest of Makkah (`Ramadan (20th)`). Every other date is a single reading, and the site does not list alternatives for it. A reader who needs a settled date should consult the works above and a qualified scholar.

## Limits

- The narrative summaries and significance paragraphs are the project's own prose. This repository does not record a line-by-line check of them against the works listed above.
- The Arabic and French renderings of that prose are unreviewed by a native-speaking reader.
- The scripts prove that records exist and that fetched text matches its edition. They do not prove a reading of the sources correct.

This is a study aid, not a substitute for learning the seerah from qualified teachers.

We ask Allah to accept this effort and make it a source of benefit.
