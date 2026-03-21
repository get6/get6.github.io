import { localePath } from '@/app/i18n/config'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { generateMetadata as createMetadata } from '@/app/lib/metadata'
import MyCarousel from '@/app/ui/about/MyCarousel'
import { PersonStructuredData } from '@/app/ui/StructuredData'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import GithubIcon from '@/app/ui/social/GithubIcon'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return createMetadata({
    title: dictionary.about.title,
    description: dictionary.about.pageDescription,
    url: `/${locale}/about`,
    locale,
    blogName: dictionary.meta.blogName,
  })
}

export default async function LocaleAbout({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <PageScreen>
      <PersonStructuredData
        name={dictionary.about.personName}
        description={dictionary.about.personDescription}
        url={localePath('/about', locale)}
        jobTitle="Software Developer"
        locale={locale}
      />
      <div className="flex flex-col gap-4 lg:w-full">
        <PageTitle className="lg:hidden">{dictionary.about.title}</PageTitle>

        <div className="flex justify-center">
          <section className="w-full border border-black bg-white shadow-2xl dark:border-white dark:bg-gray-900 lg:max-w-[888px]">
            <MyCarousel />

            <div className="border-t border-black/10 px-5 py-8 dark:border-white/20 md:px-8 md:py-10">
              <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold tracking-tight dark:text-white md:text-4xl">
                    {dictionary.about.greeting}
                  </h1>
                  <p className="text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                    {dictionary.about.intro}
                    <Link
                      href="https://ittae.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-1 font-semibold text-blue-600 underline underline-offset-2"
                    >
                      {dictionary.about.introService}
                    </Link>
                    {dictionary.about.introSuffix}
                  </p>
                </header>

                <article className="prose max-w-none leading-8 dark:prose-invert">
                  <p>{dictionary.about.body1}</p>
                  <p>{dictionary.about.body2}</p>
                  <p>{dictionary.about.body3}</p>
                  <p>{dictionary.about.body4}</p>
                  <p>{dictionary.about.body5}</p>
                </article>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-sm leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <p>
                    {dictionary.about.linksPrefix}
                    <Link
                      href="https://linktr.ee/hwangitae/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-1 font-semibold text-blue-600 underline underline-offset-2"
                    >
                      {dictionary.about.linksLinkText}
                    </Link>
                    {dictionary.about.linksSuffix}
                  </p>
                  <Link
                    href="https://github.com/get6/"
                    aria-label="GitHub"
                    title="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md p-2 transition-transform duration-150 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <GithubIcon className="h-6 w-6" />
                  </Link>
                </div>

                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                  {dictionary.about.motto}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageScreen>
  )
}
