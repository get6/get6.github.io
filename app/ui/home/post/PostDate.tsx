import type { AllLocale } from '@/app/i18n/config'
import { readingTime } from '@/app/lib/utils'
import FormattedDate from '@/app/ui/FormattedDate'
import { Post } from 'contentlayer/generated'

const FORMAT_BY_LOCALE: Record<AllLocale, string> = {
  ko: 'M월 d일',
  ja: 'M月d日',
  en: 'MMM d',
}

interface Props {
  post: Post
  isDetail?: boolean
  // 페이지 locale이 post.locale과 다른 경우(fallback 등) 호출자가 override.
  locale?: AllLocale
}

export default function PostDate({ post, isDetail = false, locale }: Props) {
  const effectiveLocale = locale ?? (post.locale as AllLocale)
  return (
    <span
      className={`text-xs dark:text-white ${
        isDetail ? 'font-light lg:text-sm' : 'font-normal'
      }`}
    >
      <FormattedDate
        date={post.date}
        formatStr={FORMAT_BY_LOCALE[effectiveLocale]}
        locale={effectiveLocale}
      />
      &nbsp;・&nbsp;{readingTime(post.body.raw)} min
    </span>
  )
}
