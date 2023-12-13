'use client'

import { useSearchParams } from 'next/navigation'

interface Props {
  text: string
  onClick?: () => void
}

export default function Tag({ text, onClick }: Props) {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')?.toString()
  return (
    <div
      className={`leading-sm inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase text-gray-700 hover:cursor-pointer
        ${text === tag ? 'bg-gray-100' : 'bg-white'}
      `}
      onClick={onClick}
    >
      {text}
    </div>
  )
}
