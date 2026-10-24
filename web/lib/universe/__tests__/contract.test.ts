import { UNIVERSES, REGISTERED, resolve } from '../registry'
import type { ContentKind } from '@/lib/content/types'

const KINDS: ContentKind[] = ['project', 'poem', 'timelineEntry', 'persona']

test('every registered universe implements every content kind', () => {
  for (const id of REGISTERED)
    for (const kind of KINDS)
      expect(UNIVERSES[id].renderers[kind], `${id} missing ${kind}`).toBeTypeOf('function')
})

test('every registered universe declares tokens and a curtain', () => {
  for (const id of REGISTERED) {
    expect(UNIVERSES[id].tokens.bg).toMatch(/^#/)
    expect(UNIVERSES[id].tokens.accent).toMatch(/^#/)
    expect(UNIVERSES[id].curtain.background).toBeTruthy()
  }
})

test('an unshipped universe resolves to blueprint', () => {
  expect(resolve('observatory').id).toBe('blueprint')
})
