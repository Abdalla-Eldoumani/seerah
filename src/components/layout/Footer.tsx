import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { rich } from '@/lib/rich';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-ink-soft sm:flex-row">
          <p className="font-body">{t('footer.copyright', { year })}</p>

          <p className="max-w-sm text-center font-body">
            {t.rich('footer.verifiedNote', rich)}
          </p>

          <Link
            href="/about"
            className="inline-flex min-h-11 items-center text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-terracotta rtl:text-[0.9375rem]"
          >
            {t('footer.sourcesLink')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
