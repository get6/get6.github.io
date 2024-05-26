'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  headers: { title: string; id: string; level: number }[]
}

export default function Toc({ headers }: Props) {
  const headingsList = useRef<HTMLUListElement>(null)
  const scrollRef = useRef(0)
  const [activeId, setActiveId] = useState<string>(
    headers ? headers[0]?.id : '',
  )

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
      { rootMargin: '-32px 0px -20% 0px', threshold: 0.01 },
    )

    if (headers && headers.length) {
      headers.forEach((header) => {
        const currentHeading = document.getElementById(header.id)

        if (currentHeading) observer.observe(currentHeading)
      })
    }
  })

  return (
    headers && (
      <nav className="sticky top-14 hidden h-fit max-w-xs pr-6 pt-10 xl:block">
        <h2 className="mb-4 text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
          On this page
        </h2>
        <hr className=" h-1 w-10 border-0 bg-blue-600 dark:bg-blue-500" />
        <ul className="mt-4 snap-y snap-mandatory" ref={headingsList}>
          {headers.map((header, index) => {
            let margin = '' // level 2는 마진을 적용하지 않음
            if (header.level === 3) margin = 'ml-4'
            if (header.level === 4) margin = 'ml-8'
            if (header.level === 5) margin = 'ml-12'
            if (header.level === 6) margin = 'ml-16'
            return (
              <li key={index} className="mb-1 snap-center truncate">
                <a
                  href={`#${header.id}`}
                  className={`mb-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500
                ${activeId === header.id ? 'text-blue-600 dark:text-blue-500' : 'text-gray-600 dark:text-gray-400'}
              ${margin}
              `}
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
