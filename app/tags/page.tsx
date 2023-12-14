import { allPosts } from '@/.contentlayer/generated'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'

export default function Tags() {
  const allTags = allPosts.map((post) => post.tags).flat()
  const tags = Array.from(new Set(allTags))

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
