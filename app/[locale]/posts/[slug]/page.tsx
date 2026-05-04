import { locales, localePath, type AllLocale } from '@/app/i18n/config'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { getOGImage, sliceDesc } from '@/app/lib/utils'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import Article from '@/app/ui/Article'
import GitHubGiscus from '@/app/ui/GitHubGiscus'
import Line from '@/app/ui/Line'
import MobileToc from '@/app/ui/MobileToc'
import ScrollProgress from '@/app/ui/ScrollProgress'
import ScrollToTop from '@/app/ui/ScrollToTop'
import { BlogPostStructuredData } from '@/app/ui/StructuredData'
import ToastPostal from '@/app/ui/ToastPostal'
import Toc from '@/app/ui/Toc'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTags from '@/app/ui/home/post/PostTags'
import AsideHelper from '@/app/ui/layout/AsideHelper'
import DetailScreen from '@/app/ui/layout/DetailScreen'
import {
  getPostsByLocale,
  getTranslatedPost,
  getPostTranslations,
} from '@/app/lib/content'
import LocaleSuggestion from '@/app/ui/LocaleSuggestion'
import { Metadata } from 'next'

export const generateStaticParams = async () => {
  // Generate params for ko posts under each locale (fallback)
  const koPosts = getPostsByLocale('ko')
  return locales.flatMap((locale) =>
    koPosts.map((post) => ({ locale, slug: post.slug })),
  )
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> => {
  const { locale, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getTranslatedPost(slug, locale) ?? getTranslatedPost(slug, 'ko')
  const dictionary = await getDictionary(locale)

  if (!post) {
    return createMetadata({
      title: dictionary.posts.notFound,
      locale,
      blogName: dictionary.meta.blogName,
    })
  }

  return createMetadata({
    title: post.title,
    description: sliceDesc(post.summary, 160),
    image: getOGImage(post.body.raw),
    url: localePath(`/posts/${post.slug}`, locale),
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    tags: post.tags,
    locale,
    blogName: dictionary.meta.blogName,
  })
}

export default async function LocalePost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  // Try translated version first, fallback to ko
  const post = getTranslatedPost(slug, locale) ?? getTranslatedPost(slug, 'ko')
  const dictionary = await getDictionary(locale)

  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  const availableTranslations = getPostTranslations(slug, locale)
  const localePosts = getPostsByLocale(locale)
  const otherPosts = (
    localePosts.length > 0 ? localePosts : getPostsByLocale('ko')
  )
    .filter((other) => other.slug !== slug && other.date < post.date)
    .slice(0, 3)

  const { date, title, body, tags, toc } = post

  return (
    <div className="min-w-0 overflow-x-clip">
      <ScrollToTop />
      <BlogPostStructuredData
        title={title}
        description={post.summary}
        datePublished={date}
        author={dictionary.meta.blogName}
        url={localePath(`/posts/${post.slug}`, locale)}
        image={getOGImage(body.raw)}
        tags={tags}
        locale={locale}
      />
      <ScrollProgress />
      <div
        className={`flex justify-center ${toc ? '2xl:justify-between 2xl:gap-12' : '2xl:justify-center'}`}
      >
        {toc && <AsideHelper headers={toc} />}
        <div className="flex min-w-0 flex-col">
          <DetailScreen>
            <h1 className="flex w-full justify-center text-2xl lg:w-[650px] lg:text-4xl">
              {title}
            </h1>
            <div className="prose flex w-full items-center justify-between">
              <PostDate
                date={date}
                body={body.raw}
                isDetail
                locale={locale as AllLocale}
              />
              <ToastPostal />
            </div>
            <div className="flex w-full flex-col items-center">
              <Line className="prose" />
              {toc && <MobileToc headers={toc} />}
              <Article html={body.html} />
              <Line className="prose" />
            </div>
            <PostTags tags={tags} />
            <GitHubGiscus locale={locale} />
          </DetailScreen>
          {0 < otherPosts.length && (
            <div className="flex items-center justify-center pb-8 lg:pb-16">
              <div className="flex w-full flex-col justify-center gap-4 px-4 lg:w-[840px] lg:px-0">
                <span className="text-sm font-extralight lg:text-base">
                  {dictionary.posts.otherPosts}
                </span>
                <div className="flex gap-4 overflow-x-auto lg:justify-between lg:gap-0">
                  {otherPosts.map((post) => (
                    <AnotherPost key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {toc && <Toc headers={toc} />}
      </div>
      <LocaleSuggestion availableTranslations={availableTranslations} />
    </div>
  )
}
