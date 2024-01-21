import { Book } from '@/.contentlayer/generated'
import Line from '@/app/ui/Line'
import DaysOfReading from '@/app/ui/books/DaysOfReading'
import ReadingBookCard from '@/app/ui/books/ReadingBookCard'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  book: Book
}

export default function ReadingBook({ book }: Props) {
  const { title, subtitle, author, start_read_date, cover_url } = book

  const startReadDate = new Date(start_read_date)

  const lgBookCard = (
    <Link
      className="flex h-[448px] w-[888px] flex-col gap-2 rounded-lg bg-white p-2 dark:bg-gray-900"
      href={book.url}
    >
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 h-[140px] w-full rounded-lg bg-blue-100 dark:bg-blue-950" />
        <div className="absolute top-2 flex w-full items-center justify-center">
          <div className="flex w-[720px]">
            <div className="relative flex h-[416px] min-w-[280px] border border-black dark:border-white">
              <Image
                className="object-cover object-top"
                src={cover_url}
                alt={title}
                priority
                fill
                sizes="(min-width: 1024px) 280px, (max-width: 1024px) 100vw"
              />
            </div>
            <div className="flex h-[284px] w-full flex-col px-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold dark:text-white">
                    {title}
                  </h1>
                  {subtitle && (
                    <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                      {subtitle}
                    </h2>
                  )}
                </div>
                <div className="text-xs text-zinc-900 dark:text-zinc-300">
                  {author}
                </div>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Line />
                <div className="flex gap-1">
                  <span>📖 {format(startReadDate, 'yyyy-MM-dd')}</span>
                  <DaysOfReading startReadDate={startReadDate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

  const defaultBookCard = <ReadingBookCard book={book} />

  return (
    <>
      <div className="hidden lg:flex">{lgBookCard}</div>
      <div className="flex justify-center lg:hidden">{defaultBookCard}</div>
    </>
  )
}
