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
      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:cursor-pointer hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-900 ${
        isLarge ? 'text-sm' : ''
      } ${
        name === param
          ? 'bg-blue-100 dark:bg-blue-900'
          : 'bg-blue-50 dark:bg-blue-950'
      }`}
      onClick={onClick}
    >
      #{name}
      {count && (
        <span className="ml-2 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full text-xs font-extralight text-blue-700 dark:text-blue-300">
          ({count})
        </span>
      )}
    </span>
  )
}
