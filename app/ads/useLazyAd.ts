'use client'

import { useEffect, useRef, useState } from 'react'

// SDK가 광고를 채우는 데 보통 1~2초. 차단기 환경에서는 ins가 갱신되지 않으므로
// 그 차이로 차단 여부를 판정한다.
const FILL_TIMEOUT_MS = 3000

// 한 번 차단으로 판정되면 같은 페이지의 나머지 슬롯에도 그 결과를 전파한다.
// 그러지 않으면 슬롯마다 viewport 진입 → 3 s 대기 → unmount가 반복되어,
// 사용자 입장에서는 스크롤할 때마다 광고 영역이 차례차례 사라지는 것처럼 보인다.
// 후속 슬롯은 처음부터 wrapper를 그리지 않으므로 추가 layout shift도 없다.
const blockedListeners = new Set<() => void>()
let blockedSession = false

const propagateBlocked = () => {
  blockedSession = true
  blockedListeners.forEach((listener) => listener())
}

// 광고 슬롯이 viewport(또는 그 200px 위)에 진입하기 전에는 adsbygoogle.push를
// 호출하지 않는다. 페이지 로드 직후 모든 슬롯이 한꺼번에 SDK 작업을 트리거하면
// main thread가 잡혀 TBT가 폭증한다. 첫 화면 밖 슬롯은 사용자가 스크롤할 때
// 점진적으로 채워져 부하가 분산된다.
//
// 또한 광고가 채워지지 않은 경우(AdSense unfilled / 차단기 / SDK 미로드)
// `blocked`를 true로 돌려서 호출자가 빈 wrapper 영역을 숨길 수 있게 한다.
export function useLazyAd<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(false)
  const [blocked, setBlocked] = useState(blockedSession)
  const pushed = useRef(false)

  useEffect(() => {
    if (blockedSession) {
      setBlocked(true)
      return
    }
    const listener = () => setBlocked(true)
    blockedListeners.add(listener)
    return () => {
      blockedListeners.delete(listener)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || blocked) return

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
  }, [blocked])

  useEffect(() => {
    if (!active || pushed.current) return
    if (process.env.NODE_ENV !== 'production') return

    pushed.current = true
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})

    const timer = window.setTimeout(() => {
      const ins = ref.current?.querySelector('ins.adsbygoogle')
      if (ins?.getAttribute('data-ad-status') !== 'filled') {
        propagateBlocked()
      }
    }, FILL_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [active])

  return { ref, active, blocked }
}
