import { detectTier } from '../tier'

const base = { deviceMemory: 8, hardwareConcurrency: 8, webgl: true, saveData: false, reducedMotion: false }

test('capable device gets full', () => expect(detectTier(base)).toBe('full'))
test('reduced motion forces static', () => expect(detectTier({ ...base, reducedMotion: true })).toBe('static'))
test('save-data forces static', () => expect(detectTier({ ...base, saveData: true })).toBe('static'))
test('no webgl falls to reduced', () => expect(detectTier({ ...base, webgl: false })).toBe('reduced'))
test('low memory falls to reduced', () => expect(detectTier({ ...base, deviceMemory: 2 })).toBe('reduced'))
test('unknown capabilities default to reduced, not full', () => expect(detectTier({})).toBe('reduced'))
