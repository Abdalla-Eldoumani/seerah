import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { HadithReference } from '@/types/seerah';
import { localizeSource } from '@/config/names';
import { localizeFigure } from '@/config/figures';

interface HadithBlockProps {
  reference: HadithReference;
}

export default function HadithBlock({ reference }: HadithBlockProps) {
  const t = useTranslations('event');
  const locale = useLocale();
  const collection = localizeSource(reference.source, locale);
  const sourceLine = reference.hadithNumber
    ? `${collection}, #${reference.hadithNumber}`
    : collection;

  // Arabic readers get the Arabic matn where one is stored. Text pasted from
  // sunnah.com keeps its English for everyone else, French readers included,
  // because no French translation is published. Only the project's own
  // renderings carry the "not a published translation" label.
  const fromSunnah = reference.translationProvenance === 'sunnah';
  const useArabic = locale === 'ar' && Boolean(reference.textArabic);
  const useFrench = locale === 'fr' && !fromSunnah;
  const bodyText = useArabic
    ? reference.textArabic!
    : useFrench
      ? reference.textFrench
      : reference.textEnglish;
  const bodyLang = useArabic ? 'ar' : useFrench ? 'fr' : 'en';
  const note = fromSunnah
    ? useArabic
      ? t('sunnahArabic')
      : t(locale === 'fr' ? 'sunnahFrench' : 'sunnahEnglish')
    : useArabic
      ? null
      : t('renderingLabel');

  return (
    <div className="hadith-block">
      <p className="source">{sourceLine}</p>
      <p className="narrator">
        {t('narratedBy')}: {localizeFigure(reference.narrator, locale)}
      </p>
      {reference.grade && (
        <p className="narrator">
          {t('gradeLabel')}: {t(`grades.${reference.grade}`)}
        </p>
      )}
      <p
        lang={bodyLang}
        dir={useArabic ? 'rtl' : 'ltr'}
        className={cn(
          'text',
          useArabic ? 'font-arabic text-xl leading-loose' : 'font-body'
        )}
      >
        {bodyText}
      </p>
      {note && <p className="rendering-note">{note}</p>}
      {fromSunnah && reference.excerpt && (
        <p className="rendering-note">{t('excerptLabel')}</p>
      )}
    </div>
  );
}
