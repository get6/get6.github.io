import { locales, isLocale } from '@/app/i18n/config'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { sharedMetadata } from '@/app/lib/site-metadata'
import RootDocument from '@/app/ui/layout/RootDocument'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'

export const metadata: Metadata = sharedMetadata

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale)

  return (
    <RootDocument locale={locale} dictionary={dictionary}>
      {children}
    </RootDocument>
  )
}
