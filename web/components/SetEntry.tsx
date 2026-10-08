'use client'
import { useEffect } from 'react'
import { useSite, type Lens, type UniverseId } from '@/lib/store'

/** Deep links (/hire, /soul) pin their lens and universe on arrival, overriding whatever was persisted. */
export function SetEntry({ lens, universe }: { lens: Lens; universe: UniverseId }) {
  const setLens = useSite(s => s.setLens)
  const setUniverse = useSite(s => s.setUniverse)
  useEffect(() => {
    setLens(lens)
    setUniverse(universe)
  }, [lens, universe, setLens, setUniverse])
  return null
}
