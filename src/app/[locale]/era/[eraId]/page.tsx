import type { Metadata } from 'next';
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
import { formatEraTimespan } from '@/lib/dates';
import type { EraId } from '@/types/seerah';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  const eraIds: EraId[] = ['pre-prophethood', 'meccan', 'medinan'];
  const params: { locale: string; eraId: string }[] = [];
  for (const locale of routing.locales) {
    for (const eraId of eraIds) {
      params.push({ locale, eraId });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eraId: string }>;
}): Promise<Metadata> {
  const { locale, eraId } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const era = getEraMetadata(eraId as EraId);
  return generateEraMetadata(era, locale as Locale);
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
  const events = getEventsByEra(eraId as EraId);
  const tEra = await getTranslations({ locale, namespace: 'era' });
  const tCategories = await getTranslations({ locale, namespace: 'categories' });
  const isAr = locale === 'ar';
  const timespan = formatEraTimespan(era, locale as Locale);

  const eraTitle = tEra(`names.${eraId}`);
  const countLabel =
    events.length === 1
      ? tEra('eventsCountSingular', { count: events.length })
      : tEra('eventsCountPlural', { count: events.length });

  return (
    <main className="min-h-screen bg-parchment pb-24">
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${era.themeColor}10, transparent)`,
        }}
      >
        <Container className="text-center space-y-6">
          <p
            dir="rtl"
            lang="ar"
            className={`font-arabic ${
              isAr
                ? 'text-4xl md:text-5xl lg:text-6xl'
                : 'text-3xl md:text-4xl lg:text-5xl'
            } leading-relaxed`}
            style={{ color: era.themeColor }}
          >
            {era.titleArabic}
          </p>

          {!isAr && (
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight">
              {eraTitle}
            </h1>
          )}

          <p className="font-body text-lg md:text-xl text-ink-light/70" dir="ltr">
            <span dir="ltr">{timespan.primary}</span>
            <span className="mx-2 text-gold" aria-hidden="true">
              ·
            </span>
            <span dir="ltr">{timespan.secondary}</span>
          </p>

          {/* Era description: prefer Arabic when authored, otherwise English with explicit LTR markup. */}
          {(() => {
            const useArabic = isAr && Boolean(era.descriptionArabic);
            const text = useArabic ? era.descriptionArabic! : era.description;
            const lang = useArabic ? 'ar' : 'en';
            const dir = useArabic ? 'rtl' : 'ltr';
            const fontClass = useArabic ? '' : 'font-body';
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

          <Divider className="mt-8" />

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
            const summarySource =
              isAr && event.summaryArabic ? event.summaryArabic : event.summary;
            const summaryLang = isAr && event.summaryArabic ? 'ar' : 'en';
            const summaryDir = summaryLang === 'ar' ? 'rtl' : 'ltr';
            const truncatedSummary =
              summarySource.length > 80
                ? summarySource.slice(0, 80) + '...'
                : summarySource;

            return (
              <Link
                key={event.id}
                href={`/era/${era.id}/${event.id}`}
                className="group block rounded-lg border border-parchment-dark hover:border-gold/50 bg-parchment hover:bg-parchment-dark/30 p-6 transition-all duration-200 hover:shadow-md"
              >
                <p
                  dir="rtl"
                  lang="ar"
                  className={`font-arabic ${
                    isAr ? 'text-xl' : 'text-lg'
                  } text-gold-dark/80 leading-relaxed mb-1`}
                >
                  {event.titleArabic}
                </p>

                {!isAr && (
                  <h3 className="font-display text-xl font-semibold text-ink group-hover:text-gold-dark transition-colors duration-200 mb-2">
                    {event.title}
                  </h3>
                )}

                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge variant="date">
                    {isAr ? event.yearCE.replace(/\s*CE\s*$/i, '').trim() + ' م' : event.yearCE}
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
                  className={`text-sm text-ink-light/70 leading-relaxed ${
                    summaryLang === 'ar' ? '' : 'font-body'
                  }`}
                >
                  {truncatedSummary}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
