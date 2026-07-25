import { useLocale, useTranslations } from 'next-intl';
import { localizeSurah } from '@/config/names';
import type { QuranReference } from '@/types/seerah';

interface QuranVerseProps {
  reference: QuranReference;
}

export default function QuranVerse({ reference }: QuranVerseProps) {
  const locale = useLocale();
  const t = useTranslations('event');

  return (
    <blockquote className="quran-verse">
      <p dir="rtl" lang="ar" className="arabic-text font-arabic">
        {reference.textArabic}
      </p>

      <p className="citation">
        {t('surah')} {localizeSurah(reference.surahName, locale)},{' '}
        <span dir="ltr">{reference.ayahRange}</span>
      </p>

      {/* English translation rendered on both locales so the meaning is
          accessible. On Arabic, the explicit lang/dir keeps bidi correct. */}
      <p lang="en" dir="ltr" className="translation italic">
        {reference.textEnglish}
      </p>
    </blockquote>
  );
}
