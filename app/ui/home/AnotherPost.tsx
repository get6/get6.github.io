'use client'

import { Post } from '@/.contentlayer/generated'
import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function AnotherPost({ post }: Props) {
  const { cover_image, title, date, body } = post
  const { push } = useRouter()

  return (
    <div
      className="h-[234px] w-[282px] border border-black hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="relative h-[162px] w-full border-b border-black">
        <Image
          className="object-cover object-top"
          src={cover_image}
          alt="cover_image"
          priority
          fill
          sizes="(min-width: 1024px) 282px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="inline-flex w-full flex-col items-start justify-start gap-4 px-6 py-2">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
        </div>
      </div>
    </div>
  )
}
