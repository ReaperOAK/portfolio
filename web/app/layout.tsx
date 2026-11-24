import type { Metadata } from 'next'
import { fontVariables } from './fonts'
import { UniverseProvider } from '@/components/UniverseProvider'
import { Dock } from '@/components/Dock'
import { universeCss, bootScript } from '@/lib/universe/css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.owaiskhan.website'),
  title: {
    default: 'Owais Ahmed Khan | Senior Developer & Systems Architect',
    template: '%s | Owais Ahmed Khan',
  },
  description:
    'Senior Software Engineer & Systems Architect. High-throughput distributed backends, autonomous agent swarms, and adversarial AI sandboxing.',
  keywords: [
    'Owais Ahmed Khan',
    'Owais Khan',
    'Owais',
    'ReaperOAK',
    'Best Developer',
    'Senior Developer',
    'Systems Architect',
    'Software Engineer',
    'Software Engineer Kolkata',
    'Full Stack Engineer',
    'Backend Engineer',
    'STCET',
    'ForgeOS',
    'AIRLOCK',
    'ClaimSwarm',
  ],
  authors: [{ name: 'Owais Ahmed Khan', url: 'https://portfolio.owaiskhan.website' }],
  creator: 'Owais Ahmed Khan',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: 'https://portfolio.owaiskhan.website',
    types: {
      'application/rss+xml': 'https://portfolio.owaiskhan.website/feed.xml',
    },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Owais',
    lastName: 'Khan',
    username: 'ReaperOAK',
    title: 'Owais Ahmed Khan | Senior Developer & Systems Architect',
    description:
      'Senior Developer & Systems Architect. High-throughput backends, autonomous agent swarms, and zero-trust isolation.',
    url: 'https://portfolio.owaiskhan.website',
    siteName: 'Owais Ahmed Khan',
    locale: 'en_US',
    images: [{ url: '/media/desk-poster.webp', width: 1200, height: 630, alt: 'Owais Ahmed Khan workspace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owais Ahmed Khan | Senior Developer & Systems Architect',
    description:
      'Senior Developer & Systems Architect. High-throughput backends, autonomous agent swarms, and zero-trust isolation.',
    images: ['/media/desk-poster.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://portfolio.owaiskhan.website/#website',
      'url': 'https://portfolio.owaiskhan.website',
      'name': 'Owais Ahmed Khan — Portfolio & Systems Engineering Hub',
      'publisher': {
        '@id': 'https://portfolio.owaiskhan.website/#person',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://portfolio.owaiskhan.website/#profilepage',
      'url': 'https://portfolio.owaiskhan.website',
      'name': 'Owais Ahmed Khan | Senior Developer & Systems Architect',
      'mainEntity': {
        '@id': 'https://portfolio.owaiskhan.website/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://portfolio.owaiskhan.website/#person',
      'name': 'Owais Ahmed Khan',
      'givenName': 'Owais',
      'additionalName': 'Ahmed',
      'familyName': 'Khan',
      'alternateName': [
        'Owais Khan',
        'Owais',
        'ReaperOAK',
        'oaak78692',
        'Best Developer',
        'Senior Developer',
      ],
      'jobTitle': 'Senior Developer & Systems Architect',
      'description':
        'Senior Software Engineer and Systems Architect building high-throughput distributed backends, adversarial zero-trust sandboxes, and autonomous multi-agent consensus networks.',
      'url': 'https://portfolio.owaiskhan.website',
      'email': 'mailto:oaak78692@gmail.com',
      'sameAs': [
        'https://github.com/ReaperOAK',
        'https://linkedin.com/in/owaistech',
        'https://x.com/ReaperOAK',
        'https://twitter.com/ReaperOAK',
        'https://owaiskhan.website',
        'https://reaperoak.vercel.app',
      ],
      'alumniOf': {
        '@type': 'CollegeOrUniversity',
        'name': "St. Thomas' College of Engineering and Technology",
        'alternateName': 'STCET',
      },
      'knowsAbout': [
        'Systems Architecture',
        'Distributed Systems',
        'Full-Stack Software Engineering',
        'Autonomous Agent Swarms',
        'Adversarial AI Testing',
        'Zero-Trust Sandboxing',
        'High-Throughput Backends',
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Python',
        'PostgreSQL',
        'Docker',
        'gVisor',
        'Hyperframes Video Engineering',
      ],
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: universeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: bootScript() }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <UniverseProvider>
          {children}
          <Dock />
        </UniverseProvider>
      </body>
    </html>
  )
}
