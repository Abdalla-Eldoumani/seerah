interface EventSummaryProps {
  summary: string;
}

export default function EventSummary({ summary }: EventSummaryProps) {
  return (
    <section className="my-8 md:my-12">
      <p className="drop-cap font-body text-lg md:text-xl leading-relaxed text-ink-light max-w-prose mx-auto">
        {summary}
      </p>
    </section>
  );
}
