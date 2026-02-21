import type { QuranReference } from '@/types/seerah';

interface QuranVerseProps {
  reference: QuranReference;
}

export default function QuranVerse({ reference }: QuranVerseProps) {
  return (
    <blockquote className="quran-verse">
      {/* Arabic text */}
      <p
        dir="rtl"
        lang="ar"
        className="arabic-text font-arabic"
      >
        {reference.textArabic}
      </p>

      {/* Citation */}
      <p className="citation">
        Surah {reference.surahName}, {reference.ayahRange}
      </p>

      {/* English translation */}
      <p className="translation italic">
        {reference.textEnglish}
      </p>
    </blockquote>
  );
}
