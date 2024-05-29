declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpeg' {
  const content: any
  export default content
}

interface Window {
  adsbygoogle: { [key: string]: unknown }[]
}

interface ToC {
  level: number
  id: string
  title: string
}
