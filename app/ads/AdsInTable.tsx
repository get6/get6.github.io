'use client'
import { useLazyAd } from '@/app/ads/useLazyAd'

interface Props {
  adKey?: string
}

export const AdsInTable = ({ adKey }: Props) => {
  const { ref, active, blocked } = useLazyAd<HTMLDivElement>()

  if (blocked) return null

  return (
    <div ref={ref}>
      {active && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
          }}
          data-ad-client="ca-pub-1411731962767238"
          data-ad-slot="2705917050"
          data-ad-format="auto"
          data-full-width-responsive="true"
          key={adKey}
        ></ins>
      )}
    </div>
  )
}
