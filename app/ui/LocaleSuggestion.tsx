'use client'

import { defaultLocale, locales } from '@/app/i18n/config'
import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  /** Locale-prefixed paths where translations exist, e.g. ["/en/posts/slug", "/ja/posts/slug"] */
  readonly availableTranslations: Record<string, string>
}

const AUTO_DISMISS_MS = 5000

export default function LocaleSuggestion({ availableTranslations }: Props) {
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const currentLocale = getLocaleFromPathname(pathname)

  useEffect(() => {
    const browserPrefix = navigator.language.split('-')[0].toLowerCase()
    const allLocales: string[] = [defaultLocale, ...locales]

    // Only suggest if browser language is supported, differs from current, and translation exists
    if (
      allLocales.includes(browserPrefix) &&
      browserPrefix !== currentLocale &&
      availableTranslations[browserPrefix]
    ) {
      setSuggestedLocale(browserPrefix)
      setVisible(true)
    }
  }, [currentLocale, availableTranslations])

  // Auto-dismiss
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [visible])

  if (!visible || !suggestedLocale) return null

  const suggestedDict = getClientDictionary(suggestedLocale)
  const suggestedPath = availableTranslations[suggestedLocale]

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <Link
        href={suggestedPath}
        onClick={() => setVisible(false)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {suggestedDict.common.switchTo}
      </Link>
    </div>
  )
}
