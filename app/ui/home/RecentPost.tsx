'use client'

import { Post } from '@/.contentlayer/generated'
import Badge from '@/app/ui/Badge'
import Title from '@/app/ui/Title'
import Tooltip from '@/app/ui/Tooltip'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function RecentPost({ post }: Props) {
  const { cover_image, date, title, body, tags } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="h-[517px] w-[343px] border border-black bg-white hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="relative h-[343px] w-full border-b border-black">
        <Image
          className="object-cover object-top"
          src={cover_image}
          alt="cover_image"
          priority
          fill
          sizes="(min-width: 1024px) 343px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="inline-flex h-[174px] w-full flex-col items-start justify-center gap-4 px-6">
        <div className="flex h-[88px] flex-col items-start justify-start gap-2 self-stretch">
          <span className="group relative flex">
            <Tooltip date={date} />
            <PostDate date={date} body={body.raw} />
          </span>
          <Title>{title}</Title>
          <div className="self-stretch truncate text-base font-normal">
            {body.raw}
          </div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 self-stretch">
          {tags.map((tag, index) => (
            <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}
