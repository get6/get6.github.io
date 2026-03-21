'use client'

import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const locale =
        typeof window !== 'undefined'
          ? getLocaleFromPathname(window.location.pathname)
          : 'ko'
      const dictionary = getClientDictionary(locale)

      return (
        this.props.fallback || (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-900/20">
            <h2 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">
              {dictionary.common.errorOccurred}
            </h2>
            <p className="mb-4 text-sm text-red-600 dark:text-red-300">
              {dictionary.common.errorRetry}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              {dictionary.common.refresh}
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
