import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/15 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-soft">
          <p className="font-body">{t('footer.copyright', { year })}</p>

          <p className="font-body text-center text-xs max-w-xs">
            {t('footer.verifiedNote')}
          </p>

          <Link
            href="/about"
            className="font-display text-xs tracking-widest uppercase text-ink-soft hover:text-gold-dark transition-colors"
          >
            {t('footer.sourcesLink')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
