'use client'

import { useEffect } from 'react'

export default function SetHtmlLang({ locale }: { readonly locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
