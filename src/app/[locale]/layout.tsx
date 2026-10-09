import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { amiri, cormorantGaramond, ibmPlexSansArabic, sourceSerif4 } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { routing, localeDirection, type Locale } from '@/i18n/routing';
import { OG_LOCALES, SITE_URL } from '@/lib/seo';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const tSite = await getTranslations({ locale, namespace: 'site' });
  const siteName = tSite('name');
  const subtitle = tSite('subtitle');
  const description = tSite('description');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} | ${subtitle}`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      'Seerah',
      'Prophet Muhammad',
      'Islamic history',
      'timeline',
      'biography',
    ],
    authors: [{ name: 'Noor al-Seerah Project' }],
    openGraph: {
      title: `${siteName} | ${subtitle}`,
      description,
      type: 'website',
      locale: OG_LOCALES[locale],
      siteName,
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#f5efe0',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: 'nav' });

  // Load only the fonts each locale actually renders. Latin pages skip the
  // Plex Arabic UI face. Arabic pages skip Cormorant Garamond and Source Serif.
  // Amiri is loaded everywhere because Quranic verses render in Amiri regardless of locale.
  const fontClass =
    locale === 'ar'
      ? `${amiri.variable} ${ibmPlexSansArabic.variable}`
      : `${amiri.variable} ${cormorantGaramond.variable} ${sourceSerif4.variable}`;

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={fontClass}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          {/* Without this a keyboard user traverses the whole header on every
              one of the ~170 pages before reaching the content. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-midnight focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-parchment"
          >
            {tNav('skipToContent')}
          </a>
          <Header locale={locale as Locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
