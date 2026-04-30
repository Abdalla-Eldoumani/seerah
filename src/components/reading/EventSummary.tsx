interface EventSummaryProps {
  summary: string;
  // Language of the summary text being passed in. The component reads this
  // to apply the correct dir, lang, and font family. Pages choose the right
  // text (Arabic when populated, otherwise English) and tell the component
  // which one it is.
  lang?: 'en' | 'ar';
}

export default function EventSummary({ summary, lang = 'en' }: EventSummaryProps) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fontClass = lang === 'ar' ? '' : 'font-body';

  return (
    <section className="my-8 md:my-12">
      <p
        lang={lang}
        dir={dir}
        className={`drop-cap ${fontClass} text-lg md:text-xl leading-relaxed text-ink-light max-w-prose mx-auto`}
      >
        {summary}
      </p>
    </section>
  );
}
