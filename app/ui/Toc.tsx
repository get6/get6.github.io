'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  headers: ToC[]
}

export default function Toc({ headers }: Props) {
  const headingsList = useRef<HTMLUListElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const [activeId, setActiveId] = useState<string>(
    headers ? headers[0]?.id : '',
  )

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      const t = Math.max(16, 56 - window.scrollY)
      nav.style.top = `${t}px`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Add a new useEffect hook with our IntersectionObserver logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id') || ''

          if (entry.isIntersecting) {
            setActiveId(id)
            scrollRef.current = window.scrollY
          } else {
            const diff = scrollRef.current - window.scrollY
            const isScrollingUp = diff > 0
            const currentIndex = headers.findIndex((header) => header.id === id)

            if (1 <= currentIndex && 0 < headers.length) {
              const prevId =
                headers[currentIndex === 0 ? 0 : currentIndex - 1].id
              if (isScrollingUp && prevId) setActiveId(prevId)
            }
          }
        })
      },
      { rootMargin: '-32px 0px -66% 0px', threshold: 0.01 },
    )

    if (headers && headers.length) {
      headers.forEach((header) => {
        const currentHeading = document.getElementById(header.id)

        if (currentHeading) observer.observe(currentHeading)
      })
    }

    return () => observer.disconnect()
  }, [headers])

  useEffect(() => {
    const ul = headingsList.current
    if (!ul || !activeId) return
    const activeEl = ul.querySelector<HTMLElement>(
      `a[href="#${CSS.escape(activeId)}"]`,
    )
    if (!activeEl) return
    const ulRect = ul.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    if (elRect.top < ulRect.top || elRect.bottom > ulRect.bottom) {
      ul.scrollTo({
        top: ul.scrollTop + (elRect.top - ulRect.top) - ulRect.height / 2,
        behavior: 'smooth',
      })
    }
  }, [activeId])

  return (
    headers && (
      <nav
        ref={navRef}
        className="sticky top-14 hidden h-fit max-h-[calc(100vh-5rem)] min-w-[220px] pl-6 pr-8 pt-10 xl:block xl:max-w-72 2xl:max-w-xs"
      >
        <h2 className="mb-3 text-sm font-semibold leading-6 text-gray-700 dark:text-white">
          On this page
        </h2>
        <hr className="mb-4 h-1 w-10 border-0 bg-blue-600 dark:bg-blue-500" />
        <ul
          className="flex flex-col gap-0.5 overflow-y-auto"
          ref={headingsList}
        >
          {headers.map((header) => {
            const isActive = activeId === header.id
            let padding = 'pl-3'
            if (header.level === 3) padding = 'pl-7'
            if (header.level === 4) padding = 'pl-11'
            if (header.level === 5) padding = 'pl-15'
            if (header.level === 6) padding = 'pl-19'
            return (
              <li key={header.id} className="snap-center">
                <a
                  href={`#${header.id}`}
                  className={`block truncate rounded-md py-1 text-sm transition-colors ${padding} ${
                    isActive
                      ? 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500'
                  }`}
                >
                  {header.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  )
}
