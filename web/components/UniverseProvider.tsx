'use client'
import { useEffect } from 'react'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import { detectTier, probe } from '@/lib/tier'
import type { TokenSet } from '@/lib/universe/types'

const CSS_VAR: Record<keyof TokenSet, string> = {
  bg: '--u-bg', bg2: '--u-bg2', fg: '--u-fg', dim: '--u-dim',
  accent: '--u-accent', accent2: '--u-accent2', line: '--u-line',
  radius: '--u-radius', tracking: '--u-tracking',
  display: '--u-display', body: '--u-body', mono: '--u-mono',
  displayWeight: '--u-display-weight', displayStretch: '--u-display-stretch',
}

/** The only place universe tokens touch the DOM. Colour vars are @property-registered in globals.css, so they interpolate. */
export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const universe = useSite(s => s.universe)
  const hydrate = useSite(s => s.hydrate)
  const setTier = useSite(s => s.setTier)

  useEffect(() => {
    hydrate()
    setTier(detectTier(probe()))
  }, [hydrate, setTier])

  useEffect(() => {
    const { id, tokens } = resolve(universe)
    const root = document.documentElement
    for (const key of Object.keys(CSS_VAR) as (keyof TokenSet)[]) root.style.setProperty(CSS_VAR[key], tokens[key])
    root.dataset.universe = id
  }, [universe])

  return <>{children}</>
}
