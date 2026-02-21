import type { Metadata } from 'next';
import type { SeerahEvent, EraMetadata } from '@/types/seerah';

export const BASE_METADATA: Metadata = {
  title: {
    default: 'Noor al-Seerah — The Light of the Biography',
    template: '%s | Noor al-Seerah',
  },
  description:
    'An interactive journey through the life of Prophet Muhammad \uFDFA. Explore 49 key events across three eras with pre-verified content from authenticated Islamic sources.',
  keywords: ['Seerah', 'Prophet Muhammad', 'Islamic history', 'timeline', 'biography'],
  authors: [{ name: 'Noor al-Seerah Project' }],
  openGraph: {
    title: 'Noor al-Seerah — The Light of the Biography',
    description:
      'An interactive journey through the life of Prophet Muhammad \uFDFA.',
    type: 'website',
    locale: 'en_US',
  },
};

export function generateEventMetadata(event: SeerahEvent): Metadata {
  return {
    title: event.title,
    description: event.summary.slice(0, 160),
    openGraph: {
      title: `${event.title} | Noor al-Seerah`,
      description: event.summary.slice(0, 160),
      type: 'article',
    },
  };
}

export function generateEraMetadata(era: EraMetadata): Metadata {
  return {
    title: era.title,
    description: era.description.slice(0, 160),
    openGraph: {
      title: `${era.title} | Noor al-Seerah`,
      description: era.description.slice(0, 160),
      type: 'article',
    },
  };
}
