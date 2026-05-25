'use client'

import { useEffect, useRef } from 'react'
import { Book } from 'contentlayer/generated'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'

interface Props {
  book: Book
  onClose: () => void
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function BookBottomSheet({ book, onClose }: Props) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null
    const container = containerRef.current
    const focusables =
      container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !container) return

      const items = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      previousActive?.focus()
    }
  }, [onClose])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={book.title}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col border border-black bg-white shadow-xl dark:border-white dark:bg-gray-900 sm:max-h-[80vh]">
        <div className="flex shrink-0 items-start gap-4 border-b border-black p-4 dark:border-white">
          <img
            src={book.cover_image}
            alt={book.title}
            className="h-24 w-16 shrink-0 object-cover"
          />
          <div className="flex grow flex-col gap-1">
            <h2 className="text-lg font-bold dark:text-white">{book.title}</h2>
            <span className="text-sm font-light dark:text-gray-300">
              {book.author}
            </span>
            {book.my_rate > 0 && (
              <span className="text-sm dark:text-white">
                {'★'.repeat(book.my_rate)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dictionary.nav.closeMenu}
            className="shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-5 w-5 dark:text-white" />
          </button>
        </div>

        <div className="grow overflow-y-auto p-6">
          {/*
            신뢰 경로: book.body.html은 Contentlayer가 저자(본인) 통제 마크다운을
            처리한 결과. blog/books/*.md 외부 입력은 없음. 콘텐츠 소스가 외부
            기여나 사용자 입력으로 확장될 경우 rehype-sanitize 도입 필요.
          */}
          <article
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: book.body.html }}
          />
        </div>

        <div className="flex shrink-0 justify-end border-t border-black p-3 dark:border-white">
          <Link
            href={book.url}
            onClick={onClose}
            className="text-sm font-light underline dark:text-white"
          >
            {dictionary.library.viewFullPage} →
          </Link>
        </div>
      </div>
    </div>
  )
}
