const { withContentlayer } = require('next-contentlayer')

const isGithubActions = process.env.GITHUB_ACTIONS || false
const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
  ...((isGithubActions || isProduction) && {
    output: 'export',
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = withContentlayer(nextConfig)
