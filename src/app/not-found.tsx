import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Decorative element */}
        <div className="mb-6" aria-hidden="true">
          <svg
            className="mx-auto"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="40,4 52,14 58,28 58,52 52,66 40,76 28,66 22,52 22,28 28,14"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.5"
            />
            <polygon
              points="40,16 48,22 52,32 52,48 48,58 40,64 32,58 28,48 28,32 32,22"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="0.7"
              opacity="0.3"
            />
            <text
              x="40"
              y="44"
              textAnchor="middle"
              fontFamily="var(--font-cormorant), serif"
              fontSize="20"
              fontWeight="600"
              fill="var(--color-gold-dark)"
            >
              404
            </text>
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
          Page Not Found
        </h1>

        <p className="font-body text-base text-ink-light leading-relaxed mb-8 mx-auto">
          The page you are looking for does not exist. It may have been moved or
          the path may be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 font-display text-sm font-semibold tracking-wide text-parchment rounded-sm transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: 'var(--color-gold-dark)' }}
          >
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
                d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Return Home
          </Link>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-1 px-6 py-2.5 font-display text-sm font-medium tracking-wide text-ink-light hover:text-gold-dark transition-colors rounded-sm"
          >
            View Timeline
          </Link>
        </div>
      </div>
    </main>
  );
}
