const { withContentlayer } = require('next-contentlayer')
const withOptimizedImages = require('next-optimized-images')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isDev = process.env.NODE_ENV === 'development'

// /** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDev ? 'standalone' : 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
}

module.exports = withPlugins(
  [withBundleAnalyzer, withOptimizedImages, { optimizeImagesInDev: true }, withContentlayer],
  nextConfig,
)
