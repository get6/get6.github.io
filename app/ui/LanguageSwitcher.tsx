'use client'

import {
  locales,
  defaultLocale,
  localeNames,
  type AllLocale,
} from '@/app/i18n/config'
import { useDictionary } from '@/app/i18n/use-dictionary'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

function buildLocalePath(pathname: string, targetLocale: string): string {
  // Strip current locale prefix if present
  const allLocales: readonly string[] = [...locales, defaultLocale]
  const segments = pathname.split('/')
  const hasLocalePrefix =
    segments.length > 1 && allLocales.includes(segments[1])
  const pathWithoutLocale = hasLocalePrefix
    ? '/' + segments.slice(2).join('/')
    : pathname

  // Korean (default) has no prefix
  if (targetLocale === defaultLocale) {
    return pathWithoutLocale || '/'
  }

  return `/${targetLocale}${pathWithoutLocale}`
}

export default function LanguageSwitcher() {
  const { locale } = useDictionary()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const allLocales: string[] = [defaultLocale, ...locales]

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
        aria-label="Language"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="hidden lg:inline">{localeNames[locale]}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {allLocales.map((loc) => (
            <Link
              key={loc}
              href={buildLocalePath(pathname, loc)}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                loc === locale
                  ? 'font-semibold text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {localeNames[loc]}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
