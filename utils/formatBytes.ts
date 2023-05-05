const numberFormatters: Record<string, Intl.NumberFormat> = {};

const units = [
  { en: "B", fr: "o", de: "B", he: "ב", ar: "ب", zh: "B", ja: "B", ru: "Б" },
  {
    en: "KB",
    fr: "Ko",
    de: "KB",
    he: 'ק"ב',
    ar: "ك.ب",
    zh: "KB",
    ja: "キロバイト",
    ru: "КБ",
  },
  {
    en: "MB",
    fr: "Mo",
    de: "MB",
    he: 'מ"ב',
    ar: "م.ب",
    zh: "MB",
    ja: "メガバイト",
    ru: "МБ",
  },
  {
    en: "GB",
    fr: "Go",
    de: "GB",
    he: 'ג"ב',
    ar: "ج.ب",
    zh: "GB",
    ja: "ギガバイト",
    ru: "ГБ",
  },
  {
    en: "TB",
    fr: "To",
    de: "TB",
    he: 'ט"ב',
    ar: "ت.ب",
    zh: "TB",
    ja: "テラバイト",
    ru: "ТБ",
  },
  {
    en: "PB",
    fr: "Po",
    de: "PB",
    he: 'פ"ב',
    ar: "ب.ت",
    zh: "PB",
    ja: "ペタバイト",
    ru: "ПБ",
  },
  {
    en: "EB",
    fr: "Eo",
    de: "EB",
    he: 'א"ב',
    ar: "ع.ب",
    zh: "EB",
    ja: "エクサバイト",
    ru: "ЭБ",
  },
  {
    en: "ZB",
    fr: "Zo",
    de: "ZB",
    he: 'ז"ב',
    ar: "ز.ب",
    zh: "ZB",
    ja: "ゼタバイト",
    ru: "ЗБ",
  },
  {
    en: "YB",
    fr: "Yo",
    de: "YB",
    he: 'י"ב',
    ar: "ي.ب",
    zh: "YB",
    ja: "ヨタバイト",
    ru: "ЙБ",
  },
];

function getNumberFormatter(locale: string): Intl.NumberFormat {
  if (!numberFormatters[locale]) {
    numberFormatters[locale] = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
  return numberFormatters[locale];
}

function getUnitAndIndex(bytes: number): {
  unitIndex: number;
  unitSize: number;
} {
  const base = 1024;
  const logBytes = Math.log(bytes) / Math.log(base);
  const unitIndex = Math.floor(logBytes);
  const unitSize = bytes / Math.pow(base, unitIndex);
  return { unitIndex, unitSize };
}

function getLocalizedUnit(locale: string, unitIndex: number): string {
  const localeUnits: Record<string, any> = {
    "en-US": units[unitIndex].en,
    "fr-FR": units[unitIndex].fr,
    "de-DE": units[unitIndex].de,
    "he-IL": units[unitIndex].he,
    "ar-001": units[unitIndex].ar, // Classic Arabic
    "zh-CN": units[unitIndex].zh,
    "ja-JP": units[unitIndex].ja,
    "ru-RU": units[unitIndex].ru,
  };

  return localeUnits[locale] || localeUnits["en-US"]; // Fallback to 'en-US' if the locale is not supported
}

export function formatBytes(bytes: number, locale: string = "en-US"): string {
  if (bytes === 0) {
    return `0 ${getLocalizedUnit(locale, 0)}`;
  }

  const { unitIndex, unitSize } = getUnitAndIndex(bytes);

  const numberFormatter = getNumberFormatter(locale);

  return `${numberFormatter.format(unitSize)} ${getLocalizedUnit(
    locale,
    unitIndex
  )}`;
}
