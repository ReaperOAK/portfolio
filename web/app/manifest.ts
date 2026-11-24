import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Owais Ahmed Khan — AI Systems & Engineering Portfolio',
    short_name: 'Owais Khan',
    description: 'Production AI architectures, distributed platforms, autonomous agents, and systems engineering case studies by Owais Ahmed Khan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b10',
    theme_color: '#0a0b10',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
