import { render } from '@testing-library/react'
import { UniverseProvider } from '../UniverseProvider'
import { useSite } from '@/lib/store'

beforeEach(() => useSite.setState({ universe: 'blueprint', lens: 'work' }))

test('writes the active universe tokens onto the root element', () => {
  render(<UniverseProvider><div /></UniverseProvider>)
  expect(document.documentElement.style.getPropertyValue('--u-accent')).toBe('#0E7C86')
  expect(document.documentElement.dataset.universe).toBe('blueprint')
})
