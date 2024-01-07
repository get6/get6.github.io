import { Book } from '@/.contentlayer/generated'
import DaysOfReading from '@/app/ui/books/DaysOfReading'
import { format } from 'date-fns'
import Image from 'next/image'

interface Props {
  book: Book
}

export default function ReadingBook({ book }: Props) {
  const { title, author, start_read_date, cover_url } = book

  const startReadDate = new Date(start_read_date)

  return (
    <a
      className="flex w-[250px] flex-col border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900"
      href={book.url}
    >
      <div className="relative h-[370px] w-full border-b border-black dark:border-white">
        <Image
          className="object-cover object-top"
          src={cover_url}
          alt={title}
          priority
          fill
          sizes="(min-width: 1024px) 250px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex min-h-max flex-col justify-center gap-2 px-6 py-2">
        <h1 className="text-xl font-bold dark:text-white">{title}</h1>
        <span className="text-sm dark:text-white">{author}</span>
        <div className="flex gap-1 text-sm dark:text-white">
          <span>📖 {format(startReadDate, 'yyyy-MM-dd')}</span>
          <DaysOfReading startReadDate={startReadDate} />
        </div>
      </div>
    </a>
  )
}
