import { allBooks } from '@/.contentlayer/generated'
import { BookStatus } from '@/app/lib/definitions'
import Line from '@/app/ui/Line'
import Title from '@/app/ui/Title'
import ToastPostal from '@/app/ui/ToastPostal'
import PageScreen from '@/app/ui/layout/PageScreen'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { format, intervalToDuration } from 'date-fns'
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

  return (
    <PageScreen>
      <div className="flex flex-col gap-8 border border-black px-6 py-16">
        <div className="flex gap-10">
          <div className="relative h-96 w-64 border border-black">
            <Image
              className="aspect-auto object-cover object-top"
              src={cover_url}
              alt={title}
              priority
              fill
              sizes="(min-width: 1024px) 256px, (max-width: 1024px) 100vw"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Title>{title}</Title>
                <ToastPostal />
              </div>

              <p className="text-sm">저자: {author}</p>
              {status === BookStatus.Finished && (
                <p className="flex items-center gap-1 text-sm">
                  추천:
                  <span className="flex">{stars.map((star) => star)}</span>
                </p>
              )}
              <p className="text-sm">쪽수: {total_page}</p>
              <p className="text-sm">
                발행일: {format(new Date(publish_date), 'yyyy-MM-dd')}
              </p>
              <p className="text-sm">
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
                  <span className="font-semibold text-red-500">
                    {` +${intervalToDuration({
                      start: new Date(start_read_date),
                      end: new Date(finish_read_date),
                    }).days!.toString()}일`}
                  </span>
                )}
              </p>
              <p className="text-sm">
                카테고리:{' '}
                {tag
                  .split(' ')
                  .slice(1)
                  .map((tag) => tag)
                  .join(', ')}
              </p>
            </div>
            {book_url && (
              <Link href={book_url} className="text-xs text-blue-500">
                yes24로 책 보러가기
              </Link>
            )}
          </div>
        </div>
        <Line />
        <article
          className="prose dark:prose-invert prose-img:mx-auto"
          dangerouslySetInnerHTML={{ __html: body.html }}
        />
        <Line />
      </div>
    </PageScreen>
  )
}
