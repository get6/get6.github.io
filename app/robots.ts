import { MetadataRoute } from 'next'
import { BASE_URL } from '@/app/lib/definitions'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // API 경로 차단
          '/_next/',        // Next.js 내부 파일들
          '/admin/',        // 관리자 페이지 (있는 경우)
          '/*.json$',       // JSON 파일들
          '/scripts/',      // 스크립트 폴더
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI의 GPTBot 차단 (선택사항)
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
