const { withContentlayer } = require('next-contentlayer')

const isGithubActions = process.env.GITHUB_ACTIONS || false
const prod = process.env.NODE_ENV === 'production' // 로컬 테스트용

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
        pathname: '/goods/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(isGithubActions && {
    output: 'export',
  }),
}

module.exports = withContentlayer(nextConfig)
