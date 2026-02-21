import type { Metadata, Viewport } from 'next';
import { amiri, cormorantGaramond, sourceSerif4 } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BASE_METADATA } from '@/lib/metadata';
import '@/styles/globals.css';

export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  themeColor: '#f5efe0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${amiri.variable} ${cormorantGaramond.variable} ${sourceSerif4.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
