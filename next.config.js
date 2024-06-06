const { withContentlayer } = require('next-contentlayer')
const withOptimizedImages = require('next-optimized-images')
const withPlugins = require('next-compose-plugins')

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
  [withOptimizedImages, { optimizeImagesInDev: true }, withContentlayer],
  nextConfig,
)
