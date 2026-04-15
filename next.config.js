/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.firebasestorage.googleapis.com',
      },
    ],
  },
  swcMinify: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
