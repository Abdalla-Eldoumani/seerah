import type { Metadata } from 'next';
import { localizedField } from '@/lib/localized';
import { getTranslations } from 'next-intl/server';
import type { SeerahEvent, EraMetadata } from '@/types/seerah';
import type { Locale } from '@/i18n/routing';

const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  ar: 'ar_SA',
  fr: 'fr_FR',
};

function ogLocale(locale: Locale) {
  return OG_LOCALES[locale];
}

export async function generateEventMetadata(
  event: SeerahEvent,
  locale: Locale
): Promise<Metadata> {
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const title = localizedField(event, 'title', locale).text;
  const description = localizedField(event, 'summary', locale).text.slice(0, 160);

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
  const description = localizedField(era, 'description', locale).text.slice(0, 160);

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
