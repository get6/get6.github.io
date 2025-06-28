'use client'

import { useReportWebVitals } from 'next/web-vitals'

// gtag function 타입 선언
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 개발 환경에서만 콘솔에 출력
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }

    // 프로덕션에서는 Google Analytics로 전송
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', metric.name, {
        custom_map: { [metric.name]: 'web_vitals' },
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }
  })

  return null
}
