import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [55, 75], // 55 for the dark hero posters under a scrim, 75 everywhere else
  },
}

export default nextConfig
