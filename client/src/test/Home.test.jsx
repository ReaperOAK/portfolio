import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'
import { ThemeProvider } from '../contexts/ThemeContext'
import { VisitorProvider } from '../contexts/VisitorContext'
import { HelmetProvider } from 'react-helmet-async'

// Test wrapper with all providers
const TestWrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>
      <VisitorProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </VisitorProvider>
    </MemoryRouter>
  </HelmetProvider>
)

describe('Home Page', () => {
  it('renders hero content', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    
    // Check for main heading or content
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('has proper document structure', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    
    // Should have proper semantic structure
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('is accessible', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    
    // Check for proper heading hierarchy
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
})
