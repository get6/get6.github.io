'use client'

import { useSearchParams } from 'next/navigation'

interface Props {
  text: string
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export default function Tag({ text, onClick }: Props) {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')?.toString()

  return (
    <span
      className={`me-2 rounded-full  px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:cursor-pointer hover:bg-gray-200  dark:text-gray-300 dark:hover:bg-gray-600
      ${
        text === tag
          ? 'bg-gray-200 dark:bg-gray-600'
          : 'bg-gray-100 dark:bg-gray-700'
      }
      `}
      onClick={onClick}
    >
      {text}
    </span>
  )
}
