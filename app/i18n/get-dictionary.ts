import type { AllLocale } from './config'

import ko from './dictionaries/ko.json'

export type Dictionary = typeof ko

const dictionaries: Record<AllLocale, () => Promise<Dictionary>> = {
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default),
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = dictionaries[locale as AllLocale]
  if (!loader) {
    return dictionaries.ko()
  }
  return loader()
}
