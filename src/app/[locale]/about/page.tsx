import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { routing } from '@/i18n/routing';
import {
  HADITH_COLLECTIONS,
  SEERAH_WORKS,
  ADDITIONAL_SOURCES,
  type SourceWork,
} from '@/config/sources';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('about') };
}

function SourceList({ items }: { items: SourceWork[] }) {
  return (
    <ul className="space-y-2 font-body text-ink-light">
      {items.map((item) => (
        <li key={item.name} className="flex items-start gap-2">
          <span
            className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'var(--color-gold)' }}
            aria-hidden="true"
          />
          <span>
            <strong className="text-ink">{item.name}</strong>
            {item.author && <>, {item.author}</>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });
  const tSiteAr = await getTranslations({ locale: 'ar', namespace: 'site' });
  const isAr = locale === 'ar';

  return (
    <main className="py-16 sm:py-20">
      <Container>
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-4">
            {t('title')}
          </h1>
          {!isAr && (
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-gold text-xl sm:text-2xl"
            >
              {tSiteAr('name')}
            </p>
          )}
        </header>

        <Divider />

        <section className="mb-12" aria-labelledby="purpose-heading">
          <h2
            id="purpose-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            {t('purposeHeading')}
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            {t('purposeBody')}
          </p>
        </section>

        <Divider />

        <section className="mb-12" aria-labelledby="sources-heading">
          <h2
            id="sources-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-6"
          >
            {t('sourcesHeading')}
          </h2>

          <div className="mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              {t('hadithCollectionsHeading')}
            </h3>
            <SourceList items={HADITH_COLLECTIONS} />
          </div>

          <div className="mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              {t('seerahWorksHeading')}
            </h3>
            <SourceList items={SEERAH_WORKS} />
          </div>

          <div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              {t('additionalSourcesHeading')}
            </h3>
            <SourceList items={ADDITIONAL_SOURCES} />
          </div>
        </section>

        <Divider />

        <section className="mb-12" aria-labelledby="methodology-heading">
          <h2
            id="methodology-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            {t('methodologyHeading')}
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            {t('methodologyBody')}
          </p>
        </section>

        <Divider />

        <section className="mb-12" aria-labelledby="differences-heading">
          <h2
            id="differences-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            {t('differencesHeading')}
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            {t('differencesBody')}
          </p>
        </section>

        <Divider />

        <section className="mb-4" aria-labelledby="sadaqah-heading">
          <h2
            id="sadaqah-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            {t('sadaqahHeading')}
          </h2>
          <p
            className="font-body text-base sm:text-lg leading-relaxed italic"
            style={{ color: 'var(--color-ink-light)' }}
          >
            {t('sadaqahBody')}
          </p>
        </section>

        <Divider className="mt-12" />
      </Container>
    </main>
  );
}
