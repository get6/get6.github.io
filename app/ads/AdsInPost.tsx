'use client'
import { useLazyAd } from '@/app/ads/useLazyAd'

export const AdsInPost = () => {
  const { ref, active, blocked } = useLazyAd<HTMLDivElement>()

  if (blocked) return null

  return (
    <div ref={ref} className="max-w-prose px-6 lg:px-0">
      {active && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-1411731962767238"
          data-ad-slot="6140930882"
        ></ins>
      )}
    </div>
  )
}
