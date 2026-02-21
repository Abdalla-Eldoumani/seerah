import type { HadithReference } from '@/types/seerah';

interface HadithBlockProps {
  reference: HadithReference;
}

export default function HadithBlock({ reference }: HadithBlockProps) {
  return (
    <div className="hadith-block">
      {/* Source line */}
      <p className="source">
        {reference.source}, #{reference.hadithNumber}
      </p>

      {/* Narrator */}
      <p className="narrator">
        Narrated by: {reference.narrator}
      </p>

      {/* Hadith text with quotation marks */}
      <p className="text">
        &ldquo;{reference.textEnglish}&rdquo;
      </p>
    </div>
  );
}
