'use client'

import ko from '@/app/i18n/dictionaries/ko.json'
import en from '@/app/i18n/dictionaries/en.json'
import ja from '@/app/i18n/dictionaries/ja.json'
import { defaultLocale, locales } from './config'
import type { Dictionary } from './get-dictionary'

const dictionaries: Record<string, Dictionary> = { ko, en, ja }

const allLocales: readonly string[] = [defaultLocale, ...locales]

/** Extract locale from pathname */
export function getLocaleFromPathname(pathname: string): string {
  const segment = pathname.split('/')[1]
  if (segment && allLocales.includes(segment)) {
    return segment
  }
  return defaultLocale
}

/** Get dictionary synchronously (client-side only) */
export function getClientDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? dictionaries.ko
}
