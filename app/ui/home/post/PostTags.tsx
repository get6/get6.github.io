'use client'

import Tag from '@/app/ui/Tag'
import { useRouter } from 'next/navigation'

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
      {tags.map((tag, index) => (
        <Tag key={index} text={tag} onClick={handleTagClick(tag)} />
      ))}
    </div>
  )
}
