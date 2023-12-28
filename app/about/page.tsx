import MyCarousel from '@/app/ui/about/MyCarousel'
import PageScreen from '@/app/ui/layout/PageScreen'
import GithubIcon from '@/app/ui/social/GithubIcon'
import InstagramIcon from '@/app/ui/social/InstagramIcon'
import YoutubeIcon from '@/app/ui/social/YoutubeIcon'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export default function About() {
  return (
    <PageScreen>
      <div className="w-[888px] border border-black bg-white">
        <MyCarousel />
        <div className="flex flex-col gap-6 px-4 py-8">
          <div className="flex justify-center">
            <h1 className="text-4xl font-semibold">
              Hello! 여기까지 와줘서 고마워요.
            </h1>
          </div>
          <div className="flex justify-end gap-2">
            <a href="https://github.com/get6/" target="_blank">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/ittae.me/" target="_blank">
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/@ittae/" target="_blank">
              <YoutubeIcon className="h-6 w-6" />
            </a>
            <a href="mailto:ittae.com@gmail.com">
              <EnvelopeIcon className="h-6 w-6" />
            </a>
          </div>
          <div className="space-y-4">
            <p>
              반갑습니다. 저는 황성준입니다 😃 저는 지금 42서울에서 공통과정을
              마친 뒤 &quot;
              <a
                href="https://ittae.com/"
                target="_blank"
                className="font-semibold text-blue-500 underline"
              >
                이때
              </a>
              &quot; 라는 공유 캘린더 서비스를 만들고 있습니다.
            </p>
            <p>
              이 블로그는 제가 개발하면서 배운 것들을 기록하고, 제가 겪은 에러와
              노하우를 공유하고, 제가 읽은 책 리뷰나 저의 일상을 보여주는
              공간입니다.
            </p>
            <p>
              저는 사람들에게 도움이 되는 서비스를 만드는 것에 관심이 많습니다.
              사람들과 함께하면서 어떤 사람에게 도움이 되거나 필요한 것을 제공할
              수 있을 때, 제가 도움이 되는 것이 저의 가장 큰 기쁨이자 보람을
              느낍니다.
            </p>
            <p>
              일정 관리를 통해 사람들의 삶이 더 나은 방향으로 변할 수 있다는
              꿈이 있습니다. 제 관심 분야로는 IT 신기술이나 흥미로운 서비스,
              사람들이 겪는 불편한 문제를 해결할 수 있는 방법에 대해 관심이
              많습니다.
            </p>
            <p>
              저와 커피챗을 원하시는 경우에는{' '}
              <a
                href="mailto:ittae.com@gmail.com"
                className="text-blue-500 underline"
              >
                ittae.com@gmail.com
              </a>
              로 제가 쉽게 알아볼 수 있도록 [커피챗]이라는 문구가 포함된
              제목으로 메일을 보내주시거나 소셜 미디어 계정을 통해 연락주세요!
            </p>
            <p>감사합니다. 오늘도 좋은 하루 보내세요! 🙏🏻</p>
          </div>
        </div>
      </div>
    </PageScreen>
  )
}
