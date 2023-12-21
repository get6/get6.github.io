const { withContentlayer } = require('next-contentlayer')

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
        hostname: 'image.unsplash.com',
      },
    ],
  },
  ...(prod && { output: 'export' }),
}

module.exports = withContentlayer(nextConfig)
