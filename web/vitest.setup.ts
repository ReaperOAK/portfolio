import '@testing-library/jest-dom/vitest'

// jsdom ships no matchMedia. Default: no media query matches (motion allowed, light scheme).
// Tests that need reduced motion override window.matchMedia themselves.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({ matches: false, media: query, onchange: null, addEventListener() {}, removeEventListener() {},
       addListener() {}, removeListener() {}, dispatchEvent: () => false }) as MediaQueryList
}
