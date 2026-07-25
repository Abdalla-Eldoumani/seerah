import type { Locale } from '@/i18n/routing';

// Narrative fields are stored with a language suffix on the English base name:
// `summary`, `summaryArabic`, `summaryFrench`. This resolves the right one for
// the active locale and reports which language actually came back, because the
// caller needs that to set `lang` and `dir` when it falls back.
const SUFFIX: Record<Locale, string> = {
  en: '',
  ar: 'Arabic',
  fr: 'French',
};

export interface LocalizedText {
  text: string;
  lang: Locale;
}

export function localizedField(
  source: object,
  base: string,
  locale: Locale
): LocalizedText {
  const record = source as Record<string, unknown>;
  const key = `${base}${SUFFIX[locale]}`;
  const value = record[key];
  if (typeof value === 'string' && value.trim()) {
    return { text: value, lang: locale };
  }
  // English is the source of record, so it is always the fallback.
  return { text: String(record[base] ?? ''), lang: 'en' };
}
