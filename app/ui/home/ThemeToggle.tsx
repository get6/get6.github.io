'use client'

import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const utterancesEl = document.querySelector(
      'iframe.utterances-frame',
    ) as HTMLIFrameElement | null

    if (!utterancesEl) return

    const utterancesTheme = `github-${resolvedTheme ?? 'light'}`
    utterancesEl.contentWindow?.postMessage(
      { type: 'set-theme', theme: utterancesTheme },
      'https://utteranc.es/',
    )
  }, [mounted, resolvedTheme])

  const currentTheme = useMemo(() => {
    if (resolvedTheme) return resolvedTheme
    if (
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
    ) {
      return 'dark'
    }
    return 'light'
  }, [resolvedTheme])

  const handleToggle = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return <div className="h-6 w-6 p-1" />
  }

  return (
    <button
      type="button"
      aria-label={dictionary.common.themeToggle}
      title={
        currentTheme === 'dark'
          ? dictionary.common.lightMode
          : dictionary.common.darkMode
      }
      onClick={handleToggle}
      className="p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
    >
      {currentTheme === 'dark' ? (
        <MoonIcon className="h-6 w-6 text-white hover:text-blue-300" />
      ) : (
        <SunIcon className="h-6 w-6 text-gray-900 hover:text-yellow-500 dark:text-white dark:hover:text-yellow-500" />
      )}
    </button>
  )
}
