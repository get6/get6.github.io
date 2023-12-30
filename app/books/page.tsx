import { allBooks } from '@/.contentlayer/generated'
import { BookStatus } from '@/app/lib/definitions'
import BookTable from '@/app/ui/books/BookTable'
import ReadingBook from '@/app/ui/books/ReadingBook'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import { compareDesc } from 'date-fns'

export default function Books() {
  const books = allBooks.sort((a, b) =>
    compareDesc(new Date(a.start_read_date), new Date(b.start_read_date)),
  )

  const readingBooks = books.filter(
    (book) => book.status === BookStatus.Reading,
  )
  const finishedBooks = books
    .filter((book) => book.status === BookStatus.Finished)
    .sort((a, b) =>
      compareDesc(new Date(a.finish_read_date), new Date(b.finish_read_date)),
    )
  const toReadBooks = books
    .filter((book) => book.status === BookStatus.ToRead)
    .sort((a, b) =>
      compareDesc(new Date(a.publish_date), new Date(b.publish_date)),
    )

  return (
    <PageScreen>
      <div className="flex w-full max-w-[888px] flex-col justify-center gap-8">
        {readingBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PageTitle>Reading list</PageTitle>
            <div className="flex w-full justify-between gap-4">
              {readingBooks.map((book, index) => (
                <ReadingBook key={index} book={book} />
              ))}
            </div>
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
