import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import { Tag } from '@/app/lib/definitions'
import TagsFallBack from '@/app/ui/TagsFallback'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import PostTable from '@/app/ui/tags/PostTable'
import TagList from '@/app/ui/tags/TagList'
import { getPostsByLocale } from '@/app/lib/content'
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
  })
}

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

export default async function LocaleTags({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  let localePosts = getPostsByLocale(locale)
  if (localePosts.length === 0) {
    localePosts = getPostsByLocale('ko')
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
          <Suspense
            fallback={<TagListFallback tags={tags.map((tag) => tag.name)} />}
          >
            <TagList tags={tags} />
          </Suspense>
        </div>
        <Suspense fallback={<PostTableFallback />}>
          <PostTable posts={localePosts} />
        </Suspense>
      </div>
    </PageScreen>
  )
}
