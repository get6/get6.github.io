import { allPosts } from '@/.contentlayer/generated'
import Tag from '@/app/ui/Tag'
import PostTitle from '@/app/ui/home/PostTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'

export default function Tags() {
  const tags = allPosts.map((post) => post.tags).flat()

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-8">
          <PostTitle>Tags</PostTitle>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
        <PostTable posts={allPosts} />
      </div>
    </PageScreen>
  )
}
