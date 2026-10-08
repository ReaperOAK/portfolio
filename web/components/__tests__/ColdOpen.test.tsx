import { render, screen, fireEvent, act } from '@testing-library/react'
import { ColdOpen } from '../ColdOpen'

beforeEach(() => localStorage.clear())

test('the fork is two real links from the first frame', () => {
  render(<ColdOpen />)
  expect(screen.getByRole('link', { name: /see the work/i })).toHaveAttribute('href', '/hire')
  expect(screen.getByRole('link', { name: /meet the person/i })).toHaveAttribute('href', '/soul')
  expect(screen.getByRole('heading', { level: 1, name: 'Owais Ahmed Khan' })).toBeInTheDocument()
})

test('any key skips to the final frame and remembers the visitor', () => {
  render(<ColdOpen />)
  expect(screen.getByTestId('cold-open')).toHaveAttribute('data-playing', 'true')
  act(() => { fireEvent.keyDown(window, { key: 'ArrowDown' }) })
  expect(screen.getByTestId('cold-open')).toHaveAttribute('data-playing', 'false')
  expect(localStorage.getItem('site:coldOpenSeen')).toBe('1')
})

test('nothing hides the scene from assistive tech', () => {
  const { container } = render(<ColdOpen />)
  expect(container.querySelector('[aria-hidden="true"] a, [inert]')).toBeNull()
})
