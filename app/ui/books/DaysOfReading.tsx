'use client'

import { todayState } from '@/app/state/date-state'
import { differenceInCalendarDays } from 'date-fns'
import { useRecoilValue } from 'recoil'

interface Props {
  startReadDate: string
}

export default function DaysOfReading({ startReadDate }: Props) {
  const today = useRecoilValue(todayState)

  return (
    <span className="font-semibold text-red-500">
      +{differenceInCalendarDays(today, startReadDate)}일째
    </span>
  )
}
