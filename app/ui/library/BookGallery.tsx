'use client'

import { useState, MouseEvent } from 'react'
import { Book } from 'contentlayer/generated'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import BookBottomSheet from './BookBottomSheet'

interface Props {
  books: Book[]
}

const hasContent = (book: Book): boolean =>
  Boolean(book.body?.html && book.body.html.trim().length > 0)

const renderRating = (rate: number): string => {
  if (rate <= 0) return ''
  const filled = '★'.repeat(rate)
  const empty = '☆'.repeat(Math.max(0, 5 - rate))
  return filled + empty
}

export default function BookGallery({ books }: Props) {
  const [selected, setSelected] = useState<Book | null>(null)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)

  const handleClick = (book: Book) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (hasContent(book)) {
      e.preventDefault()
      setSelected(book)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => {
          const withContent = hasContent(book)
          const rating = renderRating(book.my_rate)
          return (
            <a
              key={book.slug}
              href={book.book_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick(book)}
              className="flex flex-col overflow-hidden border border-black bg-white transition-colors hover:bg-gray-50 dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
              aria-label={book.title}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {withContent ? (
                  <span className="absolute right-1 top-1 border border-black bg-white px-1.5 py-0.5 text-[10px] font-medium text-black">
                    {dictionary.library.noteBadge}
                  </span>
                ) : (
                  <span
                    className="absolute right-1 top-1 flex items-center border border-white bg-black/60 p-1 text-white"
                    aria-label={dictionary.library.externalLink}
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="flex grow flex-col gap-1 border-t border-black p-2 dark:border-white">
                <h4 className="line-clamp-2 text-xs font-bold dark:text-white">
                  {book.title}
                </h4>
                <span className="line-clamp-1 text-[10px] font-light text-gray-700 dark:text-gray-300">
                  {book.author}
                </span>
                {rating && (
                  <span className="text-[10px] dark:text-white">{rating}</span>
                )}
              </div>
            </a>
          )
        })}
      </div>
      {selected && (
        <BookBottomSheet book={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
