import MyCarousel from '@/app/ui/about/MyCarousel'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import GithubIcon from '@/app/ui/social/GithubIcon'
import InstagramIcon from '@/app/ui/social/InstagramIcon'
import LinkedInIcon from '@/app/ui/social/LinkedInIcon'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function About() {
  const channels = [
    {
      icon: <GithubIcon className="h-6 w-6" />,
      href: 'https://github.com/get6/',
    },
    {
      icon: <LinkedInIcon className="h-6 w-6" />,
      href: 'https://www.linkedin.com/in/ittae/',
    },
    {
      icon: <InstagramIcon className="h-6 w-6" />,
      href: 'https://www.instagram.com/ittae.me/',
    },
    // {
    //   icon: <YoutubeIcon className="h-6 w-6" />,
    //   href: 'https://www.youtube.com/@ittae/',
    // },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      href: 'mailto:ittae.com@gmail.com',
    },
  ]

  return (
    <PageScreen>
      <div className="flex flex-col gap-4 lg:w-full">
        <PageTitle className="lg:hidden">About me</PageTitle>
        <div className="flex justify-center">
          <div className="border border-black bg-white shadow-2xl dark:border-white dark:bg-gray-900 lg:w-[888px]">
            <MyCarousel />
            <div className="flex flex-col gap-6 border-t border-white px-4 py-8 dark:border-white">
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold dark:text-white lg:text-4xl">
                  Hello! 여기까지 와줘서 고마워요 😃
                </h1>
              </div>
              <div className="flex items-center justify-end gap-2 dark:text-white">
                {channels.map((channel, index) => (
                  <Link
                    key={index}
                    href={channel.href}
                    {...(index !== channels.length - 1 && {
                      target: '_blank',
                    })}
                  >
                    {channel.icon}
                  </Link>
                ))}
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="prose dark:text-white">
                  <p>반갑습니다! 전 황성준이에요 🧑🏻‍💻</p>
                  <p>
                    저는 23년 12월에&nbsp;
                    <Link
                      href="https://42seoul.kr/"
                      target="_blank"
                      className="text-blue-500"
                    >
                      42서울
                    </Link>
                    에서 공통과정을 끝내고 창업을 준비하고 있어요. 지금은&nbsp;&quot;
                    <Link
                      href="https://ittae.com/"
                      target="_blank"
                      className="font-semibold text-blue-500 underline"
                    >
                      이때
                    </Link>
                    &quot;&nbsp;라는 캘린더 앱을 틈틈히 만들고 있어요.
                  </p>
                  <p>
                    어릴 때부터 저는 새로운 것에 대한 호기심이 많았어요. 특히,
                    기술에 깊은 관심을 가져왔었죠. 막연하게 공학자를 꿈꿨지만,
                    컴퓨터 앞에 앉아 새로운 것들을 접하고 게임을 가장 좋아했던
                    세상물정을 잘 모르던 꼬마 아이였어요.
                  </p>
                  <p>
                    20대가 되고 나선, 프로그래밍에 흥미를 느꼈고 컴퓨터 작동
                    원리를 이해하려고 노력해 왔어요. 그렇게 시작된 기술에 대한
                    열정이 지금의 저를 만들어오고 있어요.
                  </p>
                  <p>
                    이 블로그는 제가 개발하면서 배운 것들, 겪었던 오류를 해결
                    방법을 공유하는 공간이에요. 또한 제가 읽은 책에 대한 리뷰나
                    일상과 고민도 함께 나누고 있어요.
                  </p>
                  <p>
                    저는 사람들에게 도움이 되는 서비스를 만드는 것에 큰 보람을
                    느끼고 싶어요. 사람들이 겪고 있는 문제를 해결하고, 사람들의
                    삶을 더 나은 방향으로 변화시키는 것이 저의 목표예요. 제가
                    사람들에게 도움이 되는 것이 저의 가장 큰 기쁨이자
                    보람이에요. 제 관심 분야는 IT 신기술과 혁신적인 서비스
                    그리고 사람들의 불편을 해소할 수 있는 멋진 방법들이에요.
                  </p>
                  <p>
                    저와 함께 이야기를 나누고 싶으시거나, 비슷한 관심사를 가지고
                    계신 분들은&nbsp;
                    <Link
                      href="https://linktr.ee/hwangitae/"
                      target="_blank"
                      className="font-semibold text-blue-500 underline"
                    >
                      링크트리
                    </Link>
                    에 연결된 소셜 미디어를 통해 연락해 주세요!
                    역삼동이나 개포동 근처에서 만나서 이야기를 나눠봐요.
                  </p>
                  <p>감사합니다. 오늘도 좋은 하루 보내세요! 🙏🏻</p>
                </div>
              </div>
              <div className="flex justify-center text-sm font-light">
                ✨ I&apos;m gonna live every minute of it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageScreen>
  )
}
