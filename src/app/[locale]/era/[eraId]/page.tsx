import type { Metadata } from 'next';
import { localizedField } from '@/lib/localized';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getEraMetadata, getEventsByEra } from '@/lib/data';
import { generateEraMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import EraNav from '@/components/navigation/EraNav';
import { Link } from '@/i18n/navigation';
import { getCategoryColor } from '@/config/categories';
import { CategoryGlyph } from '@/components/icons/CategoryGlyph';
import { formatEraTimespan, formatGregorianYear } from '@/lib/dates';
import { ERA_IDS, type EraId } from '@/types/seerah';
import { routing } from '@/i18n/routing';

// Only the three era ids exist; any other segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ERA_IDS.map((eraId) => ({ locale, eraId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eraId: string }>;
}): Promise<Metadata> {
  const { locale, eraId } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const era = getEraMetadata(eraId as EraId);
  if (!era) return {};
  return generateEraMetadata(era, locale);
}

export default async function EraPage({
  params,
}: {
  params: Promise<{ locale: string; eraId: string }>;
}) {
  const { locale, eraId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const era = getEraMetadata(eraId as EraId);
  if (!era) notFound();
  const events = getEventsByEra(eraId as EraId);
  const tEra = await getTranslations({ locale, namespace: 'era' });
  const tCategories = await getTranslations({ locale, namespace: 'categories' });
  const isAr = locale === 'ar';
  const timespan = formatEraTimespan(era, locale);

  const eraTitle = tEra(`names.${eraId}`);
  const countLabel =
    events.length === 1
      ? tEra('eventsCountSingular', { count: events.length })
      : tEra('eventsCountPlural', { count: events.length });

  return (
    <div className="bg-parchment pb-24">
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${era.themeColor}10, transparent)`,
        }}
      >
        <Container className="text-center space-y-6">
          {/* On Arabic the Arabic era name is the page heading; the h1 used to
              be gated behind `!isAr`, leaving /ar/era/* with no heading. */}
          {isAr ? (
            <h1
              dir="rtl"
              lang="ar"
              className="font-arabic text-4xl md:text-5xl lg:text-6xl leading-relaxed"
              style={{ color: era.themeColor }}
            >
              {era.titleArabic}
            </h1>
          ) : (
            <>
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-3xl md:text-4xl lg:text-5xl leading-relaxed"
                style={{ color: era.themeColor }}
              >
                {era.titleArabic}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight">
                {eraTitle}
              </h1>
            </>
          )}

          <p className="font-body text-lg md:text-xl text-ink-soft" dir="ltr">
            <span dir="ltr">{timespan.primary}</span>
            <span className="mx-2 text-gold" aria-hidden="true">
              ·
            </span>
            <span dir="ltr">{timespan.secondary}</span>
          </p>

          {/* Era description in the active locale, falling back to English with
              explicit markup so bidi and screen readers stay correct. */}
          {(() => {
            const described = localizedField(era, 'description', locale);
            const text = described.text;
            const lang = described.lang;
            const dir = lang === 'ar' ? 'rtl' : 'ltr';
            const fontClass = lang === 'ar' ? '' : 'font-body';
            return (
              <p
                lang={lang}
                dir={dir}
                className={`${fontClass} text-base md:text-lg text-ink-light leading-relaxed max-w-2xl mx-auto`}
              >
                {text}
              </p>
            );
          })()}

          <Divider ornament className="mt-8" />

          <div className="pt-4">
            <EraNav currentEra={eraId as EraId} />
          </div>
        </Container>
      </section>

      <Container className="mt-8 md:mt-12">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8 text-center">
          {countLabel}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => {
            const categoryLabel = tCategories(event.category);
            const categoryColor = getCategoryColor(event.category);
            const localizedSummary = localizedField(event, 'summary', locale);
            const summarySource = localizedSummary.text;
            const summaryLang = localizedSummary.lang;
            const summaryDir = summaryLang === 'ar' ? 'rtl' : 'ltr';

            return (
              <Link
                key={event.id}
                href={`/era/${era.id}/${event.id}`}
                className="group block rounded-lg border border-parchment-dark hover:border-gold/50 bg-parchment hover:bg-parchment-dark/30 p-6 transition-colors duration-200"
              >
                <p
                  dir="rtl"
                  lang="ar"
                  className={`font-arabic ${
                    isAr ? 'text-xl' : 'text-lg'
                  } text-gold-dark leading-relaxed mb-1`}
                >
                  {event.titleArabic}
                </p>

                {!isAr && (
                  <h3 className="font-display text-xl font-semibold text-ink group-hover:text-gold-dark transition-colors duration-200 mb-2">
                    {localizedField(event, 'title', locale).text}
                  </h3>
                )}

                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge variant="date">
                    {formatGregorianYear(event.yearCE, locale)}
                  </Badge>
                  <Badge
                    variant="category"
                    style={{ backgroundColor: categoryColor }}
                  >
                    <CategoryGlyph
                      category={event.category}
                      className="w-3.5 h-3.5 me-1"
                    />
                    {categoryLabel}
                  </Badge>
                </div>

                <p
                  lang={summaryLang}
                  dir={summaryDir}
                  className={`line-clamp-3 text-sm text-ink-soft leading-relaxed ${
                    summaryLang === 'ar' ? '' : 'font-body'
                  }`}
                >
                  {summarySource}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
