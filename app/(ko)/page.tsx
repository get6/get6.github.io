import { BASE_URL } from '@/app/lib/definitions'
import { getDictionary } from '@/app/i18n/get-dictionary'
import PageTitle from '@/app/ui/home/PageTitle'
import PostList from '@/app/ui/home/PostList'
import PostListFilter from '@/app/ui/home/PostListFilter'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { Skeleton } from '@/app/ui/Skeleton'
import { WebsiteStructuredData } from '@/app/ui/StructuredData'
import { getPostListByLocale } from '@/app/lib/content'
import { Suspense } from 'react'

function SearchBarFallback() {
  return <Skeleton height="48px" width="320px" className="rounded-md" />
}

export default async function Home() {
  const dictionary = await getDictionary('ko')

  const koPosts = getPostListByLocale('ko')

  const recentPosts = koPosts.slice(0, 3)
  const posts = koPosts.slice(3)

  return (
    <PageScreen>
      <WebsiteStructuredData
        name={dictionary.meta.blogName}
        description={dictionary.meta.blogDescription}
        url={BASE_URL}
      />
      <div className="flex w-full flex-col items-center gap-8">
        <PageTitle>{dictionary.home.heading}</PageTitle>
        <div className="flex w-full flex-col gap-4">
          <PageTitle level={2}>{dictionary.home.recentPosts}</PageTitle>
          <div className="flex flex-wrap justify-center gap-4 lg:max-w-full lg:flex-nowrap lg:justify-between">
            {recentPosts.map((post) => (
              <RecentPost key={post.slug} post={post} locale="ko" />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PageTitle level={2}>{dictionary.home.allPosts}</PageTitle>
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <PostListFilter />
          </Suspense>
          <PostList
            posts={posts}
            locale="ko"
            emptyLabel={dictionary.search.noResults}
          />
        </div>
      </div>
    </PageScreen>
  )
}
