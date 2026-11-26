export type Tag = {
  name: string
  count: number
}

export const blog_name = '이때의 나'
// 홈 문서 제목. 사이트명이 이미 앞에 있으므로 ` - ${blog_name}`을 다시 붙이지 않는다.
export const blog_title = '이때의 나 – 만들고 배우고 남기는 기록'
export const blog_description =
  'AI 에이전트로 일하는 법, 제품 이때를 만드는 과정, 그리고 그때의 생각을 적어 두는 블로그예요.'

export enum BookStatus {
  ToRead = 'to_read', // 읽고 싶어
  Reading = 'reading', // 읽고 있어 (30일 지나면 자동으로 paused로 간주)
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
  { name: 'Library', href: '/library' },
  { name: 'Tags', href: '/tags' },
  { name: 'About me', href: '/about' },
] as const

export interface Ad {
  type: 'Ad'
}

export const ad_per_content = 8

// 공통 타입들 추가
export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface PageParams {
  slug: string
}

// 에러 처리를 위한 타입
export interface ErrorState {
  hasError: boolean
  error?: Error
  errorMessage?: string
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
