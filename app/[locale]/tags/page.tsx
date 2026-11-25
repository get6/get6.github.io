import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { Tag } from '@/app/lib/definitions'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'
import TagTableFilter from '@/app/ui/tags/TagTableFilter'
import { getPostListByLocale } from '@/app/lib/content'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return createMetadata({
    title: dictionary.tags.title,
    description: dictionary.tags.pageDescription,
    url: `/${locale}/tags`,
    locale,
    blogName: dictionary.meta.blogName,
  })
}

export default async function LocaleTags({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  let localePosts = getPostListByLocale(locale)
  if (localePosts.length === 0) {
    localePosts = getPostListByLocale('ko')
  }

  const tagCounts = localePosts.reduce(
    (acc: { [key: string]: number }, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    },
    {},
  )

  const tags: Tag[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4 lg:gap-8">
          <PageTitle>{dictionary.tags.title}</PageTitle>
          <TagList tags={tags} locale={locale} />
        </div>
        <Suspense fallback={null}>
          <TagTableFilter />
        </Suspense>
        <PostTable
          posts={localePosts}
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
