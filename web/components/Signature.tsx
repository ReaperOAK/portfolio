'use client'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import type { StageSlot } from '@/lib/universe/types'

/** Renders the active universe's set piece for a slot, or nothing. Never the only path to content. */
export function Signature({ slot }: { slot: StageSlot }) {
  const universe = useSite(s => s.universe)
  const Piece = resolve(universe).signature?.[slot]
  return Piece ? <Piece /> : null
}
