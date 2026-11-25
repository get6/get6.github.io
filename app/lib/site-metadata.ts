import { BASE_URL } from '@/app/lib/definitions'
import type { Metadata } from 'next'

/** Head tags shared by the Korean and locale root layouts. */
export const sharedMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/icons/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/icons/favicon-dark.ico',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  verification: {
    google: 'TKcf-2ROx-mSTXqWfCfdwRGHICOHF8NpvuGfTY650o0',
    other: {
      'naver-site-verification': '6e81cb6b70ea6de1df6822ac96bb0fb48838ae8a',
    },
  },
  other: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}
