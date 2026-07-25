import { useLocale, useTranslations } from 'next-intl';
import type { HadithReference } from '@/types/seerah';
import { localizeSource } from '@/config/names';
import { localizeFigure } from '@/config/figures';

interface HadithBlockProps {
  reference: HadithReference;
}

export default function HadithBlock({ reference }: HadithBlockProps) {
  const t = useTranslations('event');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const collection = localizeSource(reference.source, locale);
  const sourceLine = reference.hadithNumber
    ? `${collection}, #${reference.hadithNumber}`
    : collection;

  // Prefer the verified Arabic text when available. Otherwise render the
  // rendering for the reader's own language, with explicit lang and dir so
  // screen readers and bidi resolution behave correctly.
  const useArabic = isAr && Boolean(reference.textArabic);
  const bodyText = useArabic
    ? reference.textArabic!
    : locale === 'fr'
      ? reference.textFrench
      : reference.textEnglish;
  const bodyLang = useArabic ? 'ar' : locale === 'fr' ? 'fr' : 'en';
  const bodyDir = useArabic ? 'rtl' : 'ltr';
  const bodyFont = useArabic ? 'font-arabic' : 'font-body';

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
        dir={bodyDir}
        className={`text ${bodyFont}`}
      >
        &ldquo;{bodyText}&rdquo;
      </p>
    </div>
  );
}
