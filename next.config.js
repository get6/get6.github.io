const { withContentlayer } = require('next-contentlayer')

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
}

module.exports = withContentlayer(nextConfig)
