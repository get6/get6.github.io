'use client'

import { Tag } from '@/app/lib/definitions'
import { tagFilterHref } from '@/app/lib/tag-path'
import { getClientDictionary } from '@/app/i18n/client-dictionary'
import TagLink from '@/app/ui/TagLink'
import { useMemo, useState } from 'react'

interface Props {
  tags: Tag[]
  locale?: string
}

export default function TagList({ tags, locale = 'ko' }: Props) {
  const [showMore, setShowMore] = useState(false)
  const dictionary = getClientDictionary(locale)

  const { mainTags, moreTags } = useMemo(() => {
    const main = tags.filter((tag) => tag.count > 1)
    const more = tags.filter((tag) => tag.count === 1)
    return { mainTags: main, moreTags: more }
  }, [tags])

  return (
    <div className="flex flex-wrap gap-2 border border-black bg-white px-4 py-6 dark:border-white dark:bg-gray-900">
      {mainTags.map((tag) => (
        <TagLink
          key={tag.name}
          name={tag.name}
          count={tag.count}
          href={tagFilterHref(tag.name, locale)}
          isLarge
        />
      ))}
      {moreTags.length > 0 && (
        <>
          {showMore &&
            moreTags.map((tag) => (
              <TagLink
                key={`more-${tag.name}`}
                name={tag.name}
                count={tag.count}
                href={tagFilterHref(tag.name, locale)}
                isLarge
              />
            ))}
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-blue-700 hover:cursor-pointer hover:bg-blue-100 lg:hidden dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
          >
            {showMore
              ? dictionary.common.collapse
              : `+${moreTags.length}${dictionary.common.showMore}`}
          </button>
          <span className="hidden lg:contents">
            {moreTags.map((tag) => (
              <TagLink
                key={`lg-${tag.name}`}
                name={tag.name}
                count={tag.count}
                href={tagFilterHref(tag.name, locale)}
                isLarge
              />
            ))}
          </span>
        </>
      )}
    </div>
  )
}
