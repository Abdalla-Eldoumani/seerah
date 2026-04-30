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

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  'historical-context': '#5e5641',
  'birth': '#b88a2a',
  'childhood': '#2d5a27',
  'miracle': '#b88a2a',
  'loss': '#762020',
  'journey': '#1f3a2a',
  'society': '#3d3628',
  'livelihood': '#2d5a27',
  'marriage': '#b88a2a',
  'spiritual': '#1a1a2e',
  'revelation': '#b88a2a',
  'confirmation': '#2d5a27',
  'dawah': '#1f3a2a',
  'education': '#1a1a2e',
  'persecution': '#762020',
  'migration': '#0d1b2a',
  'conversion': '#2d5a27',
  'plot': '#762020',
  'pledge': '#b88a2a',
  'establishment': '#0d1b2a',
  'community': '#1f3a2a',
  'legislation': '#1a1a2e',
  'battle': '#762020',
  'treaty': '#3d3628',
  'conquest': '#b88a2a',
  'pilgrimage': '#1f3a2a',
  'death': '#5e5641',
};

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

export function getCategoryColor(category: EventCategory): string {
  return CATEGORY_COLORS[category] ?? '#5e5641';
}

export function getCategoryGlyph(category: EventCategory): GlyphId {
  return CATEGORY_GLYPHS[category] ?? 'manuscript';
}
