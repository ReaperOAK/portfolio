import { render, act } from '@testing-library/react'
import { Curtain, useMorphTo } from '../Curtain'
import { useSite } from '@/lib/store'

function Harness() {
  const morphTo = useMorphTo()
  return <button onClick={() => morphTo('nightride')}>go</button>
}

const realMatchMedia = window.matchMedia
afterEach(() => { window.matchMedia = realMatchMedia })
beforeEach(() => useSite.setState({ universe: 'blueprint', morphing: false }))

test('reduced motion swaps instantly and never enters the morphing state', async () => {
  window.matchMedia = (q: string) => ({ ...realMatchMedia(q), matches: true })
  const { getByText } = render(<><Curtain /><Harness /></>)
  await act(async () => getByText('go').click())
  expect(useSite.getState().universe).toBe('nightride')
  expect(useSite.getState().morphing).toBe(false)
})

test('a morph already in flight is ignored', async () => {
  useSite.setState({ morphing: true })
  const { getByText } = render(<><Curtain /><Harness /></>)
  await act(async () => getByText('go').click())
  expect(useSite.getState().universe).toBe('blueprint')
})

test('without the Web Animations API the swap still happens', async () => {
  const { getByText } = render(<><Curtain /><Harness /></>)
  await act(async () => getByText('go').click())
  expect(useSite.getState().universe).toBe('nightride')
  expect(useSite.getState().morphing).toBe(false)
})

test('the curtain is hidden from assistive tech', () => {
  const { container } = render(<Curtain />)
  expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
})
