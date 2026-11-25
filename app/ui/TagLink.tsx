'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  name: string
  href: string
  isLarge?: boolean
  count?: number
}

export default function TagLink({ name, href, isLarge = false, count }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Link
      href={href}
      data-tag-link={name}
      onClick={(event) => {
        if (event.currentTarget.dataset.active !== 'true') return
        event.preventDefault()
        router.push(pathname, { scroll: false })
      }}
      className={`whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:cursor-pointer hover:bg-blue-100 data-[active=true]:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 data-[active=true]:dark:bg-blue-900 ${
        isLarge ? 'text-sm' : ''
      }`}
    >
      #{name}
      {count ? (
        <span className="ml-2 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full text-xs font-extralight text-blue-700 dark:text-blue-300">
          ({count})
        </span>
      ) : null}
    </Link>
  )
}
