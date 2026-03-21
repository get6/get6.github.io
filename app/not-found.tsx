'use client'

import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import { localePath } from '@/app/i18n/config'
import { usePathname, useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)

  const handleGoHome = () => {
    router.replace(localePath('/', locale))
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
          {dictionary.error.notFoundTitle}
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          {dictionary.error.notFoundMessage}
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {dictionary.error.notFoundDescription}
        </p>
        <button
          onClick={handleGoHome}
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {dictionary.error.goHome}
        </button>
      </div>
    </div>
  )
}
