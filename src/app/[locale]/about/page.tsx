import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { routing } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { rich } from '@/lib/rich';
import { localizeSource, localizeAuthor } from '@/config/names';
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
  return pageMetadata({ locale, path: '/about', title: t('about') });
}

function SourceList({ items, locale }: { items: SourceWork[]; locale: string }) {
  return (
    <ul className="text-base text-ink-light">
      {items.map((item) => (
        <li key={item.name} className="border-t border-line py-2.5">
          <strong className="font-semibold text-ink">{localizeSource(item.name, locale)}</strong>
          {item.author && <>, {localizeAuthor(item.author, locale)}</>}
        </li>
      ))}
    </ul>
  );
}

function Prose({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section className="max-w-[42rem] border-t border-line pt-8" aria-labelledby={id}>
      <h2 id={id} className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
        {heading}
      </h2>
      <p className="text-lg leading-relaxed text-ink-light">{children}</p>
    </section>
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
    <Container className="py-12 md:py-16">
      <header>
        <h1 className="font-display text-4xl font-bold text-ink md:text-6xl">{t('title')}</h1>
        {!isAr && (
          <p dir="rtl" lang="ar" className="mt-2 w-fit font-arabic text-2xl text-ink-light">
            {tSiteAr('name')}
          </p>
        )}
      </header>

      <Divider ornament />

      <div className="space-y-12">
        <section className="max-w-[42rem]" aria-labelledby="purpose-heading">
          <h2 id="purpose-heading" className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            {t('purposeHeading')}
          </h2>
          <p className="text-lg leading-relaxed text-ink-light">{t('purposeBody')}</p>
        </section>

        <section className="border-t border-line pt-8" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="mb-6 font-display text-2xl font-bold text-ink md:text-3xl">
            {t('sourcesHeading')}
          </h2>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="mb-3 font-display text-xl font-bold text-ink">
                {t('hadithCollectionsHeading')}
              </h3>
              <SourceList items={HADITH_COLLECTIONS} locale={locale} />
            </div>
            <div>
              <h3 className="mb-3 font-display text-xl font-bold text-ink">
                {t('seerahWorksHeading')}
              </h3>
              <SourceList items={SEERAH_WORKS} locale={locale} />
            </div>
            <div>
              <h3 className="mb-3 font-display text-xl font-bold text-ink">
                {t('additionalSourcesHeading')}
              </h3>
              <SourceList items={ADDITIONAL_SOURCES} locale={locale} />
            </div>
          </div>
        </section>

        <Prose id="methodology-heading" heading={t('methodologyHeading')}>
          {t.rich('methodologyBody', rich)}
        </Prose>

        <Prose id="differences-heading" heading={t('differencesHeading')}>
          {t('differencesBody')}
        </Prose>

        <Prose id="sadaqah-heading" heading={t('sadaqahHeading')}>
          {t('sadaqahBody')}
        </Prose>
      </div>
    </Container>
  );
}
