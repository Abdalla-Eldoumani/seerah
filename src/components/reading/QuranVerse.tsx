import { useLocale, useTranslations } from 'next-intl';
import type { QuranReference } from '@/types/seerah';

interface QuranVerseProps {
  reference: QuranReference;
}

export default function QuranVerse({ reference }: QuranVerseProps) {
  const t = useTranslations('event');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <blockquote className="quran-verse">
      <p dir="rtl" lang="ar" className="arabic-text font-arabic">
        {reference.textArabic}
      </p>

      <p className="citation">
        {t('surah')} {reference.surahName}, {reference.ayahRange}
      </p>

      {!isAr && (
        <p className="translation italic">{reference.textEnglish}</p>
      )}
    </blockquote>
  );
}
