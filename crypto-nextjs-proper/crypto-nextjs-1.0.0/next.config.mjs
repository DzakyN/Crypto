/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/crypto-nextjs' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
