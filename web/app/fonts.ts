import { Familjen_Grotesk, Martian_Mono } from 'next/font/google'

// Self-hosted at build time by next/font: no runtime font CDN, no layout shift.
// Each universe adds its faces here and references them only through its own tokens.
export const blueprintSans = Familjen_Grotesk({ subsets: ['latin'], variable: '--font-blueprint-sans', display: 'swap' })
export const blueprintMono = Martian_Mono({ subsets: ['latin'], variable: '--font-blueprint-mono', display: 'swap' })

export const fontVariables = [blueprintSans.variable, blueprintMono.variable].join(' ')
