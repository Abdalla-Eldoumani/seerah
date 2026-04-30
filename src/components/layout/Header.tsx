'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.timeline'), href: '/timeline' },
    { label: t('nav.about'), href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-gold/20">
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl sm:text-2xl font-semibold text-ink tracking-wide hover:text-gold-dark transition-colors"
          >
            {t('site.name')}
          </Link>

          <ul className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-sm tracking-widest uppercase text-ink-light hover:text-gold-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher locale={locale} />
            </li>
          </ul>

          <button
            type="button"
            className="sm:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-light hover:text-gold-dark transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={cn(
            'sm:hidden overflow-hidden transition-all duration-200 ease-in-out',
            mobileMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-3 border-t border-gold/10 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 font-display text-sm tracking-widest uppercase text-ink-light hover:text-gold-dark transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <LanguageSwitcher locale={locale} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
