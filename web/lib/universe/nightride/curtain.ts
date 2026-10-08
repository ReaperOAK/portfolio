import type { CurtainSpec } from '../types'

/** A headlight sweep: sodium amber with a white-hot core. */
export const curtain: CurtainSpec = {
  background: 'linear-gradient(100deg,transparent 0%,#FF8A3D 42%,#FFF4E6 50%,#FF8A3D 58%,transparent 100%)',
  durationIn: 420, durationOut: 560, easing: 'cubic-bezier(.8,0,.2,1)',
}
