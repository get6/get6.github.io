export type Tag = {
  name: string
  count: number
}

export const blog_title = '이때의 나'
export const blog_description = '이때를 살아가는 황성준(황이태)의 블로그'

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


