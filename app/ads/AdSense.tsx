import Script from 'next/script'

export default function AdSense() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      id="adsbygoogle-loader"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1411731962767238"
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  )
}
