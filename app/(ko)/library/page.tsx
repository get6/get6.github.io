import { getDictionary } from '@/app/i18n/get-dictionary'
import { getBooksByLocale } from '@/app/lib/content'
import { getRepos } from '@/app/lib/library'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import LibraryPageContent from '@/app/ui/library/LibraryPageContent'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary('ko')
  return createMetadata({
    title: dictionary.nav.library,
    description: dictionary.library.metaDescription,
    url: '/library',
  })
}

export default async function Library() {
  const dictionary = await getDictionary('ko')
  const repos = await getRepos()
  const books = getBooksByLocale('ko')
  return (
    <LibraryPageContent dictionary={dictionary} repos={repos} books={books} />
  )
}
