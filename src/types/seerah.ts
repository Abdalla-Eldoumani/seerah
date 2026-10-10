// Type definitions for all Seerah data structures.
// These types map directly to the JSON data files in /data/events/.

export const ERA_IDS = ['pre-prophethood', 'meccan', 'medinan'] as const;
export type EraId = (typeof ERA_IDS)[number];

export type EventCategory =
  | 'historical-context'
  | 'birth'
  | 'childhood'
  | 'miracle'
  | 'loss'
  | 'journey'
  | 'society'
  | 'livelihood'
  | 'marriage'
  | 'spiritual'
  | 'revelation'
  | 'confirmation'
  | 'dawah'
  | 'education'
  | 'persecution'
  | 'migration'
  | 'conversion'
  | 'plot'
  | 'pledge'
  | 'establishment'
  | 'community'
  | 'legislation'
  | 'battle'
  | 'treaty'
  | 'conquest'
  | 'pilgrimage'
  | 'death';

// All three texts come from a published edition through
// `scripts/fetch-scripture.mjs`: Uthmani, Saheeh International, Hamidullah.
// Nothing here is translated in this repository.
export interface QuranReference {
  surah: number;
  surahName: string;
  ayahRange: string;
  textArabic: string;
  textEnglish: string;
  textFrench: string;
  translationProvenance: 'fetched';
}

interface HadithBase {
  source: string;
  hadithNumber: string;
  narrator: string;
  textEnglish: string;
  // Arabic matn, shown to Arabic readers. Only ever pasted from the page the
  // citation names, never typed or generated.
  textArabic?: string;
  // The grading the collection or a named grader gives, stated to the reader.
  // The Bahira narration is graded weak and the Hilf al-Fudul report is mursal.
  grade?: 'sahih' | 'hasan' | 'hasan-sahih' | 'daif' | 'mursal';
}

// 'sunnah': English and Arabic copied from the sunnah.com page for this exact
// collection and number. `excerpt` marks a narration cut short on purpose.
// 'project': an abridged English and French rendering written in this
// repository, labelled as such on the page.
export type HadithReference =
  | (HadithBase & { translationProvenance: 'sunnah'; excerpt?: boolean })
  | (HadithBase & { translationProvenance: 'project'; textFrench: string });

export interface SeerahEvent {
  id: string;
  title: string;
  titleArabic: string;
  titleFrench: string;
  year: string;
  yearCE: string;
  month: string;
  category: EventCategory;
  summary: string;
  // Optional Arabic version of the summary, populated by humans from a
  // verified source (e.g. the Arabic edition of Ar-Raheeq Al-Makhtum).
  // The Arabic site renders this when present, otherwise falls back to
  // the English summary with explicit lang/dir markup.
  summaryArabic?: string;
  summaryFrench?: string;
  significance: string;
  significanceArabic?: string;
  significanceFrench?: string;
  quranReferences: QuranReference[];
  hadithReferences: HadithReference[];
  primarySources: string[];
  keyFigures: string[];
  location: string;
  locationArabic: string;
  locationFrench: string;
}

export interface EraMetadata {
  id: EraId;
  title: string;
  titleArabic: string;
  titleFrench: string;
  description: string;
  // Optional Arabic version of the era description, populated by humans
  // from a verified seerah source.
  descriptionArabic?: string;
  descriptionFrench?: string;
  timespan: string;
  timespanHijri: string;
  themeColor: string;
  accentColor: string;
}

export interface EraData {
  era: EraMetadata;
  events: SeerahEvent[];
}
