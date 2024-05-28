const { withContentlayer } = require('next-contentlayer')

const isProduction =
  (process.env.GITHUB_ACTIONS ?? false) || process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProduction ? 'export' : 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // unoptimized: isProduction ? true : false,
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

module.exports = withContentlayer(nextConfig)
