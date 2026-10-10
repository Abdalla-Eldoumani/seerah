'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
}

// Small spaced capitals, like the labels on a map. Arabic drops the spacing
// through the global rule and takes a larger size, since 13 px is too small
// for Arabic letterforms.
const navLinkClass =
  'inline-flex min-h-11 items-center border-b-2 border-transparent text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink-light transition-colors hover:text-terracotta aria-[current=page]:border-terracotta aria-[current=page]:text-ink rtl:text-[0.9375rem]';

export function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.timeline'), href: '/timeline' },
    { label: t('nav.about'), href: '/about' },
  ];

  // Only the page itself is marked current; an era page marks neither link.
  const isCurrent = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-display text-2xl font-bold text-ink transition-colors hover:text-terracotta"
          >
            {t('site.name')}
          </Link>

          <ul className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  className={navLinkClass}
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
            className="sm:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-light hover:text-terracotta transition-colors"
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

        {/* Collapsing by height alone leaves the links and the second language
            select in the tab order, so a keyboard user tabs through a menu they
            cannot see. `inert` takes the whole subtree out. */}
        <div
          inert={!mobileMenuOpen}
          className={cn(
            'sm:hidden overflow-hidden transition-[max-height] duration-200',
            mobileMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-3 border-t border-line pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher locale={locale} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
