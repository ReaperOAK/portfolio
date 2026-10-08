import type { Metadata } from 'next'
import { fontVariables } from './fonts'
import { UniverseProvider } from '@/components/UniverseProvider'
import { Dock } from '@/components/Dock'
import { universeCss, bootScript } from '@/lib/universe/css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.owaiskhan.website'),
  title: 'Owais Ahmed Khan',
  description: 'Senior Developer. Rider. Shayar.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: universeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: bootScript() }} />
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
