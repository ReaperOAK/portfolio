import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ponytail: temporary (307) until the cold open ships on / in Task 14 — then delete this.
  async redirects() {
    return [{ source: '/', destination: '/hire', permanent: false }]
  },
}

export default nextConfig
