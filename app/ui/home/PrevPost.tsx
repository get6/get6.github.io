'use client'

import { Post } from '@/.contentlayer/generated'
import Badge from '@/app/ui/Badge'

import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function PrevPost({ post }: Props) {
  const { cover_image, date, title, body, tags } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="flex h-[205px] w-[520px] border border-black bg-white hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="relative h-full w-[164px] border-r border-black">
        <Image
          src={cover_image}
          alt="cover_image"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 self-stretch px-6 py-2">
        <div className="flex w-full flex-col gap-2">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
          <div className="font-normal">{body.raw}</div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 py-2">
          {tags.map((tag, index) => (
            <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}
