import { Barlow, Big_Shoulders, Familjen_Grotesk, Martian_Mono } from 'next/font/google'

// Self-hosted at build time by next/font: no runtime font CDN, no layout shift.
// Each universe adds its faces here and references them only through its own tokens.
export const blueprintSans = Familjen_Grotesk({ subsets: ['latin'], variable: '--font-blueprint-sans', display: 'swap' })
export const blueprintMono = Martian_Mono({ subsets: ['latin'], variable: '--font-blueprint-mono', display: 'swap' })

// Nightride: heavy condensed display; accents use Barlow italic (same family as the body, never a borrowed serif).
// preload: false: only Blueprint, the default, is preloaded on every route; these load when Nightride shows.
export const nightrideDisplay = Big_Shoulders({ subsets: ['latin'], weight: ['800', '900'], variable: '--font-nightride-display', display: 'swap', preload: false })
export const nightrideBody = Barlow({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-nightride-body', display: 'swap', preload: false })

export const fontVariables = [
  blueprintSans.variable, blueprintMono.variable,
  nightrideDisplay.variable, nightrideBody.variable,
].join(' ')
