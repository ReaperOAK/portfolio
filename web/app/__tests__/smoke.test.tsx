import { render, screen } from '@testing-library/react'
import Page from '../page'

test('home page renders the name', () => {
  render(<Page />)
  expect(screen.getByText(/Owais Ahmed Khan/i)).toBeInTheDocument()
})
