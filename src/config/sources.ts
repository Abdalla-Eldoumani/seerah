// Scholarly source list. Proper names of works and authors that do not translate.
// The category labels (Hadith collections, Seerah works, etc.) come from messages.

export interface SourceWork {
  name: string;
  author?: string;
}

export const HADITH_COLLECTIONS: SourceWork[] = [
  { name: 'Sahih al-Bukhari', author: 'Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)' },
  { name: 'Sahih Muslim', author: 'Imam Muslim ibn al-Hajjaj (d. 875 CE)' },
  { name: "Jami' at-Tirmidhi", author: 'Imam Abu Isa at-Tirmidhi (d. 892 CE)' },
  { name: 'Sunan Abu Dawud', author: 'Imam Abu Dawud as-Sijistani (d. 889 CE)' },
];

export const SEERAH_WORKS: SourceWork[] = [
  {
    name: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
    author: 'Sheikh Safiur Rahman al-Mubarakpuri',
  },
  {
    name: 'Sirat Rasul Allah',
    author: 'Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)',
  },
  { name: 'Al-Bidaya wan-Nihaya', author: 'Imam Ibn Kathir (d. 1373 CE)' },
];

export const ADDITIONAL_SOURCES: SourceWork[] = [
  { name: 'Tafsir Ibn Kathir' },
  { name: 'Asbab al-Nuzul', author: 'Ali ibn Ahmad al-Wahidi (d. 1075 CE)' },
  { name: "Tabaqat Ibn Sa'd" },
  { name: 'Al-Sunan al-Kubra', author: 'Imam al-Bayhaqi' },
  { name: 'Musnad Ahmad', author: 'Imam Ahmad ibn Hanbal' },
];
