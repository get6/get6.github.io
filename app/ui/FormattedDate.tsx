import { TZDate } from '@date-fns/tz'
import { format } from 'date-fns'

interface Props {
  date: string
  formatStr?: string
}

// 게시일을 KST(Asia/Seoul)로 고정 표시. 사용자 timezone에 의존하면
// SSR(KST)과 CSR(브라우저 TZ) 결과가 달라져 React #418 hydration
// mismatch가 난다.
export default function FormattedDate({
  date,
  formatStr = 'yyyy-MM-dd',
}: Props) {
  return (
    <time dateTime={date}>
      {format(new TZDate(date, 'Asia/Seoul'), formatStr)}
    </time>
  )
}
