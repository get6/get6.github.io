import { allBooks } from '@/.contentlayer/generated'
import Line from '@/app/ui/Line'
import Title from '@/app/ui/Title'
import PageScreen from '@/app/ui/layout/PageScreen'
import { format } from 'date-fns'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

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

  const MDXContent = useMDXComponent(book.body.code)

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
            <p className="text-base">{author}</p>
            <p className="text-sm">{total_page} Pages</p>
            <p className="text-sm">
              출판일: {format(new Date(publish_date), 'yyyy-MM-dd')}
            </p>
            <p className="text-sm">
              독서 기간:{' '}
              {`${format(new Date(start_read_date), 'yyyy-MM-dd')} ~ ${format(
                new Date(finish_read_date),
                'yyyy-MM-dd',
              )}`}
            </p>
          </div>
        </div>
        <Line />
        <div>{body.html}</div>
        <Line />
      </div>
    </PageScreen>
  )
}
