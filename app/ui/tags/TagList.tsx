'use client'

import { Tag } from '@/app/lib/definitions'
import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import Badge from '@/app/ui/Badge'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

interface Props {
  tags: Tag[]
}

export default function TagList({ tags }: Props) {
  const param = 'tag'
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [showMore, setShowMore] = useState(false)
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)

  const hasTag = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    return params.has(param) && params.get(param) === tag
  }

  const handleClick = (tag: string) => {
    const params = new URLSearchParams(searchParams)

    if (hasTag(tag)) {
      params.delete(param)
    } else {
      params.set(param, tag)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const { mainTags, moreTags } = useMemo(() => {
    const main = tags.filter((tag) => tag.count > 1)
    const more = tags.filter((tag) => tag.count === 1)
    return { mainTags: main, moreTags: more }
  }, [tags])

  return (
    <div className="flex flex-wrap gap-2 border border-black bg-white px-4 py-6 dark:border-white dark:bg-gray-900">
      {mainTags.map((tag, index) => (
        <Badge
          key={index}
          name={tag.name}
          count={tag.count}
          onClick={() => handleClick(tag.name)}
          isLarge
        />
      ))}
      {moreTags.length > 0 && (
        <>
          {showMore &&
            moreTags.map((tag, index) => (
              <Badge
                key={`more-${index}`}
                name={tag.name}
                count={tag.count}
                onClick={() => handleClick(tag.name)}
                isLarge
              />
            ))}
          <span
            role="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:cursor-pointer hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 lg:hidden"
          >
            {showMore
              ? dictionary.common.collapse
              : `+${moreTags.length}${dictionary.common.showMore}`}
          </span>
          <span className="hidden lg:contents">
            {moreTags.map((tag, index) => (
              <Badge
                key={`lg-${index}`}
                name={tag.name}
                count={tag.count}
                onClick={() => handleClick(tag.name)}
                isLarge
              />
            ))}
          </span>
        </>
      )}
    </div>
  )
}
