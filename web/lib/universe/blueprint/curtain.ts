import type { CurtainSpec } from '../types'

/** Wipes in as a drafting grid. */
export const curtain: CurtainSpec = {
  background: 'repeating-linear-gradient(90deg,#4FD1C5 0 2px,transparent 2px 26px)',
  durationIn: 460, durationOut: 520, easing: 'cubic-bezier(.7,0,.3,1)',
}
