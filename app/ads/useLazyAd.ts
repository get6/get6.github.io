'use client'

import { useEffect, useRef, useState } from 'react'

// 광고 슬롯이 viewport(또는 그 200px 위)에 진입하기 전에는 adsbygoogle.push를
// 호출하지 않는다. 페이지 로드 직후 모든 슬롯이 한꺼번에 SDK 작업을 트리거하면
// main thread가 잡혀 TBT가 폭증한다. 첫 화면 밖 슬롯은 사용자가 스크롤할 때
// 점진적으로 채워져 부하가 분산된다.
export function useLazyAd<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(false)
  const pushed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 구형 브라우저 fallback: 즉시 활성화.
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (active && !pushed.current && process.env.NODE_ENV === 'production') {
      pushed.current = true
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [active])

  return { ref, active }
}
