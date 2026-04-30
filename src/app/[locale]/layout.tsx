import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { amiri, cormorantGaramond, sourceSerif4 } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { routing, localeDirection, type Locale } from '@/i18n/routing';
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
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        en: '/',
        ar: '/ar',
        'x-default': '/',
      },
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

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${amiri.variable} ${cormorantGaramond.variable} ${sourceSerif4.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <Header locale={locale as Locale} />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
