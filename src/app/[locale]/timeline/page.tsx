import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllEras, getEventsByEra } from '@/lib/data';
import { Container } from '@/components/ui/Container';
import TimelineEraSection from '@/components/timeline/TimelineEraSection';
import EraNav from '@/components/navigation/EraNav';
import { pageMetadata } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'timeline' });
  return pageMetadata({
    locale,
    path: '/timeline',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'timeline' });
  const eras = getAllEras();

  return (
    <div>
      <Container className="flex flex-col gap-6 pb-8 pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-xl font-body text-lg text-ink-light">
            {t('subtitle')}
          </p>
        </div>
        <EraNav />
      </Container>

      {eras.map((era) => (
        <TimelineEraSection key={era.id} era={era} events={getEventsByEra(era.id)} />
      ))}
    </div>
  );
}
