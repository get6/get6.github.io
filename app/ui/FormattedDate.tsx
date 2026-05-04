import type { AllLocale } from '@/app/i18n/config'
import { TZDate } from '@date-fns/tz'
import { format } from 'date-fns'
import { enUS, ja, ko } from 'date-fns/locale'

const LOCALE_MAP = { ko, en: enUS, ja } as const

interface Props {
  date: string
  formatStr?: string
  locale?: AllLocale
}

// 게시일을 KST(Asia/Seoul) timezone으로 고정 표시한다.
// 사용자 timezone에 의존하면 SSR(KST)과 CSR(브라우저 TZ) 결과가 어긋나
// React #418 hydration mismatch가 발생한다.
export default function FormattedDate({
  date,
  formatStr = 'yyyy-MM-dd',
  locale = 'ko',
}: Props) {
  return (
    <time dateTime={date}>
      {format(new TZDate(date, 'Asia/Seoul'), formatStr, {
        locale: LOCALE_MAP[locale],
      })}
    </time>
  )
}
