import FormattedDate from '@/app/ui/FormattedDate'
import DaysOfReading from '@/app/ui/books/DaysOfReading'
import { Book } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  book: Book
}

export default function ReadingBookCard({ book }: Props) {
  const { title, author, start_read_date, cover_image } = book

  return (
    <Link
      className="flex w-[250px] flex-col border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900"
      href={book.url}
    >
      <div className="relative h-[370px] w-full border-b border-black dark:border-white">
        <Image
          className="object-cover object-top"
          src={cover_image}
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
          <span>
            📖 <FormattedDate date={start_read_date} />
          </span>
          <DaysOfReading startReadDate={start_read_date} />
        </div>
      </div>
    </Link>
  )
}
