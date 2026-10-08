import type { Universe } from '../types'
import { tokens } from './tokens'
import { curtain } from './curtain'
import { renderers } from './renderers'
import { Tacho } from './signature'

export const nightride: Universe = {
  id: 'nightride',
  name: 'Nightride',
  origin: 'the Hero Xtreme 125R',
  tokens, curtain, renderers,
  signature: { afterHero: Tacho },
}
