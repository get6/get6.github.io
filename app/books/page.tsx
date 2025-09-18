import { BookStatus } from '@/app/lib/definitions'
import { isActivelyReading, isPausedBook } from '@/app/lib/utils'
import BookTable from '@/app/ui/books/BookTable'
import ReadingBook from '@/app/ui/books/ReadingBook'
import ReadingBookCard from '@/app/ui/books/ReadingBookCard'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import { allBooks } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export default function Books() {
  const books = allBooks.sort((a, b) =>
    compareDesc(new Date(a.start_read_date), new Date(b.start_read_date)),
  )

  // 실제로 활발하게 읽고 있는 책만 필터링 (30일 이내)
  const readingBooks = books.filter((book) => isActivelyReading(book))

  const finishedBooks = books
    .filter((book) => book.status === BookStatus.Finished)
    .sort((a, b) =>
      compareDesc(new Date(a.finish_read_date), new Date(b.finish_read_date)),
    )

  // to read list에 원래 to_read 상태와 논리적으로 paused인 책들을 모두 포함
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
                <PageTitle>Book I am reading</PageTitle>
                <ReadingBook book={readingBooks[0]} />
              </>
            )}
            {readingBooks.length > 1 && (
              <>
                <PageTitle>Reading list</PageTitle>
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
            <PageTitle>Finished reading list</PageTitle>
            <BookTable books={finishedBooks} isFinished />
          </div>
        )}
        {toReadBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PageTitle>To read list</PageTitle>
            <BookTable books={toReadBooks} />
          </div>
        )}
      </div>
    </PageScreen>
  )
}
