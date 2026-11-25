import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { Tag } from '@/app/lib/definitions'

export const metadata = createMetadata({
  title: '태그',
  description: '태그별로 게시글을 모아볼 수 있습니다.',
  url: '/tags',
})
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'
import TagTableFilter from '@/app/ui/tags/TagTableFilter'
import { getPostListByLocale } from '@/app/lib/content'
import { Suspense } from 'react'

export default async function Tags() {
  const dictionary = await getDictionary('ko')

  const koPosts = getPostListByLocale('ko')

  const tagCounts = koPosts.reduce((acc: { [key: string]: number }, post) => {
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
          <PageTitle>{dictionary.tags.title}</PageTitle>
          <TagList tags={tags} locale="ko" />
        </div>
        <Suspense fallback={null}>
          <TagTableFilter />
        </Suspense>
        <PostTable
          posts={koPosts}
          labels={{
            title: dictionary.tags.tableTitle,
            date: dictionary.tags.tableDate,
            categories: dictionary.tags.tableCategories,
            empty: dictionary.tags.noMatchingPosts,
          }}
        />
      </div>
    </PageScreen>
  )
}
