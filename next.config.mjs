import { withContentlayer } from 'next-contentlayer2'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  reactStrictMode: true,
  // Compress and minify JavaScript
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // Required for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issues
    // Two root layouts (Korean routes and /en, /ja) have no single parent
    // layout to render an unmatched URL, so the 404 document is global.
    globalNotFound: true,
  },
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
}

export default withBundleAnalyzer(withContentlayer(nextConfig))
