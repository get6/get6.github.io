import { allPosts } from '@/.contentlayer/generated'
import { Tag } from '@/app/lib/definitions'
import TagsFallBack from '@/app/ui/TagsFallback'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'
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
          className="h-8 w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  )
}

export default function Tags() {
  const allTags = allPosts.flatMap((post) => post.tags)

  const counts: { [key: string]: number } = {}

  allTags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1
  })

  const tags: Tag[] = Object.keys(counts)
    .map((tag) => ({
      name: tag,
      count: counts[tag],
    }))
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
