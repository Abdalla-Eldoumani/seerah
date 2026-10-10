// Works the event texts name. Proper names of works and authors that do not translate.
// The category labels (Hadith collections, Seerah works, etc.) come from messages.
// Every name here is also a key in `names.ts`. Death years follow the English
// Wikipedia entry for each author, with "c." where that entry gives an approximate year.

export interface SourceWork {
  name: string;
  author?: string;
}

export const HADITH_COLLECTIONS: SourceWork[] = [
  { name: 'Sahih al-Bukhari', author: 'Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)' },
  { name: 'Sahih Muslim', author: 'Imam Muslim ibn al-Hajjaj (d. c. 875 CE)' },
  { name: "Jami' at-Tirmidhi", author: 'Imam Abu Isa at-Tirmidhi (d. 892 CE)' },
  { name: 'Sunan Abu Dawud', author: 'Imam Abu Dawud as-Sijistani (d. 889 CE)' },
  { name: 'Sunan Ibn Majah' },
];

export const SEERAH_WORKS: SourceWork[] = [
  { name: 'Ar-Raheeq Al-Makhtum', author: 'Sheikh Safiur Rahman al-Mubarakpuri' },
  {
    name: "Ibn Ishaq's Sirah",
    author: 'Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)',
  },
];

export const ADDITIONAL_SOURCES: SourceWork[] = [
  { name: 'Musnad Ahmad', author: 'Imam Ahmad ibn Hanbal' },
  { name: 'As-Sunan al-Kubra, al-Bayhaqi' },
  { name: 'Al-Mustadrak, al-Hakim' },
  { name: "Abu Ubayd's Kitab al-Amwal" },
];
