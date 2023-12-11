import { allBooks } from '@/.contentlayer/generated'
import PostTitle from '@/app/ui/home/PostTitle'
import PageScreen from '@/app/ui/layout/PageScreen'

export const generateStaticParams = async () =>
  allBooks.map((book) => ({ slug: book._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const book = allBooks.find(
    (book) => book._raw.flattenedPath === `books/${params.slug}`,
  )
  if (!book) throw new Error(`Book not found for slug: ${params.slug}`)
  return { title: book.title }
}

export default function Book({ params }: { params: { slug: string } }) {
  const book = allBooks.find(
    (book) => book._raw.flattenedPath === `books/${params.slug}`,
  )
  if (!book) throw new Error(`Book not found for slug: ${params.slug}`)

  const { title, body, tag } = book

  return (
    <PageScreen>
      <div className="flex">
        <div>{/* 이미지 */}</div>
        <div className="flex flex-col">
          <div className="flex">
            <PostTitle>{title}</PostTitle>
          </div>
        </div>
      </div>
      <div>{body.raw}</div>
    </PageScreen>
  )
}
