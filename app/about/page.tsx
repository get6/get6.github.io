import MyCarousel from '@/app/ui/about/MyCarousel'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import GithubIcon from '@/app/ui/social/GithubIcon'
import Link from 'next/link'

export default function About() {
  return (
    <PageScreen>
      <div className="flex flex-col gap-4 lg:w-full">
        <PageTitle className="lg:hidden">About me</PageTitle>

        <div className="flex justify-center">
          <section className="w-full border border-black bg-white shadow-2xl dark:border-white dark:bg-gray-900 lg:max-w-[888px]">
            <MyCarousel />

            <div className="border-t border-black/10 px-5 py-8 dark:border-white/20 md:px-8 md:py-10">
              <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <header className="flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold tracking-tight dark:text-white md:text-4xl">
                    안녕하세요, 황성준입니다 👋
                  </h1>
                  <p className="text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                    제품을 만들고 기록하는 개발자입니다. 지금은 사람들의 시간을
                    더 잘 쓰게 돕는 서비스
                    <Link
                      href="https://ittae.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-1 font-semibold text-blue-600 underline underline-offset-2"
                    >
                      이때
                    </Link>
                    를 만들고 있어요.
                  </p>
                </header>

                <article className="prose max-w-none leading-8 dark:prose-invert">
                  <p>
                    저는 원래 “좋은 아이디어”보다 “실제로 끝까지 만드는
                    실행력”이 더 중요하다고 믿습니다. 그래서 이 블로그는 멋있는
                    결론보다, 만들다가 막히고 고치고 다시 시도하는 과정을 그대로
                    남기는 곳에 가깝습니다.
                  </p>

                  <p>
                    요즘은 앱 개발만이 아니라 AI 에이전트 코딩을 활용해 다양한
                    제품과 자동화 도구를 만드는 데 집중하고 있어요. 실무에서는
                    CRM 개발을 하며 사용자 흐름, 운영 효율, 유지보수성을 함께
                    고민하고 있고, 개인 프로젝트로는 이때를 꾸준히 고도화하고
                    있습니다.
                  </p>

                  <p>
                    기술적으로는 클린 아키텍처, 상태 관리 책임 분리, 오류
                    처리처럼 제품을 오래 운영하기 위한 기본기를 중요하게 봅니다.
                    무엇보다 사용자의 입장에서 실제로 편하고 도움이 되는
                    경험인지 항상 먼저 확인하려고 합니다.
                  </p>

                  <p>
                    이 공간에는 개발 중 부딪힌 문제를 어떻게 풀었는지, 실제로 쓴
                    코드와 함께 정리합니다. 책에서 배운 인사이트나 일하면서 얻은
                    운영 감각도 같이 기록해요. 누군가가 같은 문제를 만났을 때
                    “아, 이렇게 접근하면 되겠구나” 하는 힌트가 되면 좋겠습니다.
                  </p>

                  <p>
                    결국 제가 만들고 싶은 건 ‘기능’이 아니라 ‘변화’입니다.
                    사용자의 시간을 아껴주고, 다음 행동을 더 쉽게 만들어주는
                    제품. 그 방향을 잃지 않으면서, 오늘도 하나씩 개선해 나가고
                    있습니다.
                  </p>
                </article>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-sm leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <p>
                    더 많은 링크와 채널은
                    <Link
                      href="https://linktr.ee/hwangitae/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-1 font-semibold text-blue-600 underline underline-offset-2"
                    >
                      링크트리
                    </Link>
                    에 정리해두었어요. SNS를 통해 편하게 DM 주세요.
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
                  ✨ I&apos;m gonna live every minute of it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageScreen>
  )
}
