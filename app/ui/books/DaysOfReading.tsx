'use client'

import { differenceInCalendarDays } from 'date-fns'

interface Props {
  startReadDate: Date
}

export default function DaysOfReading({ startReadDate }: Props) {
  const daysOfReading = differenceInCalendarDays(new Date(), startReadDate)

  return (
    <span className="font-semibold text-red-500">
      {`+${daysOfReading}일째`}
    </span>
  )
}
