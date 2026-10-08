import type { Universe } from '../types'
import { tokens } from './tokens'
import { curtain } from './curtain'
import { renderers } from './renderers'
import { MetricPlate } from './signature'

export const blueprint: Universe = {
  id: 'blueprint',
  name: 'Blueprint',
  origin: 'the engineer',
  tokens, curtain, renderers,
  signature: { afterList: MetricPlate },
}
