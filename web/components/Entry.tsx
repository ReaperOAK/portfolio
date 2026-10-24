'use client'
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useSite, type Lens, type UniverseId } from '@/lib/store'

const RouteUniverse = createContext<UniverseId>('blueprint')

/** A route declares its lens and default universe, and wraps its content so the server renders that universe.
 *  The universe applies only on the first landing of a visit, and only if the visitor never chose one. */
export function Entry({ lens, universe, children }: { lens: Lens; universe: UniverseId; children: ReactNode }) {
  const enter = useSite(s => s.enter)
  useEffect(() => enter(lens, universe), [lens, universe, enter])
  return <RouteUniverse.Provider value={universe}>{children}</RouteUniverse.Provider>
}

/** The universe to render. Until the visit is entered (server render, first client render) it is the route's
 *  default, so server and client markup match; after that it is the store's. */
export function useUniverse(): UniverseId {
  const route = useContext(RouteUniverse)
  const entered = useSite(s => s.entered)
  const chosen = useSite(s => s.universe)
  return entered ? chosen : route
}
