'use client'

import { Tag } from '@/app/lib/definitions'
import Badge from '@/app/ui/Badge'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  tags: Tag[]
}

export default function TagList({ tags }: Props) {
  const param = 'tag'
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

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

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          name={tag.name}
          count={tag.count}
          onClick={() => handleClick(tag.name)}
          isLarge
        />
      ))}
    </div>
  )
}
