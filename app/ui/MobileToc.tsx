'use client'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Props {
  headers: ToC[]
}

export default function MobileToc({ headers }: Props) {
  const [activeId, setActiveId] = useState<string>(
    headers ? headers[0]?.id : '',
  )
  const [isOpen, setIsOpen] = useState(false)

  return (
    headers && (
      <nav className="h-fit w-full max-w-prose pt-6 xl:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-sm font-semibold leading-6 text-gray-700 dark:text-white">
            On this page
          </h2>
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <hr className="mt-3 h-1 w-10 border-0 bg-blue-600 dark:bg-blue-500" />
        {isOpen && (
          <ul className="mt-4 flex flex-col gap-0.5">
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
        )}
      </nav>
    )
  )
}
