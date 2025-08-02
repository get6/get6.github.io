const { withContentlayer } = require('next-contentlayer2')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// /** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
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
  },
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  // Font optimization
  optimizeFonts: true,
}

module.exports = withPlugins([withBundleAnalyzer, withContentlayer], nextConfig)
