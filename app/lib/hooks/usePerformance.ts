'use client'

import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  loadTime?: number
  domContentLoaded?: number
  firstPaint?: number
  firstContentfulPaint?: number
}

export function usePerformanceMetrics() {
  const metricsRef = useRef<PerformanceMetrics>({})

  useEffect(() => {
    // DOM이 완전히 로드된 후 성능 메트릭 수집
    const collectMetrics = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const timing = window.performance.timing
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        metricsRef.current = {
          loadTime: timing.loadEventEnd - timing.navigationStart,
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          firstPaint: navigation.loadEventEnd - navigation.loadEventStart,
          firstContentfulPaint: timing.loadEventEnd - timing.fetchStart,
        }

        // 개발 환경에서만 콘솔에 출력
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metricsRef.current)
        }
      }
    }

    // 페이지 로드가 완료된 후 메트릭 수집
    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
    }

    return () => {
      window.removeEventListener('load', collectMetrics)
    }
  }, [])

  return metricsRef.current
}

// 컴포넌트 렌더링 시간 측정 훅
export function useRenderTime(componentName: string) {
  const startTime = useRef<number>(0)

  useEffect(() => {
    startTime.current = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime.current

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
      }
    }
  })
}
