interface LocationBadgeProps {
  location: string;
  locationArabic: string;
}

export default function LocationBadge({ location, locationArabic }: LocationBadgeProps) {
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
      <span className="font-body">{location}</span>
      {locationArabic && (
        <>
          <span className="text-ink-light/30" aria-hidden="true">|</span>
          <span dir="rtl" lang="ar" className="font-arabic text-base">
            {locationArabic}
          </span>
        </>
      )}
    </span>
  );
}
