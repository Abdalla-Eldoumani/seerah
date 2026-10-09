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
    <section className="my-8 md:my-12 max-w-prose mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
        {t('keyFiguresHeading')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {figures.map((figure) => (
          <span
            key={figure}
            className="inline-block rounded-sm border border-gold-dark/30 bg-parchment-dark px-4 py-1.5 text-sm font-medium text-gold-dark"
          >
            {localizeFigure(figure, locale)}
          </span>
        ))}
      </div>
    </section>
  );
}
