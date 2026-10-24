import { create } from 'zustand'
import type { Tier } from './tier'

export type Lens = 'work' | 'soul'
export type UniverseId = 'blueprint' | 'nightride' | 'dastan' | 'campaign' | 'observatory'

export const LENSES: readonly Lens[] = ['work', 'soul']
export const UNIVERSE_IDS: readonly UniverseId[] = ['blueprint', 'nightride', 'dastan', 'campaign', 'observatory']

/** Lens chooses content. Universe chooses appearance. Neither setter touches the other — that is the design. */
interface SiteState {
  lens: Lens
  universe: UniverseId
  tier: Tier
  morphing: boolean
  /** Set by the first landing of a visit. The route's universe applies only if the visitor never chose one. */
  entered: boolean
  enter: (lens: Lens, universe: UniverseId) => void
  setLens: (l: Lens) => void
  setUniverse: (u: UniverseId) => void
  setTier: (t: Tier) => void
  setMorphing: (m: boolean) => void
  hydrate: () => void
}

// Storage can throw (private mode, blocked site data); persistence is a convenience, never a requirement.
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

function read<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const v = localStorage.getItem(key)
    if (v && (allowed as readonly string[]).includes(v)) return v as T
    if (v) localStorage.removeItem(key)
  } catch {}
  return null
}

export const useSite = create<SiteState>(set => ({
  lens: 'work',
  universe: 'blueprint',
  tier: 'reduced',
  morphing: false,
  entered: false,
  enter: (lens, universe) =>
    set(st => {
      save('site:lens', lens)
      if (st.entered) return { lens }
      const chosen = read('site:universe', UNIVERSE_IDS) ?? universe // a returning visitor keeps their world
      save('site:universe', chosen)
      return { lens, universe: chosen, entered: true }
    }),
  setLens: lens => (save('site:lens', lens), set({ lens })),
  setUniverse: universe => (save('site:universe', universe), set({ universe })),
  setTier: tier => set({ tier }),
  setMorphing: morphing => set({ morphing }),
  hydrate: () =>
    set({
      lens: read('site:lens', LENSES) ?? 'work',
      universe: read('site:universe', UNIVERSE_IDS) ?? 'blueprint',
    }),
}))
