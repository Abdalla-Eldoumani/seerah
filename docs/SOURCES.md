# Primary Sources & Methodology

## Sources Used for Content Verification

All content in the `/data/events/*.json` files was verified against
the following authenticated Islamic sources:

### Hadith Collections (Primary)
1. **Sahih al-Bukhari** — Compiled by Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE). Considered the most authentic collection of hadith.
2. **Sahih Muslim** — Compiled by Imam Muslim ibn al-Hajjaj (d. 875 CE). The second most authentic collection.
3. **Jami' at-Tirmidhi** — Compiled by Imam Abu Isa at-Tirmidhi (d. 892 CE).
4. **Sunan Abu Dawud** — Compiled by Imam Abu Dawud as-Sijistani (d. 889 CE).

### Seerah Works
5. **Ar-Raheeq Al-Makhtum (The Sealed Nectar)** — By Sheikh Safiur Rahman al-Mubarakpuri. Won first prize in the Muslim World League's worldwide Seerah competition in 1979. The primary reference for chronology and event ordering.
6. **Sirat Rasul Allah** — By Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE). The earliest comprehensive biography of the Prophet ﷺ.
7. **Al-Bidaya wan-Nihaya** — By Imam Ibn Kathir (d. 1373 CE). A comprehensive Islamic history.

### Tafsir (Quran Commentary)
8. **Tafsir Ibn Kathir** — For connecting Quranic verses to specific events.
9. **Asbab al-Nuzul** — By Ali ibn Ahmad al-Wahidi (d. 1075 CE). Occasions of revelation.

### Additional References
10. **Tabaqat Ibn Sa'd** — Biographical encyclopedia of early Muslims.
11. **Al-Sunan al-Kubra** — By Imam al-Bayhaqi.
12. **Musnad Ahmad** — By Imam Ahmad ibn Hanbal.

## Methodology

1. Events were identified from Ar-Raheeq Al-Makhtum as the primary chronological framework
2. Each event was cross-referenced with the hadith collections for supporting narrations
3. Quran references were verified against Asbab al-Nuzul literature and Tafsir Ibn Kathir
4. Dates follow the majority scholarly opinion; where scholars differ, this is noted
5. Arabic text was verified for accuracy

## Citation verification

Every hadith cited in `data/events` was opened at the collection under the number the
event cites, and the narrator and wording were compared against what the event stores.
Twenty-nine were read at sunnah.com. The two that no sunnah.com collection carries were
traced through dorar.net to al-Hakim's Mustadrak and al-Bayhaqi's Sunan al-Kubra.
`data/citation-review.json` records the result for each one, and
`npm run verify:citations` fails the build if a citation has no entry or an entry is no
longer cited.

**31 hadith citations. 31 read at the collection. 0 unresolved.**

Checking them found ten references pointing at a different narration. All are corrected,
and each entry in the record says what it replaced. The pattern was mostly a right story
with a wrong number: `Sahih al-Bukhari 4` carried the Aqaba pledge (it is Jabir on the
pause in revelation, and the pledge is Bukhari 18), and `Sahih al-Bukhari 349` carried the
Buraq (it is Abu Dharr on the opening of the chest, and the Buraq is Sahih Muslim 162a).

Every citation now carries the grading the collection itself gives, and the event page
shows it. One narration is graded weak: the meeting with the monk Bahira,
`Jami' at-Tirmidhi 3620`, is Da'if by Darussalam's grading. It is kept because the episode
is standard in the seerah literature, and the page says the grading so a reader can weigh
it. Earlier wording here claimed only sahih and hasan hadith are cited; that was not true,
and saying the grading is more useful than a claim that has to be maintained.

Two references had no number at all and read as `Reported in various sources` and
`As-Sunan al-Kubra, al-Bayhaqi`. Both are now traced:

- The words to the family of Yasir are **al-Hakim's Mustadrak 5777**, from Jabir ibn
  Abdullah, sahih on the condition of Muslim with adh-Dhahabi agreeing. The wording matters:
  the popular version is "be patient, O family of Yasir", and the authenticated version is
  "**glad tidings**, O family of Ammar and family of Yasir". The event carried the popular
  wording and now carries the authenticated one.
- The Hilf al-Fudul report is **al-Bayhaqi's Sunan al-Kubra 13211**, from Talha ibn Abdullah
  ibn Awf. The collection the event named was right; the narrator and the number were
  missing. The chain is sahih but mursal and is strengthened by corroborating narrations
  (al-Albani, Fiqh as-Sirah p. 72). The clause about returning rights to their owners belongs
  to al-Humaydi's wording rather than al-Bayhaqi's, so it stays in the event summary instead
  of inside the quotation.

Every one of the 31 now carries the Arabic matn, so the Arabic locale shows the source
itself rather than a rendering of it.

## Scholarly Differences on Dates

Some notable areas where scholars differ:
- The exact date of the Prophet's ﷺ birth (8th, 10th, or 12th Rabi' al-Awwal)
- The exact date of the first revelation (17th or 21st Ramadan)
- The duration of the pause in revelation (Fatrah)
- The exact dating of the Isra wal Mi'raj
- The year of the Slander of Aisha (5 or 6 AH)

In all cases, we followed the most commonly cited opinion in the primary sources listed above.

## Disclaimer

This project is a best-effort compilation based on the most widely accepted and authenticated sources in Sunni Islamic scholarship. It is not a substitute for formal Islamic education. Readers are encouraged to study the Seerah under qualified scholars and to refer to the original sources for deeper understanding.

We ask Allah to accept this effort and make it a source of benefit for the Ummah.