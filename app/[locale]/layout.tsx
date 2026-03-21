import { locales, isLocale } from '@/app/i18n/config'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { DictionaryProvider } from '@/app/i18n/use-dictionary'
import SetHtmlLang from '@/app/i18n/SetHtmlLang'
import { notFound } from 'next/navigation'

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
    <DictionaryProvider dictionary={dictionary} locale={locale}>
      <SetHtmlLang locale={locale} />
      {children}
    </DictionaryProvider>
  )
}
