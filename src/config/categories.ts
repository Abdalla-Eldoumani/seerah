import type { EventCategory } from '@/types/seerah';

export type GlyphId =
  | 'beginning'
  | 'spiritual'
  | 'society'
  | 'loss'
  | 'conflict'
  | 'movement'
  | 'establishment'
  | 'conquest'
  | 'pilgrimage'
  | 'manuscript';

export const CATEGORY_GLYPHS: Record<EventCategory, GlyphId> = {
  'historical-context': 'manuscript',
  'birth': 'beginning',
  'childhood': 'beginning',
  'miracle': 'spiritual',
  'loss': 'loss',
  'journey': 'movement',
  'society': 'society',
  'livelihood': 'society',
  'marriage': 'society',
  'spiritual': 'spiritual',
  'revelation': 'spiritual',
  'confirmation': 'spiritual',
  'dawah': 'spiritual',
  'education': 'beginning',
  'persecution': 'conflict',
  'migration': 'movement',
  'conversion': 'spiritual',
  'plot': 'conflict',
  'pledge': 'society',
  'establishment': 'establishment',
  'community': 'society',
  'legislation': 'establishment',
  'battle': 'conflict',
  'treaty': 'establishment',
  'conquest': 'conquest',
  'pilgrimage': 'pilgrimage',
  'death': 'loss',
};

export function getCategoryGlyph(category: EventCategory): GlyphId {
  return CATEGORY_GLYPHS[category] ?? 'manuscript';
}
