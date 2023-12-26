const { withContentlayer } = require('next-contentlayer')

const isGithubActions = process.env.GITHUB_ACTIONS || false
const prod = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
    // assetPrefix: 'https://get6.github.io',
    assetPrefix: './',
  }),
}

module.exports = withContentlayer(nextConfig)
