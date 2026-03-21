export const locales = ['en', 'ja'] as const
export const defaultLocale = 'ko' as const

export type Locale = (typeof locales)[number]
export type AllLocale = Locale | typeof defaultLocale

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function isAllLocale(value: string): value is AllLocale {
  return value === defaultLocale || isLocale(value)
}

/** Maps locale to OpenGraph locale string */
export const ogLocaleMap: Record<AllLocale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
}

/** Maps locale to html lang attribute */
export const htmlLangMap: Record<AllLocale, string> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
}

/** Maps locale to native language name */
export const localeNames: Record<string, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
}

/** Prefixes a path with locale for non-default locales */
export function localePath(path: string, locale: string): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
}
