import { allBooks } from '@/.contentlayer/generated'
import { BookStatus } from '@/app/lib/definitions'
import Article from '@/app/ui/Article'
import Line from '@/app/ui/Line'
import Title from '@/app/ui/Title'
import ToastPostal from '@/app/ui/ToastPostal'
import DetailScreen from '@/app/ui/layout/DetailScreen'
import { ArrowUpRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { differenceInCalendarDays, format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export const generateStaticParams = async () =>
  allBooks.map((book) => ({ slug: book.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params.slug)
  const book = allBooks.find((book) => book.slug === slug)

  if (!book) throw new Error(`Book not found for slug: ${slug}`)
  return { title: book.title }
}

export default function Book({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const book = allBooks.find((book) => book.slug === slug)

  if (!book) throw new Error(`Book not found for slug: ${slug}`)

  const {
    title,
    author,
    total_page,
    start_read_date,
    finish_read_date,
    publish_date,
    body,
    tag,
    my_rate,
    cover_url,
    status,
    book_url,
  } = book

  const stars = [
    Array.from({ length: my_rate }, (_, i) => (
      <SolidStarIcon key={i} className="h-4 w-4" />
    )),
    Array.from({ length: 5 - my_rate }, (_, i) => (
      <StarIcon key={i} className="h-4 w-4" />
    )),
  ]

  const daysOfReading = differenceInCalendarDays(
    new Date(finish_read_date),
    new Date(start_read_date),
  )

  return (
    <DetailScreen>
      <div className="flex gap-4 lg:gap-10">
        <div className="relative h-48 w-36 border border-black dark:border-white lg:h-96 lg:w-64">
          <Image
            className="aspect-auto object-cover object-left-top"
            src={cover_url}
            alt={title}
            priority
            fill
            sizes="(min-width: 1024px) 256px, (max-width: 1024px) 100vw"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Title>{title}</Title>
              <ToastPostal />
            </div>

            <p className="text-xs lg:text-sm">저자: {author}</p>
            {status === BookStatus.Finished && (
              <p className="flex items-center gap-1 text-xs lg:text-sm">
                추천:
                <span className="flex">{stars.map((star) => star)}</span>
              </p>
            )}
            <p className="text-xs lg:text-sm">쪽수: {total_page}</p>
            <p className="text-xs lg:text-sm">
              발행일: {format(new Date(publish_date), 'yyyy-MM-dd')}
            </p>
            <p className="text-xs lg:text-sm">
              {`독서 기간: ${format(
                new Date(start_read_date),
                'yyyy-MM-dd',
              )} ~ `}
              {start_read_date < finish_read_date ? (
                `${format(new Date(finish_read_date), 'yyyy-MM-dd')}`
              ) : (
                <span className="font-semibold">ing</span>
              )}
              {start_read_date < finish_read_date && (
                <span className="text-red-500">{` (${daysOfReading}일)`}</span>
              )}
            </p>
            <p className="text-xs lg:text-sm">
              카테고리:{' '}
              {tag
                .split(' ')
                .slice(1)
                .map((tag) => tag)
                .join(', ')}
            </p>
          </div>
          <Link
            href={book_url}
            className="flex shrink-0 items-center gap-1 pt-2 text-xs text-blue-500"
          >
            yes24로 책 보러가기
            <ArrowUpRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
      <Line className="prose" />
      <Article html={body.html} />
      <Line className="prose" />
    </DetailScreen>
  )
}
