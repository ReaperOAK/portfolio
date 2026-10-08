import { useSite } from '../store'

beforeEach(() => {
  localStorage.clear()
  useSite.setState({ lens: 'work', universe: 'blueprint', tier: 'reduced', morphing: false })
})

test('defaults to work lens and blueprint universe', () => {
  expect(useSite.getState().lens).toBe('work')
  expect(useSite.getState().universe).toBe('blueprint')
})

test('changing lens does not change universe', () => {
  useSite.getState().setLens('soul')
  expect(useSite.getState().universe).toBe('blueprint')
})

test('changing universe does not change lens', () => {
  useSite.getState().setUniverse('nightride')
  expect(useSite.getState().lens).toBe('work')
})

test('lens and universe persist', () => {
  useSite.getState().setLens('soul')
  useSite.getState().setUniverse('nightride')
  expect(localStorage.getItem('site:lens')).toBe('soul')
  expect(localStorage.getItem('site:universe')).toBe('nightride')
})

test('hydrate rejects a corrupt persisted universe and clears the key', () => {
  localStorage.setItem('site:universe', 'atlantis')
  useSite.getState().hydrate()
  expect(useSite.getState().universe).toBe('blueprint')
  expect(localStorage.getItem('site:universe')).toBeNull()
})

test('hydrate restores valid persisted values', () => {
  localStorage.setItem('site:lens', 'soul')
  localStorage.setItem('site:universe', 'nightride')
  useSite.getState().hydrate()
  expect(useSite.getState().lens).toBe('soul')
  expect(useSite.getState().universe).toBe('nightride')
})
