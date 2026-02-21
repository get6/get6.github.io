import { AdsInBooks } from '@/app/ads/AdsInBooks'
import { Ad } from '@/app/lib/definitions'
import FormattedDate from '@/app/ui/FormattedDate'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import { LinkIcon } from '@heroicons/react/24/solid'
import { Book } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  books: Book[]
  isFinished?: boolean
}

type BookOrAd = Book | Ad

export default function BookTable({ books, isFinished = false }: Props) {
  // const heads = ['Title', 'Author', 'Published', 'Price', 'Category', 'URL']
  const heads = ['Title', 'Author', 'Published', 'Category', 'URL']

  const insertAdsIntoBooks = (books: Book[], interval: number): BookOrAd[] => {
    const ad: Ad = { type: 'Ad' }
    let result: BookOrAd[] = []
    for (let i = 0; i < books.length; i++) {
      if (i > 0 && i % interval === 0) {
        result.push(ad)
      }
      result.push(books[i])
    }
    return result
  }

  // const booksWithAds = insertAdsIntoBooks(books, ad_per_content)
  // const booksWithAds: BookOrAd[] = [...books, { type: 'Ad' }]
  const booksWithAds: BookOrAd[] = [...books]

  return (
    <Table>
      <TableHead>
        <tr>
          {heads.map((head) => (
            <th key={head} scope="col" className="px-6 py-3">
              {head}
            </th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {booksWithAds.map((book, index) => {
          if ('type' in book && book.type === 'Ad') {
            return (
              <tr
                key={`ad-${index}`}
                className={`max-h-14 border-b bg-white dark:border-gray-700 dark:bg-gray-800`}
              >
                <td scope="row" colSpan={heads.length}>
                  <AdsInBooks />
                </td>
              </tr>
            )
          } else {
            return (
              <tr
                key={book.slug}
                className={`max-h-14 border-b bg-white dark:border-gray-700 dark:bg-gray-800 ${
                  isFinished && 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <th scope="row" className="flex items-center gap-2 px-6 py-4">
                  <div className="relative h-6 w-4">
                    <Image
                      className="object-cover object-top"
                      src={isFinished ? book.cover_image : book.cover_url}
                      alt={book.title}
                      fill
                      sizes="(min-width: 1024px) 24px, (max-width: 1024px) 100vw"
                    />
                  </div>
                  {isFinished ? (
                    <Link
                      href={book.url}
                      className="max-w-xs truncate font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {book.title}
                    </Link>
                  ) : (
                    <span className="max-w-xs truncate font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </span>
                  )}
                </th>
                <td className="truncate px-6 py-4">
                  {book.author.split(', ').length > 1
                    ? `${book.author.split(', ')[0]}...`
                    : book.author}
                </td>
                <td className="truncate px-6 py-4">
                  <FormattedDate date={book.publish_date} />
                </td>
                {/* TODO: subtitle 추가되면 여기 영역도 조금 여유가 생길 듯 */}
                <td className="max-w-[120px] truncate px-6 py-4">
                  {book.tag.split(' ')[2]}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={book.book_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                    aria-label={`${book.title} 외부 링크 열기`}
                  >
                    <LinkIcon className="h-5 w-5 hover:cursor-pointer hover:text-blue-500" />
                  </a>
                </td>
              </tr>
            )
          }
        })}
      </TableBody>
    </Table>
  )
}
