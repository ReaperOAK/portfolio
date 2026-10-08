'use client'
import { useEffect } from 'react'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import { detectTier, probe } from '@/lib/tier'
import type { TokenSet } from '@/lib/universe/types'
import { CSS_VAR } from '@/lib/universe/css'
import { Curtain } from './Curtain'

/** The only place universe tokens touch the DOM. Colour vars are @property-registered in globals.css, so they interpolate. */
export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const universe = useSite(s => s.universe)
  const hydrate = useSite(s => s.hydrate)
  const setTier = useSite(s => s.setTier)
  const entered = useSite(s => s.entered)

  useEffect(() => {
    hydrate()
    setTier(detectTier(probe()))
  }, [hydrate, setTier])

  useEffect(() => {
    if (!entered) return // before entry, the boot script's data-universe attribute already paints the right world
    const { id, tokens } = resolve(universe)
    const root = document.documentElement
    for (const key of Object.keys(CSS_VAR) as (keyof TokenSet)[]) root.style.setProperty(CSS_VAR[key], tokens[key])
    root.dataset.universe = id
  }, [universe, entered])

  return (
    <>
      <Curtain />
      {children}
    </>
  )
}
