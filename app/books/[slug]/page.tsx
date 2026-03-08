import { BookStatus } from '@/app/lib/definitions'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { sliceDesc } from '@/app/lib/utils'
import Article from '@/app/ui/Article'
import FormattedDate from '@/app/ui/FormattedDate'
import GitHubGiscus from '@/app/ui/GitHubGiscus'
import Line from '@/app/ui/Line'
import MobileToc from '@/app/ui/MobileToc'
import Title from '@/app/ui/Title'
import { BookReviewStructuredData } from '@/app/ui/StructuredData'
import ToastPostal from '@/app/ui/ToastPostal'
import Toc from '@/app/ui/Toc'
import DaysOfReading from '@/app/ui/books/DaysOfReading'
import AsideHelper from '@/app/ui/layout/AsideHelper'
import DetailScreen from '@/app/ui/layout/DetailScreen'
import { ArrowUpRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { allBooks } from 'contentlayer/generated'
import { differenceInCalendarDays } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const normalizeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug).normalize('NFC')
  } catch {
    return slug.normalize('NFC')
  }
}

export const generateStaticParams = async () =>
  allBooks.map((book) => ({ slug: normalizeSlug(book.slug) }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug: rawSlug } = await params
  const slug = normalizeSlug(rawSlug)
  const book = allBooks.find((book) => normalizeSlug(book.slug) === slug)

  if (!book) throw new Error(`Book not found for slug: ${slug}`)

  return createMetadata({
    title: book.title,
    description: sliceDesc(book.summary, 160),
    image: book.cover_url,
    url: `/books/${book.slug}`,
  })
}

export default async function Book({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = normalizeSlug(rawSlug)
  const book = allBooks.find((book) => normalizeSlug(book.slug) === slug)

  if (!book) throw new Error(`Book not found for slug: ${slug}`)

  const {
    author,
    total_page,
    start_read_date,
    finish_read_date,
    publish_date,
    body,
    tag,
    my_rate,
    cover_image,
    status,
    book_url,
    toc,
  } = book

  let title = book.title
  // :이 아니고 유니코드임 이거 옵시디언 플러그인에서 수정되어야 함
  const subTitle = 0 < title.indexOf('：') ? title.split('：')[1].trim() : null
  if (subTitle) title = title.split('：')[0].trim()

  const stars = [
    Array.from({ length: my_rate }, (_, i) => (
      <SolidStarIcon key={i} className="h-4 w-4" />
    )),
    Array.from({ length: 5 - my_rate }, (_, i) => (
      <StarIcon key={i} className="h-4 w-4" />
    )),
  ]

  const daysOfReading = differenceInCalendarDays(
    finish_read_date,
    start_read_date,
  )

  return (
    <>
      {status === BookStatus.Finished && (
        <BookReviewStructuredData
          title={book.title}
          author={author}
          description={sliceDesc(book.summary, 160)}
          image={cover_image}
          url={`/books/${book.slug}`}
          datePublished={finish_read_date}
          rating={my_rate}
          bookUrl={book_url}
        />
      )}
      <div
        className={`flex justify-center ${toc ? 'xl:justify-between' : 'xl:justify-center'}`}
      >
        {toc && <AsideHelper headers={toc} />}
        <DetailScreen>
          <div className="flex w-full max-w-prose justify-center gap-4 lg:gap-8">
            <div className="relative aspect-[2/3] w-40 flex-none border border-black dark:border-white lg:h-96 lg:w-64">
              <Image
                className="object-cover"
                src={cover_image}
                alt={title}
                priority
                fill
                sizes="(min-width: 1024px) 256px, (max-width: 1024px) 100vw"
              />
            </div>
            <div className="flex flex-grow flex-col justify-between lg:max-w-md">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <Title>{title}</Title>
                    <ToastPostal />
                  </div>
                  {subTitle && (
                    <div className="line-clamp-1 text-ellipsis text-gray-500 dark:text-gray-400">
                      {subTitle}
                    </div>
                  )}
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
                  발행일: <FormattedDate date={publish_date} />
                </p>
                <p className="text-xs lg:text-sm">
                  독서 기간: <FormattedDate date={start_read_date} /> ~{' '}
                  {start_read_date < finish_read_date ? (
                    <FormattedDate date={finish_read_date} />
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
                className="flex shrink-0 items-center gap-1 pt-2 text-xs text-blue-500 dark:text-blue-400"
              >
                yes24로 책 보러가기
                <ArrowUpRightIcon className="h-3 w-3" />
              </Link>
            </div>
          </div>
          <Line className="prose" />
          {status === BookStatus.Reading && (
            <>
              <div className="flex gap-1 text-center text-xs lg:text-sm">
                <p>👀 아직 읽고 있어요</p>
                <DaysOfReading startReadDate={start_read_date} />
              </div>
              <Line className="prose" />
            </>
          )}
          {status === BookStatus.ToRead && (
            <>
              <div className="flex flex-col text-center text-xs lg:text-sm">
                <p>📚 아직 읽고 있지 않아요</p>
                <p>읽고 싶어서 읽고 싶은 목록에 추가한 책이에요.</p>
                <p>
                  기본적으로 해당 페이지로 들어오는 것이 막혀있지만 들어와주셔서
                  감사해요 😃
                </p>
              </div>
            </>
          )}
          {toc && <MobileToc headers={toc} />}
          <Article html={body.html} />
          <Line className="prose" />
          {/* <GithubComment /> */}
          <GitHubGiscus />
        </DetailScreen>
        {toc && <Toc headers={toc} />}
      </div>
    </>
  )
}
