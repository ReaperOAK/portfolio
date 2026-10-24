export type Tier = 'full' | 'reduced' | 'static'

export interface TierInputs {
  deviceMemory: number
  hardwareConcurrency: number
  webgl: boolean
  saveData: boolean
  reducedMotion: boolean
}

/** Unknown capability means `reduced`, never `full`: a stutter costs more than a missing effect. */
export function detectTier(i: Partial<TierInputs> = {}): Tier {
  if (i.reducedMotion || i.saveData) return 'static'
  if (i.deviceMemory === undefined || i.hardwareConcurrency === undefined || i.webgl === undefined) return 'reduced'
  if (!i.webgl || i.deviceMemory < 4 || i.hardwareConcurrency < 4) return 'reduced'
  return 'full'
}

export function probe(): Partial<TierInputs> {
  if (typeof window === 'undefined') return {}
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  let webgl = false
  try {
    webgl = !!document.createElement('canvas').getContext('webgl2')
  } catch {
    webgl = false
  }
  return {
    // Safari and Firefox do not expose deviceMemory; assume a mid device rather than block the scene.
    deviceMemory: nav.deviceMemory ?? 4,
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    webgl,
    saveData: nav.connection?.saveData ?? false,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}
