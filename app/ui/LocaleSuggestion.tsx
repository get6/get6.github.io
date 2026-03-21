'use client'

import {
  defaultLocale,
  locales,
  localeNames,
  localePath,
} from '@/app/i18n/config'
import { getLocaleFromPathname } from '@/app/i18n/client-dictionary'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'locale-suggestion-dismissed'

/** Map browser language prefix to supported locale */
function detectLocale(browserLang: string): string | null {
  const prefix = browserLang.split('-')[0].toLowerCase()
  const allLocales: string[] = [defaultLocale, ...locales]
  return allLocales.includes(prefix) ? prefix : null
}

export default function LocaleSuggestion() {
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null)
  const pathname = usePathname()
  const currentLocale = getLocaleFromPathname(pathname)

  useEffect(() => {
    // Don't show if already dismissed
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const detected = detectLocale(navigator.language)
    if (detected && detected !== currentLocale) {
      setSuggestedLocale(detected)
    }
  }, [currentLocale])

  if (!suggestedLocale) return null

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setSuggestedLocale(null)
  }

  // Build path for the suggested locale
  const allLocales = [defaultLocale, ...locales] as string[]
  const segments = pathname.split('/')
  const hasLocalePrefix =
    segments.length > 1 && allLocales.includes(segments[1])
  const pathWithoutLocale = hasLocalePrefix
    ? '/' + segments.slice(2).join('/')
    : pathname
  const suggestedPath = localePath(pathWithoutLocale || '/', suggestedLocale)

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-fade-in">
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {localeNames[suggestedLocale]}?
        </span>
        <Link
          href={suggestedPath}
          onClick={handleDismiss}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          {localeNames[suggestedLocale]}
        </Link>
        <button
          onClick={handleDismiss}
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
