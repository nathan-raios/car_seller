/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.firebasestorage.googleapis.com',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      },
    ],
  },
  swcMinify: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
