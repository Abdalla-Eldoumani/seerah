import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllEras, getEventsByEra } from '@/lib/data';
import { Container } from '@/components/ui/Container';
import TimelineSpine from '@/components/timeline/TimelineSpine';
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

  const eraSections = eras
    .map((era) => ({ era, events: getEventsByEra(era.id) }))
    .map((section, i, all) => ({
      ...section,
      startIndex: all.slice(0, i).reduce((n, prior) => n + prior.events.length, 0),
    }));

  return (
    <div className="bg-parchment pb-24">
      <Container className="pt-16 pb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight">
          {t('title')}
        </h1>
        <p className="font-body text-base md:text-lg text-ink-light mt-4 max-w-xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="mt-8">
          <EraNav />
        </div>
      </Container>

      <TimelineSpine>
        {eraSections.map(({ era, events, startIndex }) => (
          <TimelineEraSection
            key={era.id}
            era={era}
            events={events}
            startIndex={startIndex}
          />
        ))}
      </TimelineSpine>
    </div>
  );
}
