import { Tag } from '@/app/lib/definitions'
import TagsFallBack from '@/app/ui/TagsFallback'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'
import { allPosts } from 'contentlayer/generated'
import { Suspense } from 'react'

function TagListFallback({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      <TagsFallBack tags={tags} />
    </div>
  )
}

function PostTableFallback() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="h-8 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-600"
        />
      ))}
    </div>
  )
}

export default function Tags() {
  // 태그 집계를 더 효율적으로 처리
  const tagCounts = allPosts.reduce((acc: { [key: string]: number }, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})

  const tags: Tag[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4 lg:gap-8">
          <PageTitle>Tags</PageTitle>
          <Suspense
            fallback={<TagListFallback tags={tags.map((tag) => tag.name)} />}
          >
            <TagList tags={tags} />
          </Suspense>
        </div>
        <Suspense fallback={<PostTableFallback />}>
          <PostTable />
        </Suspense>
      </div>
    </PageScreen>
  )
}
