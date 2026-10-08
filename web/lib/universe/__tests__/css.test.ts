import { universeCss, bootScript, defaultUniverseFor } from '../css'

test('emits a token rule for every shipped universe', () => {
  const css = universeCss()
  expect(css).toContain(':root[data-universe="blueprint"]{--u-bg:#F2F4F2')
  expect(css).toContain(':root[data-universe="nightride"]{--u-bg:#07070A')
})

test('route defaults', () => {
  expect(defaultUniverseFor('/soul')).toBe('nightride')
  expect(defaultUniverseFor('/hire')).toBe('blueprint')
})

test('boot script: persisted choice wins, garbage falls back to the route default', () => {
  const run = (path: string) => { window.history.replaceState(null, '', path); new Function(bootScript())(); return document.documentElement.dataset.universe }
  localStorage.clear()
  expect(run('/soul')).toBe('nightride')
  localStorage.setItem('site:universe', 'blueprint')
  expect(run('/soul')).toBe('blueprint')
  localStorage.setItem('site:universe', '"><script>')
  expect(run('/soul')).toBe('nightride')
})
