import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { SeerahEvent, EraMetadata } from '@/types/seerah';
import type { Locale } from '@/i18n/routing';

function ogLocale(locale: Locale) {
  return locale === 'ar' ? 'ar_SA' : 'en_US';
}

export async function generateEventMetadata(
  event: SeerahEvent,
  locale: Locale
): Promise<Metadata> {
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const title = locale === 'ar' ? event.titleArabic : event.title;
  const description = event.summary.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${tSite('name')}`,
      description,
      type: 'article',
      locale: ogLocale(locale),
    },
  };
}

export async function generateEraMetadata(
  era: EraMetadata,
  locale: Locale
): Promise<Metadata> {
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const tEra = await getTranslations({ locale, namespace: 'era.names' });
  const title = tEra(era.id);
  const description = era.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${tSite('name')}`,
      description,
      type: 'article',
      locale: ogLocale(locale),
    },
  };
}
