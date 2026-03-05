'use client'
import { useState } from 'react'

interface Props {
  headers: ToC[]
}

export default function MobileToc({ headers }: Props) {
  const [activeId, setActiveId] = useState<string>(
    headers ? headers[0]?.id : '',
  )

  return (
    headers && (
      <nav className="h-fit max-w-sm pt-6 md:max-w-none xl:hidden">
        <h2 className="mb-3 text-sm font-semibold leading-6 text-gray-700 dark:text-white">
          On this page
        </h2>
        <hr className="mb-4 h-1 w-10 border-0 bg-blue-600 dark:bg-blue-500" />
        <ul className="flex flex-col gap-0.5">
          {headers.map((header, index) => {
            const isActive = activeId === header.id
            let padding = 'pl-3'
            if (header.level === 3) padding = 'pl-7'
            if (header.level === 4) padding = 'pl-11'
            if (header.level === 5) padding = 'pl-15'
            if (header.level === 6) padding = 'pl-19'
            return (
              <li key={index}>
                <a
                  href={`#${header.id}`}
                  className={`block truncate rounded-md py-1 text-sm transition-colors ${padding} ${
                    isActive
                      ? 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500'
                  }`}
                  onClick={() => setActiveId(header.id)}
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
