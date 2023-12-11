import { allBooks } from '@/.contentlayer/generated'
import BookTable from '@/app/ui/books/BookTable'
import ReadingBook from '@/app/ui/books/ReadingBook'
import PostTitle from '@/app/ui/home/PostTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import { compareDesc } from 'date-fns'

export default function Books() {
  const books = allBooks.sort((a, b) =>
    compareDesc(new Date(a.start_read_date), new Date(b.start_read_date)),
  )

  const readingBooks = books.filter((book) => book.status === 'reading')
  const finishedBooks = books.filter((book) => book.status === 'finished')
  const toReadBooks = books.filter((book) => book.status === 'to_read')

  return (
    <PageScreen>
      <div className="flex w-full max-w-[888px] flex-col justify-center gap-8">
        {readingBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PostTitle>Reading list</PostTitle>
            <div className="flex w-full justify-between gap-4">
              {readingBooks.map((book, index) => (
                <ReadingBook key={index} book={book} />
              ))}
              {readingBooks.map((book, index) => (
                <ReadingBook key={index} book={book} />
              ))}
              {readingBooks.map((book, index) => (
                <ReadingBook key={index} book={book} />
              ))}
            </div>
          </div>
        )}
        {finishedBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PostTitle>Finished reading list</PostTitle>
            <BookTable books={finishedBooks} />
          </div>
        )}
        {toReadBooks.length > 0 && (
          <div className="flex flex-col gap-2">
            <PostTitle>To read list</PostTitle>
            <BookTable books={toReadBooks} />
          </div>
        )}
      </div>
    </PageScreen>
  )
}
