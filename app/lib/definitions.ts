export type Tag = {
  name: string
  count: number
}

export const blog_name = '이때의 나'
export const blog_title = `오늘도 좋은 하루 보내세요 🫶 - ${blog_name}`
export const blog_description =
  '이때를 살아가며 많은 것을 보고 느끼는 것들을 정리한 나의 블로그'

export enum BookStatus {
  ToRead = 'to_read', // 읽고 싶어
  Reading = 'reading', // 읽고 있어
  Finished = 'finished', // 읽었어
}

export enum ThemeState {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://get6.github.io'
    : 'http://localhost:3000'

export const menus = [
  // { name: 'Posts', href: '/posts' },
  { name: 'Books', href: '/books' },
  // { name: 'Life', href: '/life' },
  // { name: 'Series', href: '/series' },
  { name: 'Tags', href: '/tags' },
  { name: 'About me', href: '/about' },
]
