import { tagFilterHref } from '@/app/lib/tag-path'
import TagLink from '@/app/ui/TagLink'

interface Props {
  tags: string[]
  locale?: string
}

export default function PostTags({ tags, locale = 'ko' }: Props) {
  return (
    <div className="flex w-full flex-wrap justify-end gap-2">
      {tags.map((tag) => (
        <TagLink key={tag} name={tag} href={tagFilterHref(tag, locale)} />
      ))}
    </div>
  )
}
