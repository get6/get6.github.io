'use client'
import { useState } from "react"

interface Props {
    headers: ToC[]
  }
  
  export default function MobileToc({ headers }: Props) {
    const [activeId, setActiveId] = useState<string>(
        headers ? headers[0]?.id : '',
      )
      
    return  headers && (
        // <nav className="xl:hidden h-fit pr-6 pt-10 xl:max-w-64 2xl:max-w-xs">
        <nav className="h-fit pr-6 pt-10 xl:max-w-64 2xl:max-w-xs">
            <h2 className="mb-4 text-lg font-medium leading-6 text-gray-600 dark:text-gray-400">
          Table of Contents
        </h2>
        <hr className=" h-1 w-10 border-0 bg-blue-600 dark:bg-blue-500" />
        <ul className="mt-4 snap-y snap-mandatory">
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
  }