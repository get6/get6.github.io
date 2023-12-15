import { allPosts } from '@/.contentlayer/generated'
import { Tag } from '@/app/lib/definitions'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'

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
        <div className="flex flex-col gap-8">
          <PageTitle>Tags</PageTitle>
          <TagList tags={tags} />
        </div>
        <PostTable posts={allPosts} />
      </div>
    </PageScreen>
  )
}
