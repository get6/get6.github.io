'use client'

import { createContext, useContext } from 'react'
import type { Dictionary } from './get-dictionary'
import type { AllLocale } from './config'

interface DictionaryContextValue {
  readonly dictionary: Dictionary
  readonly locale: string
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null)

interface DictionaryProviderProps {
  readonly children: React.ReactNode
  readonly dictionary: Dictionary
  readonly locale: string
}

export function DictionaryProvider({
  children,
  dictionary,
  locale,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary(): DictionaryContextValue {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
