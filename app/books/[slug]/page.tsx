import { allBooks } from '@/.contentlayer/generated'
import Line from '@/app/ui/Line'
import Title from '@/app/ui/Title'
import PageScreen from '@/app/ui/layout/PageScreen'
import { ArrowUpRightIcon, ShareIcon } from '@heroicons/react/24/outline'
import { format, intervalToDuration } from 'date-fns'
import Image from 'next/image'

export const generateStaticParams = async () =>
  allBooks.map((book) => ({ slug: book._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const book = allBooks.find(
    (book) =>
      book._raw.flattenedPath === decodeURIComponent(`books/${params.slug}`),
  )
  if (!book) throw new Error(`Book not found for slug: ${params.slug}`)
  return { title: book.title }
}

export default function Book({ params }: { params: { slug: string } }) {
  const book = allBooks.find(
    (book) =>
      book._raw.flattenedPath === decodeURIComponent(`books/${params.slug}`),
  )
  if (!book) throw new Error(`Book not found for slug: ${params.slug}`)

  const {
    title,
    author,
    total_page,
    start_read_date,
    finish_read_date,
    publish_date,
    body,
    tag,
    cover_url,
  } = book

  return (
    <PageScreen>
      <div className="flex flex-col gap-8 border border-black px-6 py-16">
        <div className="flex gap-10">
          <Image
            src={cover_url}
            width={250}
            height={345}
            alt={title}
            className="border border-black"
          />
          <div className="flex flex-col gap-2">
            <Title>{title}</Title>
            <p className="text-sm">저자: {author}</p>
            <p className="text-sm">쪽수: {total_page}</p>
            <p className="text-sm">
              출판일: {format(new Date(publish_date), 'yyyy-MM-dd')}
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
            <div className="flex">
              <ShareIcon className="h-6 w-6 hover:cursor-pointer" />
              <ArrowUpRightIcon className="h-6 w-6 hover:cursor-pointer" />
            </div>
          </div>
        </div>
        <Line />
        <div
          className="[&>*:last-child]:mb-0 [&>*]:mb-3"
          dangerouslySetInnerHTML={{ __html: book.body.html }}
        />
        <Line />
      </div>
    </PageScreen>
  )
}
