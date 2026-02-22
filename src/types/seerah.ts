// src/types/seerah.ts
// Type definitions for all Seerah data structures
// These types map directly to the JSON data files in /data/events/

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

// Navigation types
export interface TimelineNode {
  event: SeerahEvent;
  era: EraMetadata;
  index: number;        // Position in global timeline
  eraIndex: number;     // Position within its era
  prev: string | null;  // Previous event ID
  next: string | null;  // Next event ID
}

// Category metadata for UI display
export const CATEGORY_LABELS: Record<EventCategory, string> = {
  'historical-context': 'Historical Context',
  'birth': 'Birth',
  'childhood': 'Childhood',
  'miracle': 'Miracle',
  'loss': 'Loss & Grief',
  'journey': 'Journey',
  'society': 'Society',
  'livelihood': 'Livelihood',
  'marriage': 'Marriage',
  'spiritual': 'Spiritual',
  'revelation': 'Revelation',
  'confirmation': 'Confirmation',
  'dawah': "Da'wah (Call to Islam)",
  'education': 'Education',
  'persecution': 'Persecution',
  'migration': 'Migration',
  'conversion': 'Conversion',
  'plot': 'Plot Against Islam',
  'pledge': 'Pledge of Allegiance',
  'establishment': 'Establishment',
  'community': 'Community Building',
  'legislation': 'Legislation',
  'battle': 'Battle',
  'treaty': 'Treaty',
  'conquest': 'Conquest',
  'pilgrimage': 'Pilgrimage',
  'death': 'Death',
};

export const CATEGORY_ICONS: Record<EventCategory, string> = {
  'historical-context': '📜',
  'birth': '⭐',
  'childhood': '🌱',
  'miracle': '✨',
  'loss': '🕊️',
  'journey': '🐪',
  'society': '🤝',
  'livelihood': '🐑',
  'marriage': '💍',
  'spiritual': '🌙',
  'revelation': '📖',
  'confirmation': '✅',
  'dawah': '📢',
  'education': '🏫',
  'persecution': '⛓️',
  'migration': '🚶',
  'conversion': '❤️',
  'plot': '⚔️',
  'pledge': '🤲',
  'establishment': '🏗️',
  'community': '👥',
  'legislation': '⚖️',
  'battle': '🛡️',
  'treaty': '📋',
  'conquest': '🏴',
  'pilgrimage': '🕋',
  'death': '🕯️',
};

