import { getDictionary } from '@/app/i18n/get-dictionary'
import { getBooksByLocale } from '@/app/lib/content'
import { getRepos } from '@/app/lib/library'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { locales } from '@/app/i18n/config'
import LibraryPageContent from '@/app/ui/library/LibraryPageContent'
import { Metadata } from 'next'

export const generateStaticParams = async () =>
  locales.map((locale) => ({ locale }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return createMetadata({
    title: dictionary.nav.library,
    description: dictionary.library.metaDescription,
    url: `/${locale}/library`,
    locale,
    blogName: dictionary.meta.blogName,
  })
}

export default async function LocaleLibrary({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const repos = await getRepos()
  let books = getBooksByLocale(locale)
  if (books.length === 0) {
    books = getBooksByLocale('ko')
  }
  return (
    <LibraryPageContent dictionary={dictionary} repos={repos} books={books} />
  )
}
