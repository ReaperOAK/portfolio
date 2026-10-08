import type { Metadata } from 'next'
import { fontVariables } from './fonts'
import { UniverseProvider } from '@/components/UniverseProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan',
  description: 'Senior Developer. Rider. Shayar.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <UniverseProvider>{children}</UniverseProvider>
      </body>
    </html>
  )
}
