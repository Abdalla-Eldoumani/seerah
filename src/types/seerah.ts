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
  significance: string;
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
