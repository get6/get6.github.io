'use client'

import Badge from '@/app/ui/Badge'
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
        <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
      ))}
    </div>
  )
}
