import { useTranslations } from 'next-intl';

interface KeyFiguresProps {
  figures: string[];
}

export default function KeyFigures({ figures }: KeyFiguresProps) {
  const t = useTranslations('event');

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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-parchment-dark text-gold-dark border border-gold/30"
          >
            {figure}
          </span>
        ))}
      </div>
    </section>
  );
}
