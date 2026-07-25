import { useLocale, useTranslations } from 'next-intl';
import { localizeSurah } from '@/config/names';
import type { QuranReference } from '@/types/seerah';

interface QuranVerseProps {
  reference: QuranReference;
}

export default function QuranVerse({ reference }: QuranVerseProps) {
  const locale = useLocale();
  const t = useTranslations('event');

  // An Arabic reader has the verse itself and does not need it rendered back
  // in another language. Everyone else reads the published edition for their
  // locale: Saheeh International in English, Hamidullah in French.
  const translation =
    locale === 'ar'
      ? null
      : locale === 'fr'
        ? reference.textFrench
        : reference.textEnglish;

  return (
    <blockquote className="quran-verse">
      <p dir="rtl" lang="ar" className="arabic-text font-arabic">
        {reference.textArabic}
      </p>

      <p className="citation">
        {t('surah')} {localizeSurah(reference.surahName, locale)},{' '}
        <span dir="ltr">{reference.ayahRange}</span>
      </p>

      {translation && (
        <p lang={locale} dir="ltr" className="translation italic">
          {translation}
        </p>
      )}
    </blockquote>
  );
}
