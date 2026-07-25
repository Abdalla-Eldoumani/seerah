// Localized forms of proper nouns that appear in the event data: the scholarly
// works cited, and the Hijri months. These are names, not narrative, so giving
// them in the reader's script is a rendering concern rather than a content one.
//
// French follows the transliteration used in French-speaking madrassahs
// (circumflex for long vowels, `ou` for damma), so the names read correctly
// aloud to a French speaker.
//
// A name with no entry falls back to the English form, and `npm run verify:i18n`
// reports it rather than letting it pass silently.

export type Locale = 'en' | 'ar' | 'fr';

export interface LocalizedName {
  ar: string;
  fr: string;
}

export const SOURCE_NAMES: Record<string, LocalizedName> = {
  'Sahih al-Bukhari': { ar: 'صحيح البخاري', fr: 'Sahîh al-Boukhârî' },
  'Sahih Muslim': { ar: 'صحيح مسلم', fr: 'Sahîh Mouslim' },
  "Jami' at-Tirmidhi": { ar: 'جامع الترمذي', fr: "Jâmi' at-Tirmidhî" },
  'Sunan Abu Dawud': { ar: 'سنن أبي داود', fr: 'Sounan Abou Dâwoud' },
  'Musnad Ahmad': { ar: 'مسند أحمد', fr: 'Mousnad Ahmad' },
  'Ar-Raheeq Al-Makhtum': { ar: 'الرحيق المختوم', fr: 'Ar-Rahîq al-Makhtoûm' },
  "Ibn Ishaq's Sirah": { ar: 'سيرة ابن إسحاق', fr: "La Sîra d'Ibn Ishâq" },
  "Ibn Kathir's Al-Bidaya wan-Nihaya": {
    ar: 'البداية والنهاية لابن كثير',
    fr: "Al-Bidâya wa an-Nihâya d'Ibn Kathîr",
  },
  "Ibn Sa'd's Tabaqat": { ar: 'الطبقات الكبرى لابن سعد', fr: "At-Tabaqât d'Ibn Sa'd" },
  'Tafsir Ibn Kathir': { ar: 'تفسير ابن كثير', fr: 'Tafsîr Ibn Kathîr' },
  'Al-Bayhaqi': { ar: 'السنن الكبرى للبيهقي', fr: 'Al-Bayhaqî' },
  "Abu Ubayd's Kitab al-Amwal": {
    ar: 'كتاب الأموال لأبي عبيد',
    fr: "Kitâb al-Amwâl d'Abou 'Oubayd",
  },
};

// The Hijri months, plus the qualified forms the data uses for events whose
// dating is reported differently across the sources.
export const MONTH_NAMES: Record<string, LocalizedName> = {
  Muharram: { ar: 'محرم', fr: 'Mouharram' },
  Safar: { ar: 'صفر', fr: 'Safar' },
  "Rabi' al-Awwal": { ar: 'ربيع الأول', fr: "Rabî' al-Awwal" },
  Rajab: { ar: 'رجب', fr: 'Rajab' },
  Ramadan: { ar: 'رمضان', fr: 'Ramadan' },
  Shawwal: { ar: 'شوال', fr: 'Chawwâl' },
  "Dhul Qa'dah": { ar: 'ذو القعدة', fr: "Dhoû al-Qi'da" },
  'Dhul Hijjah': { ar: 'ذو الحجة', fr: 'Dhoû al-Hijja' },
  '12 Rabi\' al-Awwal (Monday)': {
    ar: '١٢ ربيع الأول (يوم الاثنين)',
    fr: "12 Rabî' al-Awwal (un lundi)",
  },
  '17 Ramadan': { ar: '١٧ رمضان', fr: '17 Ramadan' },
  'Ramadan (17th or 21st)': {
    ar: 'رمضان (السابع عشر أو الحادي والعشرون)',
    fr: 'Ramadan (le 17 ou le 21)',
  },
  'Ramadan (20th)': { ar: 'رمضان (العشرون)', fr: 'Ramadan (le 20)' },
  'Rajab (according to many scholars)': {
    ar: 'رجب (على قول كثير من أهل العلم)',
    fr: 'Rajab (selon de nombreux savants)',
  },
  "Rajab or Sha'ban": { ar: 'رجب أو شعبان', fr: "Rajab ou Cha'bân" },
  "Sha'ban/Ramadan": { ar: 'شعبان أو رمضان', fr: "Cha'bân ou Ramadan" },
  'Muharram and after': { ar: 'محرم وما بعده', fr: 'Mouharram et après' },
  "Muharram/Rabi' al-Awwal": {
    ar: 'محرم أو ربيع الأول',
    fr: "Mouharram ou Rabî' al-Awwal",
  },
};

function lookup(
  registry: Record<string, LocalizedName>,
  value: string,
  locale: string,
): string {
  if (locale === 'en') return value;
  const entry = registry[value];
  if (!entry) return value;
  return locale === 'ar' ? entry.ar : entry.fr;
}

export const localizeSource = (value: string, locale: string) =>
  lookup(SOURCE_NAMES, value, locale);

export const localizeMonth = (value: string, locale: string) =>
  lookup(MONTH_NAMES, value, locale);

// True when the registry has no entry, so the verifier can report the gap.
export const isUnregisteredSource = (value: string) => !(value in SOURCE_NAMES);
export const isUnregisteredMonth = (value: string) => !(value in MONTH_NAMES);

export const SURAH_NAMES: Record<string, LocalizedName> = {
  'Al-Fatiha': { ar: 'الفاتحة', fr: 'Al-Fâtiha' },
  'Al-Baqarah': { ar: 'البقرة', fr: 'Al-Baqara' },
  'Aal-Imran': { ar: 'آل عمران', fr: "Âl-'Imrân" },
  "Al-Ma'idah": { ar: 'المائدة', fr: 'Al-Mâïda' },
  'Al-Anfal': { ar: 'الأنفال', fr: 'Al-Anfâl' },
  'At-Tawbah': { ar: 'التوبة', fr: 'At-Tawba' },
  'An-Nahl': { ar: 'النحل', fr: 'An-Nahl' },
  'Al-Isra': { ar: 'الإسراء', fr: 'Al-Isrâ' },
  'Maryam': { ar: 'مريم', fr: 'Maryam' },
  'Ta-Ha': { ar: 'طه', fr: 'Tâ-Hâ' },
  "Ash-Shu'ara": { ar: 'الشعراء', fr: "Ach-Chou'arâ" },
  'Al-Qasas': { ar: 'القصص', fr: 'Al-Qasas' },
  'Al-Ahzab': { ar: 'الأحزاب', fr: 'Al-Ahzâb' },
  'Ya-Sin': { ar: 'يس', fr: 'Yâ-Sîn' },
  'Az-Zumar': { ar: 'الزمر', fr: 'Az-Zoumar' },
  'Al-Fath': { ar: 'الفتح', fr: 'Al-Fath' },
  'Al-Hashr': { ar: 'الحشر', fr: 'Al-Hachr' },
  'An-Najm': { ar: 'النجم', fr: 'An-Najm' },
  'Al-Muddaththir': { ar: 'المدثر', fr: 'Al-Mouddaththir' },
  'Ad-Duha': { ar: 'الضحى', fr: 'Ad-Douhâ' },
  'Ash-Sharh': { ar: 'الشرح', fr: 'Ach-Charh' },
  'Al-Alaq': { ar: 'العلق', fr: "Al-'Alaq" },
  'An-Nasr': { ar: 'النصر', fr: 'An-Nasr' },
  'Al-Masad': { ar: 'المسد', fr: 'Al-Masad' },
  'Al-Fil': { ar: 'الفيل', fr: 'Al-Fîl' },
};

export const localizeSurah = (value: string, locale: string) =>
  lookup(SURAH_NAMES, value, locale);

export const isUnregisteredSurah = (value: string) => !(value in SURAH_NAMES);
