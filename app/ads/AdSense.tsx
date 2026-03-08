export default function AdSense() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1411731962767238"
      crossOrigin="anonymous"
    ></script>
  )
}
