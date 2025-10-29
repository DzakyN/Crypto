/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/crypto-nextjs' : ''

const nextConfig = {
  output: 'standalone',          
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  },
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
