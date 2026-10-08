import type { UniverseId } from '@/lib/store'
import type { Universe } from './types'
import { blueprint } from './blueprint'
import { nightride } from './nightride'

/** Universes ship one at a time. Only ids listed here can be selected. */
export const REGISTERED = ['blueprint', 'nightride'] as const
export type RegisteredId = (typeof REGISTERED)[number]

export const UNIVERSES: Record<RegisteredId, Universe> = { blueprint, nightride }

export function isRegistered(id: UniverseId): id is RegisteredId {
  return (REGISTERED as readonly string[]).includes(id)
}

/** An unregistered id (stale localStorage, a universe not shipped yet) falls back to blueprint. */
export function resolve(id: UniverseId): Universe {
  return isRegistered(id) ? UNIVERSES[id] : UNIVERSES.blueprint
}
