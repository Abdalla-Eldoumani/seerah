import { useLocale, useTranslations } from 'next-intl';
import { localizeFigure } from '@/config/figures';

interface KeyFiguresProps {
  figures: string[];
}

export default function KeyFigures({ figures }: KeyFiguresProps) {
  const t = useTranslations('event');
  const locale = useLocale();

  if (figures.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 border-b border-line pb-2 font-display text-xl font-bold text-ink">
        {t('keyFiguresHeading')}
      </h2>
      <ul className="space-y-1.5 text-base text-ink-light">
        {figures.map((figure) => (
          <li key={figure}>{localizeFigure(figure, locale)}</li>
        ))}
      </ul>
    </section>
  );
}
