// Type definitions for all Seerah data structures.
// These types map directly to the JSON data files in /data/events/.

export type EraId = 'pre-prophethood' | 'meccan' | 'medinan';

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

export interface HadithReference {
  source: string;
  hadithNumber: string;
  narrator: string;
  textEnglish: string;
  // Optional. When populated from a verified source (e.g. Sunnah.com Arabic
  // text for Bukhari/Muslim), the Arabic site will render this instead of
  // the English translation. Only ever populated by humans from verified
  // sources, never generated.
  textArabic?: string;
  // The English here is the project's own abridged rendering rather than a
  // published translation, so the French is produced the same way and both are
  // marked as such. A reviewer can list them by grepping for "project".
  textFrench: string;
  translationProvenance: 'project';
  // The grading the collection carries, read from the collection itself. A
  // reader deciding how much weight to give a report needs this, and the
  // Bahira narration in particular is graded weak.
  grade?: 'sahih' | 'hasan' | 'hasan-sahih' | 'daif';
}

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

export interface TimelineNode {
  event: SeerahEvent;
  era: EraMetadata;
  index: number;
  eraIndex: number;
  prev: string | null;
  next: string | null;
}
