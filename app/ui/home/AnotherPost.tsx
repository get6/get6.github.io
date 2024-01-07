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
      className="flex h-[234px] max-h-full w-[282px] flex-col border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900"
      onClick={() => push(post.url)}
    >
      <div className="relative flex min-h-[162px] w-full border-b border-black dark:border-white">
        <Image
          className="object-cover object-top"
          src={cover_image}
          alt="cover_image"
          priority
          fill
          sizes="(min-width: 1024px) 282px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-center px-6">
        <div className="flex flex-col gap-2">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
        </div>
      </div>
    </div>
  )
}
