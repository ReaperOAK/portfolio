import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ThemeProvider } from '../contexts/ThemeContext'
import { VisitorProvider } from '../contexts/VisitorContext'

// Test wrapper with providers
const TestWrapper = ({ children, initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <VisitorProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </VisitorProvider>
  </MemoryRouter>
)

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has accessible navigation', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('handles theme toggle', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    // Look for theme toggle button (might be an icon or text)
    const themeToggle = screen.getByLabelText(/theme/i) || screen.getByRole('button', { name: /theme/i })
    if (themeToggle) {
      fireEvent.click(themeToggle)
      // Theme switching logic would be tested here
    }
  })
})
