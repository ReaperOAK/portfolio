import { render, screen } from '@testing-library/react'
import { Stage } from '../Stage'
import { useSite } from '@/lib/store'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'forgeos', title: 'ForgeOS', tagline: 'SDLC engine of orchestrated agents.', stack: ['TypeScript'],
  role: 'Solo', period: '2025', metrics: [], decisions: [], devlogs: [], links: {}, nda: false,
}]

beforeEach(() => useSite.setState({ universe: 'blueprint', lens: 'work' }))

test('renders records through the active universe', () => {
  render(<Stage kind="project" records={projects} />)
  expect(screen.getByText('ForgeOS')).toBeInTheDocument()
})

test('an unshipped universe still renders all content', () => {
  useSite.setState({ universe: 'observatory' })
  render(<Stage kind="project" records={projects} />)
  expect(screen.getByText('ForgeOS')).toBeInTheDocument()
})
