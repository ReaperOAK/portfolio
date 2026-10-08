import { Barlow, Big_Shoulders, Familjen_Grotesk, Instrument_Serif, Martian_Mono } from 'next/font/google'

// Self-hosted at build time by next/font: no runtime font CDN, no layout shift.
// Each universe adds its faces here and references them only through its own tokens.
export const blueprintSans = Familjen_Grotesk({ subsets: ['latin'], variable: '--font-blueprint-sans', display: 'swap' })
export const blueprintMono = Martian_Mono({ subsets: ['latin'], variable: '--font-blueprint-mono', display: 'swap' })

// Nightride: Lando-style mix — heavy condensed display, high-contrast serif italic for accent words.
// preload: false — only Blueprint (the default) is preloaded on every route; these load when Nightride shows.
export const nightrideDisplay = Big_Shoulders({ subsets: ['latin'], weight: ['800', '900'], variable: '--font-nightride-display', display: 'swap', preload: false })
export const nightrideSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-nightride-serif', display: 'swap', preload: false })
export const nightrideBody = Barlow({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-nightride-body', display: 'swap', preload: false })

export const fontVariables = [
  blueprintSans.variable, blueprintMono.variable,
  nightrideDisplay.variable, nightrideSerif.variable, nightrideBody.variable,
].join(' ')
