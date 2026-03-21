'use client'

import { locales, defaultLocale } from '@/app/i18n/config'
import { useDictionary } from '@/app/i18n/use-dictionary'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const localeFlags: Record<string, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
}

const allLocales: string[] = [defaultLocale, ...locales]

function buildLocalePath(pathname: string, targetLocale: string): string {
  const segments = pathname.split('/')
  const hasLocalePrefix =
    segments.length > 1 &&
    (allLocales as readonly string[]).includes(segments[1])
  const pathWithoutLocale = hasLocalePrefix
    ? '/' + segments.slice(2).join('/')
    : pathname

  if (targetLocale === defaultLocale) {
    return pathWithoutLocale || '/'
  }

  return `/${targetLocale}${pathWithoutLocale}`
}

function getLocaleFromPathname(pathname: string): string {
  const segment = pathname.split('/')[1]
  if (segment && (allLocales as readonly string[]).includes(segment)) {
    return segment
  }
  return defaultLocale
}

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  const currentIndex = allLocales.indexOf(locale)
  const nextLocale = allLocales[(currentIndex + 1) % allLocales.length]

  return (
    <Link
      href={buildLocalePath(pathname, nextLocale)}
      className="text-base"
      aria-label={`Switch to ${nextLocale}`}
    >
      {localeFlags[locale]}
    </Link>
  )
}
