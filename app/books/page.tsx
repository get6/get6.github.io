import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { BookStatus } from '@/app/lib/definitions'

export const metadata = createMetadata({
  title: '책',
  description: '읽고 있는 책, 읽은 책, 읽고 싶은 책을 정리한 공간입니다.',
  url: '/books',
})
import { isActivelyReading, isPausedBook } from '@/app/lib/utils'
import BookTable from '@/app/ui/books/BookTable'
import ReadingBook from '@/app/ui/books/ReadingBook'
import ReadingBookCard from '@/app/ui/books/ReadingBookCard'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import { allBooks } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export default async function Books() {
  const dictionary = await getDictionary('ko')

  const books = allBooks.sort((a, b) =>
    compareDesc(new Date(a.start_read_date), new Date(b.start_read_date)),
  )

  const readingBooks = books.filter((book) => isActivelyReading(book))

  const finishedBooks = books
    .filter((book) => book.status === BookStatus.Finished)
    .sort((a, b) =>
      compareDesc(new Date(a.finish_read_date), new Date(b.finish_read_date)),
    )

  const toReadBooks = books
    .filter((book) => book.status === BookStatus.ToRead || isPausedBook(book))
    .sort((a, b) =>
      compareDesc(new Date(a.publish_date), new Date(b.publish_date)),
    )

  return (
    <PageScreen>
      <div className="flex w-full max-w-[888px] flex-col justify-center gap-8">
        {readingBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            {readingBooks.length == 1 && (
              <>
                <PageTitle>{dictionary.books.reading}</PageTitle>
                <ReadingBook book={readingBooks[0]} />
              </>
            )}
            {readingBooks.length > 1 && (
              <>
                <PageTitle>{dictionary.books.readingList}</PageTitle>
                <div className="flex w-full justify-between gap-4">
                  {readingBooks.map((book, index) => (
                    <ReadingBookCard key={index} book={book} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {finishedBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PageTitle>{dictionary.books.finishedList}</PageTitle>
            <BookTable books={finishedBooks} isFinished />
          </div>
        )}
        {toReadBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PageTitle>{dictionary.books.toReadList}</PageTitle>
            <BookTable books={toReadBooks} />
          </div>
        )}
      </div>
    </PageScreen>
  )
}
