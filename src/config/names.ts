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


// Works whose keys in `src/config/sources.ts` differ from the citation strings
// used inside the event data, so both spellings resolve.
Object.assign(SOURCE_NAMES, {
  'Ar-Raheeq Al-Makhtum (The Sealed Nectar)': {
    ar: 'Ø§ÙØ±Ø­ÙÙ Ø§ÙÙØ®ØªÙÙ',
    fr: 'Ar-RahÃ®q al-MakhtoÃ»m (Le Nectar cachetÃ©)',
  },
  'Sirat Rasul Allah': {
    ar: 'Ø³ÙØ±Ø© Ø±Ø³ÙÙ Ø§ÙÙÙ',
    fr: 'SÃ®rat RasÃ»l AllÃ¢h',
  },
  'Al-Bidaya wan-Nihaya': {
    ar: 'Ø§ÙØ¨Ø¯Ø§ÙØ© ÙØ§ÙÙÙØ§ÙØ©',
    fr: 'Al-BidÃ¢ya wa an-NihÃ¢ya',
  },
  'Asbab al-Nuzul': {
    ar: 'Ø£Ø³Ø¨Ø§Ø¨ Ø§ÙÙØ²ÙÙ',
    fr: 'AsbÃ¢b an-NouzoÃ»l',
  },
  "Tabaqat Ibn Sa'd": {
    ar: 'Ø§ÙØ·Ø¨ÙØ§Øª Ø§ÙÙØ¨Ø±Ù ÙØ§Ø¨Ù Ø³Ø¹Ø¯',
    fr: "At-TabaqÃ¢t d'Ibn Sa'd",
  },
  'Al-Sunan al-Kubra': {
    ar: 'Ø§ÙØ³ÙÙ Ø§ÙÙØ¨Ø±Ù',
    fr: 'As-Sounan al-KoubrÃ¢',
  },
});

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


// A few events store the year as a phrase rather than a BH or AH figure.
export const YEAR_PHRASES: Record<string, LocalizedName> = {
  '13th year of Prophethood': {
    ar: 'السنة الثالثة عشرة من البعثة',
    fr: "La treizième année de la prophétie",
  },
};

export const localizeYearPhrase = (value: string, locale: string) =>
  lookup(YEAR_PHRASES, value, locale);

export const isYearPhrase = (value: string) => value in YEAR_PHRASES;

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

// Authors as they appear on the about page. The death year is kept in the
// reader's own era marker rather than a bare "d. 870 CE".
export const AUTHOR_NAMES: Record<string, LocalizedName> = {
  'Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)': {
    ar: 'الإمام محمد بن إسماعيل البخاري (ت ٢٥٦ هـ)',
    fr: "L'imâm Mouhammad ibn Ismâ'îl al-Boukhârî (m. 870 ap. J.-C.)",
  },
  'Imam Muslim ibn al-Hajjaj (d. 875 CE)': {
    ar: 'الإمام مسلم بن الحجاج (ت ٢٦١ هـ)',
    fr: "L'imâm Mouslim ibn al-Hajjâj (m. 875 ap. J.-C.)",
  },
  'Imam Abu Isa at-Tirmidhi (d. 892 CE)': {
    ar: 'الإمام أبو عيسى الترمذي (ت ٢٧٩ هـ)',
    fr: "L'imâm Abou 'Îsâ at-Tirmidhî (m. 892 ap. J.-C.)",
  },
  'Imam Abu Dawud as-Sijistani (d. 889 CE)': {
    ar: 'الإمام أبو داود السجستاني (ت ٢٧٥ هـ)',
    fr: "L'imâm Abou Dâwoud as-Sijistânî (m. 889 ap. J.-C.)",
  },
  'Sheikh Safiur Rahman al-Mubarakpuri': {
    ar: 'الشيخ صفي الرحمن المباركفوري',
    fr: 'Le cheikh Safiy ar-Rahmân al-Moubârakfoûrî',
  },
  'Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)': {
    ar: 'ابن إسحاق (ت ١٥٠ هـ)، تهذيب ابن هشام (ت ٢١٨ هـ)',
    fr: 'Ibn Ishâq (m. 767 ap. J.-C.), édité par Ibn Hichâm (m. 833 ap. J.-C.)',
  },
  'Imam Ibn Kathir (d. 1373 CE)': {
    ar: 'الإمام ابن كثير (ت ٧٧٤ هـ)',
    fr: "L'imâm Ibn Kathîr (m. 1373 ap. J.-C.)",
  },
  'Ali ibn Ahmad al-Wahidi (d. 1075 CE)': {
    ar: 'علي بن أحمد الواحدي (ت ٤٦٨ هـ)',
    fr: 'Alî ibn Ahmad al-Wâhidî (m. 1075 ap. J.-C.)',
  },
  'Imam al-Bayhaqi': { ar: 'الإمام البيهقي', fr: "L'imâm al-Bayhaqî" },
  'Imam Ahmad ibn Hanbal': { ar: 'الإمام أحمد بن حنبل', fr: "L'imâm Ahmad ibn Hanbal" },
};

export const localizeAuthor = (value: string, locale: string) =>
  lookup(AUTHOR_NAMES, value, locale);

export const isUnregisteredAuthor = (value: string) => !(value in AUTHOR_NAMES);
