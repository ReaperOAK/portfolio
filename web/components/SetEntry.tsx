'use client'
import { useEffect } from 'react'
import { useSite, type Lens, type UniverseId } from '@/lib/store'

/** A route declares its lens and its default universe. The universe applies only on the first landing of a visit. */
export function SetEntry({ lens, universe }: { lens: Lens; universe: UniverseId }) {
  const enter = useSite(s => s.enter)
  useEffect(() => enter(lens, universe), [lens, universe, enter])
  return null
}
