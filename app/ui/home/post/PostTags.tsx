'use client'

import { localePath } from '@/app/i18n/config'
import { getLocaleFromPathname } from '@/app/i18n/client-dictionary'
import Badge from '@/app/ui/Badge'
import TagsFallBack from '@/app/ui/TagsFallback'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  tags: string[]
}

export default function PostTags({ tags }: Props) {
  const { push } = useRouter()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(localePath(`/tags/?tag=${tag}`, locale))
  }

  return (
    <div className="flex w-full flex-wrap justify-end gap-2">
      <Suspense fallback={<TagsFallBack tags={tags} />}>
        {tags.map((tag, index) => (
          <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
        ))}
      </Suspense>
    </div>
  )
}
