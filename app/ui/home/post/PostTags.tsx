'use client'

import Badge from '@/app/ui/Badge'
import TagsFallBack from '@/app/ui/TagsFallback'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  tags: string[]
}

export default function PostTags({ tags }: Props) {
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div className="flex w-full justify-end gap-2">
      <Suspense fallback={<TagsFallBack tags={tags} />}>
        {tags.map((tag, index) => (
          <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
        ))}
      </Suspense>
    </div>
  )
}
