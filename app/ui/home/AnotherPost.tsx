'use client'

import PostDate from '@/app/ui/home/post/PostDate'
import { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AnotherPost({ post }: { post: Post }) {
  const { push } = useRouter()
  const { title, date, body, cover_image } = post

  return (
    <div
      className="flex h-[234px] max-h-full w-[270px] min-w-[270px] flex-col border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900"
      onClick={() => push(post.url)}
    >
      <div className="relative flex min-h-[162px] w-full border-b border-black dark:border-white">
        <Image
          className="object-cover"
          src={cover_image}
          alt="cover_image"
          fill
          sizes="(min-width: 1024px) 270px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-center px-6">
        <div className="flex flex-col gap-2">
          <PostDate date={date} body={body.raw} />
          <h1 className="truncate font-bold dark:text-white lg:text-xl">
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}
