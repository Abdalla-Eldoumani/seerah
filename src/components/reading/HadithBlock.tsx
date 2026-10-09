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

  // The Arabic matn is shown to Arabic readers. Everyone else, and an Arabic
  // reader where no matn is stored, gets the project's own rendering, which is
  // labelled as such because it is not a published translation.
  const useArabic = locale === 'ar' && Boolean(reference.textArabic);
  const bodyText = useArabic
    ? reference.textArabic!
    : locale === 'fr'
      ? reference.textFrench
      : reference.textEnglish;
  const bodyLang = useArabic ? 'ar' : locale === 'fr' ? 'fr' : 'en';

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
      {!useArabic && <p className="rendering-note">{t('renderingLabel')}</p>}
    </div>
  );
}
