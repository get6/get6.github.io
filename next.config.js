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
    ],
  },
  // output: 'export',
}

module.exports = withContentlayer(nextConfig)
