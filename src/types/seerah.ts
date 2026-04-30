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

export interface QuranReference {
  surah: number;
  surahName: string;
  ayahRange: string;
  textArabic: string;
  textEnglish: string;
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
}

export interface SeerahEvent {
  id: string;
  title: string;
  titleArabic: string;
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
  significance: string;
  significanceArabic?: string;
  quranReferences: QuranReference[];
  hadithReferences: HadithReference[];
  primarySources: string[];
  keyFigures: string[];
  location: string;
  locationArabic: string;
}

export interface EraMetadata {
  id: EraId;
  title: string;
  titleArabic: string;
  description: string;
  // Optional Arabic version of the era description, populated by humans
  // from a verified seerah source.
  descriptionArabic?: string;
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
