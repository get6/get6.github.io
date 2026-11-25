import { BASE_URL } from '@/app/lib/definitions'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import PageTitle from '@/app/ui/home/PageTitle'
import { Metadata } from 'next'
import PostList from '@/app/ui/home/PostList'
import PostListFilter from '@/app/ui/home/PostListFilter'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { Skeleton } from '@/app/ui/Skeleton'
import { WebsiteStructuredData } from '@/app/ui/StructuredData'
import { getPostListByLocale } from '@/app/lib/content'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return createMetadata({
    title: dictionary.meta.blogTitle,
    description: dictionary.meta.blogDescription,
    url: `/${locale}`,
    locale,
    blogName: dictionary.meta.blogName,
  })
}

function SearchBarFallback() {
  return <Skeleton height="48px" width="320px" className="rounded-md" />
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  // Use locale-specific posts; fallback to ko if none exist for this locale
  let localePosts = getPostListByLocale(locale)
  if (localePosts.length === 0) {
    localePosts = getPostListByLocale('ko')
  }

  const recentPosts = localePosts.slice(0, 3)
  const posts = localePosts.slice(3)

  return (
    <PageScreen>
      <WebsiteStructuredData
        name={dictionary.meta.blogTitle}
        description={dictionary.meta.blogDescription}
        url={BASE_URL}
        locale={locale}
      />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-4">
          <PageTitle>{dictionary.home.recentPosts}</PageTitle>
          <div className="flex flex-wrap justify-center gap-4 lg:max-w-full lg:flex-nowrap lg:justify-between">
            {recentPosts.map((post) => (
              <RecentPost key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PageTitle>{dictionary.home.allPosts}</PageTitle>
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <PostListFilter />
          </Suspense>
          <PostList
            posts={posts}
            locale={locale}
            emptyLabel={dictionary.search.noResults}
          />
        </div>
      </div>
    </PageScreen>
  )
}
