/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
  },
  images: {
    domains: ['loremflickr.com'],
  },
}

module.exports = nextConfig
