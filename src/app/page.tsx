import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Islamic geometric pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Central octagon */}
              <polygon
                points="40,8 56,16 64,32 64,48 56,64 40,72 24,64 16,48 16,32 24,16"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              {/* Inner star */}
              <polygon
                points="40,18 48,28 58,28 52,38 54,48 40,44 26,48 28,38 22,28 32,28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* Connecting lines to adjacent cells */}
              <line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="0.4" />
              <line x1="80" y1="0" x2="64" y2="16" stroke="currentColor" strokeWidth="0.4" />
              <line x1="0" y1="80" x2="16" y2="64" stroke="currentColor" strokeWidth="0.4" />
              <line x1="80" y1="80" x2="64" y2="64" stroke="currentColor" strokeWidth="0.4" />
              {/* Small diamonds at corners */}
              <polygon
                points="0,0 6,4 0,8 -6,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              <polygon
                points="80,0 86,4 80,8 74,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              <polygon
                points="0,80 6,84 0,88 -6,84"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              <polygon
                points="80,80 86,84 80,88 74,84"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Decorative gold corner accents */}
      <div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 rounded-tl-sm"
        style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 rounded-tr-sm"
        style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 rounded-bl-sm"
        style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 rounded-br-sm"
        style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-2xl mx-auto">
        {/* Small decorative element above title */}
        <div className="mb-8" aria-hidden="true">
          <svg
            className="mx-auto"
            width="60"
            height="24"
            viewBox="0 0 60 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12h18M42 12h18M24 0l6 12-6 12-6-12z"
              stroke="var(--color-gold)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="30" cy="12" r="2" fill="var(--color-gold)" />
          </svg>
        </div>

        {/* Arabic title */}
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-gold text-3xl sm:text-4xl md:text-5xl mb-4 leading-relaxed"
        >
          نور السيرة
        </p>

        {/* English title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink tracking-tight mb-3">
          Noor al-Seerah
        </h1>

        {/* English subtitle */}
        <p className="font-display text-lg sm:text-xl md:text-2xl text-ink-light font-medium tracking-wide mb-8 mx-auto">
          The Light of the Biography
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
          <div
            className="flex-1 max-w-[100px] h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-gold))',
            }}
          />
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
          <div
            className="flex-1 max-w-[100px] h-px"
            style={{
              background:
                'linear-gradient(to left, transparent, var(--color-gold))',
            }}
          />
        </div>

        {/* Tagline */}
        <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed max-w-lg mx-auto mb-12">
          An Interactive Journey Through the Life of Prophet Muhammad &#xFDFA;
        </p>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-display text-base sm:text-lg font-semibold tracking-wide text-parchment rounded-sm transition-all duration-200 hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment"
            style={{
              backgroundColor: 'var(--color-gold-dark)',
            }}
          >
            Begin the Journey
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-1 px-6 py-3 font-display text-sm sm:text-base font-medium tracking-wide text-ink-light hover:text-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 rounded-sm"
          >
            About This Project
          </Link>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16" aria-hidden="true">
          <svg
            className="mx-auto"
            width="120"
            height="20"
            viewBox="0 0 120 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="10"
              x2="45"
              y2="10"
              stroke="var(--color-gold)"
              strokeWidth="0.5"
              opacity="0.5"
            />
            <circle cx="50" cy="10" r="1.5" fill="var(--color-gold)" opacity="0.4" />
            <circle cx="60" cy="10" r="2.5" fill="var(--color-gold)" opacity="0.6" />
            <circle cx="70" cy="10" r="1.5" fill="var(--color-gold)" opacity="0.4" />
            <line
              x1="75"
              y1="10"
              x2="120"
              y2="10"
              stroke="var(--color-gold)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
