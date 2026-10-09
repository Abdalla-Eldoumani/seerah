import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { localizedField } from '@/lib/localized';
import { OG_LOCALES, pageAlternates, pageUrl } from '@/lib/seo';
import { truncate } from '@/lib/utils';
import type { SeerahEvent, EraMetadata } from '@/types/seerah';
import type { Locale } from '@/i18n/routing';

interface PageMetadataInput {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: { url: string; alt: string };
}

// Without a title the layout's default title applies and the Open Graph card
// carries the site name and subtitle.
export async function pageMetadata({
  locale,
  path,
  title,
  description,
  type = 'website',
  image,
}: PageMetadataInput): Promise<Metadata> {
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const siteName = tSite('name');
  const cardTitle = title ? `${title} | ${siteName}` : `${siteName} | ${tSite('subtitle')}`;
  const cardDescription = description ?? tSite('description');
  const images = image
    ? [{ url: image.url, width: 1200, height: 630, alt: image.alt }]
    : undefined;

  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: pageAlternates(locale, path),
    openGraph: {
      title: cardTitle,
      description: cardDescription,
      type,
      locale: OG_LOCALES[locale],
      siteName,
      url: pageUrl(locale, path),
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: cardTitle,
      description: cardDescription,
      images: image ? [image.url] : undefined,
    },
  };
}

export function eventPath(eraId: string, eventId: string): string {
  return `/era/${eraId}/${eventId}`;
}

export async function generateEventMetadata(
  event: SeerahEvent,
  eraId: string,
  locale: Locale
): Promise<Metadata> {
  const title = localizedField(event, 'title', locale).text;
  return pageMetadata({
    locale,
    path: eventPath(eraId, event.id),
    title,
    description: truncate(localizedField(event, 'summary', locale).text, 160),
    type: 'article',
    image: { url: pageUrl(locale, `${eventPath(eraId, event.id)}/og`), alt: title },
  });
}

export async function generateEraMetadata(
  era: EraMetadata,
  locale: Locale
): Promise<Metadata> {
  const tEra = await getTranslations({ locale, namespace: 'era.names' });
  return pageMetadata({
    locale,
    path: `/era/${era.id}`,
    title: tEra(era.id),
    description: truncate(localizedField(era, 'description', locale).text, 160),
  });
}
