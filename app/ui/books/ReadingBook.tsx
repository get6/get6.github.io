import { Book } from '@/.contentlayer/generated'
import { format, intervalToDuration } from 'date-fns'
import Image from 'next/image'

interface Props {
  book: Book
}

export default function ReadingBook({ book }: Props) {
  const { title, author, start_read_date, status, cover_url } = book

  const daysOfReading = intervalToDuration({
    start: new Date(start_read_date),
    end: new Date(),
  }).days!.toString()

  return (
    <a
      className="flex w-[250px] flex-col border border-black bg-white hover:cursor-pointer"
      href={book.url}
    >
      <div className="relative h-[370px] w-full border-b border-black">
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
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="text-sm">{author}</span>
        <div className="flex gap-1 text-sm">
          <span>📖 {format(new Date(start_read_date), 'yyyy-MM-dd')}</span>
          <span className="font-semibold text-red-500">
            {`+${daysOfReading}일째`}
          </span>
        </div>
      </div>
    </a>
  )
}
