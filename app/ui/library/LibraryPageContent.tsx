import { Book } from 'contentlayer/generated'
import { Repo } from '@/app/lib/library'
import { Dictionary } from '@/app/i18n/get-dictionary'
import PageScreen from '@/app/ui/layout/PageScreen'
import PageTitle from '@/app/ui/home/PageTitle'
import RepoCard from '@/app/ui/library/RepoCard'
import BookGallery from '@/app/ui/library/BookGallery'
import LibraryNav from '@/app/ui/library/LibraryNav'

interface Props {
  dictionary: Dictionary
  repos: Repo[]
  books: Book[]
}

export default function LibraryPageContent({
  dictionary,
  repos,
  books,
}: Props) {
  const sections = [
    { id: 'books', label: dictionary.library.books, count: books.length },
    { id: 'repos', label: dictionary.library.repos, count: repos.length },
  ]

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col gap-4">
          <PageTitle>{dictionary.nav.library}</PageTitle>
          <p className="text-pretty text-sm font-light leading-relaxed text-gray-700 dark:text-gray-300 md:max-w-3xl lg:max-w-4xl lg:text-base">
            {dictionary.library.pageDescription}
          </p>
        </div>

        <LibraryNav sections={sections} />

        {books.length > 0 && (
          <section id="books" className="flex scroll-mt-8 flex-col gap-4">
            <PageTitle>{dictionary.library.books}</PageTitle>
            <BookGallery books={books} />
          </section>
        )}

        {repos.length > 0 && (
          <section id="repos" className="flex scroll-mt-8 flex-col gap-4">
            <PageTitle>{dictionary.library.repos}</PageTitle>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {repos.map((repo) => (
                <RepoCard key={repo.url} repo={repo} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageScreen>
  )
}
