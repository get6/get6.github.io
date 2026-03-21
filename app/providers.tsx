'use client'

import { DictionaryProvider } from '@/app/i18n/use-dictionary'
import type { Dictionary } from '@/app/i18n/get-dictionary'
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from 'recoil'

interface ProvidersProps {
  readonly children: React.ReactNode
  readonly dictionary: Dictionary
  readonly locale: string
}

export function Providers({ children, dictionary, locale }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class">
      <RecoilRoot>
        <DictionaryProvider dictionary={dictionary} locale={locale}>
          {children}
        </DictionaryProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}
