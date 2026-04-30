import { useTranslations } from 'next-intl';
import type { HadithReference } from '@/types/seerah';

interface HadithBlockProps {
  reference: HadithReference;
}

export default function HadithBlock({ reference }: HadithBlockProps) {
  const t = useTranslations('event');
  const sourceLine = reference.hadithNumber
    ? `${reference.source}, #${reference.hadithNumber}`
    : reference.source;

  return (
    <div className="hadith-block">
      <p className="source">{sourceLine}</p>
      <p className="narrator">
        {t('narratedBy')}: {reference.narrator}
      </p>
      <p className="text">&ldquo;{reference.textEnglish}&rdquo;</p>
    </div>
  );
}
