import { render, screen } from '@testing-library/react'
import { Stage } from '../Stage'
import { useSite } from '@/lib/store'
import { makeProject } from '@/test/fixtures'

const projects = [makeProject({ slug: 'forgeos', title: 'ForgeOS', tagline: 'SDLC engine of orchestrated agents.', stack: ['TypeScript'] })]

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
