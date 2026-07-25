import { useLocale } from 'next-intl';

interface LocationBadgeProps {
  location: string;
  locationArabic: string;
}

export default function LocationBadge({ location, locationArabic }: LocationBadgeProps) {
  const locale = useLocale();
  // Both values were previously rendered side by side on every locale, so the
  // Arabic page showed the Latin name next to the Arabic one. Show the reader
  // the name in the language they are reading.
  const showArabic = locale === 'ar' && Boolean(locationArabic);
  const name = showArabic ? locationArabic : location;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-light/70">
      {/* Map pin icon */}
      <svg
        className="w-4 h-4 text-gold-dark flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span
        dir={showArabic ? 'rtl' : 'ltr'}
        lang={showArabic ? 'ar' : 'en'}
        className={showArabic ? 'font-arabic text-base' : 'font-body'}
      >
        {name}
      </span>
    </span>
  );
}
