'use client'

import { getCoverImage } from '@/app/lib/utils'
import Badge from '@/app/ui/Badge'
import TagsFallBack from '@/app/ui/TagsFallback'
import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import SeriesStack from '@/app/ui/series/SeriesStack'
import { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  series: Post[]
}

export default function SeriesCard({ series }: Props) {
  const { push } = useRouter()
  const { date, title, body, tags, url } = series[0]

  if (!series[0].series_title)
    throw new Error(
      `Series not found for series_title: ${series[0].series_title}`,
    )
  const cover_image = getCoverImage(series[0])

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="flex w-full bg-white hover:cursor-pointer dark:bg-gray-900"
      onClick={() => push(url)}
    >
      <div className="flex w-full border border-black dark:border-white lg:h-[240px] ">
        <div className="relative h-full w-[192px] border-r border-black dark:border-white">
          <Image
            className="object-cover object-top"
            src={cover_image}
            alt="cover_image"
            priority
            fill
            sizes="(min-width: 1024px) 192px, (max-width: 1024px) 100vw"
          />
        </div>
        <div className="flex flex-auto flex-col justify-center gap-4 px-4 py-4 lg:px-6 lg:py-0">
          <div className="flex flex-col gap-2">
            <PostDate date={date} body={body.raw} />
            <h2 className="text-lg font-semibold dark:text-white lg:text-xl">
              {title}
            </h2>
            <Title>{series[0].series_title}</Title>
            <div className="self-stretch truncate text-sm font-normal dark:text-white lg:text-base">
              {body.raw}
            </div>
            <div className="inline-flex items-start justify-start gap-2 py-2">
              <Suspense fallback={<TagsFallBack tags={tags} />}>
                {tags.map((tag, index) => (
                  <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {series.slice(1).map((_, index) => (
        <SeriesStack key={index} />
      ))}
    </div>
  )
}
