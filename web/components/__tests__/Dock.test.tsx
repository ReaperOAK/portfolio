import { render, screen, act } from '@testing-library/react'
import { LensSwitch, UniverseRail } from '../Dock'
import { useSite } from '@/lib/store'

beforeEach(() => useSite.setState({ lens: 'work', universe: 'blueprint', morphing: false }))

test('lens switch marks the current lens as the current page', () => {
  render(<LensSwitch />)
  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page')
  expect(screen.getByRole('link', { name: 'Soul' })).not.toHaveAttribute('aria-current')
  expect(screen.getByRole('link', { name: 'Soul' })).toHaveAttribute('href', '/soul')
})

test('universe rail lists every shipped universe as a labelled toggle', () => {
  render(<UniverseRail />)
  expect(screen.getByRole('button', { name: 'Blueprint' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Nightride' })).toHaveAttribute('aria-pressed', 'false')
})

test('choosing a universe leaves the lens untouched', async () => {
  render(<UniverseRail />)
  await act(async () => screen.getByRole('button', { name: 'Nightride' }).click())
  expect(useSite.getState().universe).toBe('nightride')
  expect(useSite.getState().lens).toBe('work')
})

test('the rail is disabled mid-morph', () => {
  useSite.setState({ morphing: true })
  render(<UniverseRail />)
  for (const b of screen.getAllByRole('button')) expect(b).toBeDisabled()
})
