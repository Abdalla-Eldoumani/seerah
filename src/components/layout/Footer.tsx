import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gold/15 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-light/70">
          {/* Copyright */}
          <p className="font-body">
            &copy; {new Date().getFullYear()} Noor al-Seerah
          </p>

          {/* Center note */}
          <p className="font-body text-center text-xs max-w-xs">
            Content verified from authenticated Islamic sources
          </p>

          {/* Links */}
          <Link
            href="/about"
            className="font-display text-xs tracking-widest uppercase hover:text-gold-dark transition-colors"
          >
            Sources &amp; About
          </Link>
        </div>
      </div>
    </footer>
  );
}
