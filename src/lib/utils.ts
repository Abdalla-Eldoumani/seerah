import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type EventCategory, CATEGORY_LABELS } from '@/types/seerah';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHijriYear(year: string): string {
  return year;
}

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'historical-context': '#6b7280',
  'birth': '#c9a84c',
  'childhood': '#2d5a27',
  'miracle': '#c9a84c',
  'loss': '#8b2020',
  'journey': '#1a3a2a',
  'society': '#3d3628',
  'livelihood': '#2d5a27',
  'marriage': '#c9a84c',
  'spiritual': '#1a1a2e',
  'revelation': '#c9a84c',
  'confirmation': '#2d5a27',
  'dawah': '#1a3a2a',
  'education': '#1a1a2e',
  'persecution': '#8b2020',
  'migration': '#0d1b2a',
  'conversion': '#2d5a27',
  'plot': '#8b2020',
  'pledge': '#c9a84c',
  'establishment': '#0d1b2a',
  'community': '#1a3a2a',
  'legislation': '#1a1a2e',
  'battle': '#8b2020',
  'treaty': '#3d3628',
  'conquest': '#c9a84c',
  'pilgrimage': '#1a3a2a',
  'death': '#6b7280',
};

export function getCategoryColor(category: EventCategory): string {
  return CATEGORY_COLORS[category] || '#6b7280';
}

export function getCategoryLabel(category: EventCategory): string {
  return CATEGORY_LABELS[category] || category;
}
