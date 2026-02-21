interface EventSignificanceProps {
  significance: string;
}

export default function EventSignificance({ significance }: EventSignificanceProps) {
  return (
    <section className="my-8 md:my-12 max-w-prose mx-auto">
      <div className="border-l-4 border-gold bg-parchment-dark/50 rounded-r-lg p-6 md:p-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-gold-dark mb-4">
          Why This Matters
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-ink-light">
          {significance}
        </p>
      </div>
    </section>
  );
}
