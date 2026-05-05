'use client'
import { useLazyAd } from '@/app/ads/useLazyAd'

export const AdsRecentPost = () => {
  const { ref, active, blocked } = useLazyAd<HTMLDivElement>()

  if (blocked) return null

  return (
    <div
      ref={ref}
      className="flex h-[140px] w-full items-center justify-center overflow-hidden border border-black bg-white dark:border-white dark:bg-gray-900 lg:h-[205px] lg:w-[520px]"
    >
      {active && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          data-ad-format="fluid"
          data-ad-layout-key="+37+pa+33+c+60"
          data-ad-client="ca-pub-1411731962767238"
          data-ad-slot="7771446987"
        ></ins>
      )}
    </div>
  )
}
