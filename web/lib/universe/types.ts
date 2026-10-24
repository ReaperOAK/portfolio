import type { FC } from 'react'
import type { ContentKind, RecordFor } from '@/lib/content/types'
import type { Lens, UniverseId } from '@/lib/store'

export interface TokenSet {
  bg: string; bg2: string; fg: string; dim: string
  accent: string; accent2: string; line: string
  radius: string; tracking: string
  display: string; body: string; mono: string
  displayWeight: string; displayStretch: string
}

export interface CurtainSpec {
  background: string
  durationIn: number
  durationOut: number
  easing: string
}

/** Receives every record of its kind plus the active lens. Lens may reorder or filter; it may not restyle. */
export type Renderer<K extends ContentKind = ContentKind> = FC<{ records: RecordFor<K>[]; lens: Lens }>

export type StageSlot = 'loader' | 'afterHero' | 'afterList' | 'footer'

export interface Universe {
  id: UniverseId
  name: string
  origin: string
  tokens: TokenSet
  curtain: CurtainSpec
  /** TOTAL: omitting any ContentKind is a compile error. */
  renderers: { [K in ContentKind]: Renderer<K> }
  /** PARTIAL: additive only. No content may be reachable solely through these. */
  signature?: Partial<Record<StageSlot, FC>>
}
