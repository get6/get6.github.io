'use client'

import { useSearchParams } from 'next/navigation'

interface Props {
  name: string
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  isLarge?: boolean
  count?: number
}

export default function Badge({
  name,
  onClick,
  isLarge = false,
  count,
}: Props) {
  const searchParams = useSearchParams()
  const param = searchParams.get('tag')?.toString()

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 font-medium text-gray-800 hover:cursor-pointer hover:bg-gray-200  dark:text-gray-300 dark:hover:bg-gray-600
     
        ${
          name === param
            ? 'bg-gray-200 dark:bg-gray-600'
            : 'bg-gray-100 dark:bg-gray-700'
        }
      ${isLarge ? 'text-sm' : 'text-xs'}
      `}
      onClick={onClick}
    >
      #{name}
      {count && (
        <span className="ml-2 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-gray-100 text-sm font-extralight text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          ({count})
        </span>
      )}
    </span>
  )
}
