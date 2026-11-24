import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectArchive } from '../hire/ProjectArchive'
import { useSite } from '@/lib/store'
import { makeProject } from '@/test/fixtures'

const mockProjects = [
  makeProject({
    slug: 'claimswarm',
    title: 'ClaimSwarm',
    tagline: 'Multi-agent consensus network for high-stakes claim processing.',
    stack: ['Python', 'LangChain', 'FastAPI'],
  }),
  makeProject({
    slug: 'hackinhills',
    title: 'AIRLOCK',
    tagline: 'Zero-trust adversarial AI testing sandbox with cryptographic audit ledgers.',
    stack: ['Python', 'Docker', 'gVisor', 'Linux'],
  }),
  makeProject({
    slug: 'festify',
    title: 'Festify',
    tagline: 'Real-time, full-stack platform for college festivals with live socket updates.',
    stack: ['React', 'Node.js', 'MongoDB'],
  }),
]

beforeEach(() => {
  useSite.setState({ universe: 'blueprint', lens: 'work', entered: true })
})

test('renders all category tabs and total project counts', () => {
  render(<ProjectArchive projects={mockProjects} />)

  expect(screen.getByRole('tab', { name: /all projects/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /ai & agents/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /systems & security/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /full-stack/i })).toBeInTheDocument()

  // Default renders all 3 projects
  expect(screen.getByText('ClaimSwarm')).toBeInTheDocument()
  expect(screen.getByText('AIRLOCK')).toBeInTheDocument()
  expect(screen.getByText('Festify')).toBeInTheDocument()
})

test('filters projects by search query', () => {
  render(<ProjectArchive projects={mockProjects} />)

  const input = screen.getByLabelText(/filter projects/i)
  fireEvent.change(input, { target: { value: 'Docker' } })

  // Only AIRLOCK matches Docker in stack
  expect(screen.getByText('AIRLOCK')).toBeInTheDocument()
  expect(screen.queryByText('ClaimSwarm')).not.toBeInTheDocument()
  expect(screen.queryByText('Festify')).not.toBeInTheDocument()
})

test('filters projects by category tab click', () => {
  render(<ProjectArchive projects={mockProjects} />)

  const aiTab = screen.getByRole('tab', { name: /ai & agents/i })
  fireEvent.click(aiTab)

  expect(screen.getByText('ClaimSwarm')).toBeInTheDocument()
  expect(screen.queryByText('AIRLOCK')).not.toBeInTheDocument()
  expect(screen.queryByText('Festify')).not.toBeInTheDocument()
})

test('shows empty state when no projects match query and resets correctly', () => {
  render(<ProjectArchive projects={mockProjects} />)

  const input = screen.getByLabelText(/filter projects/i)
  fireEvent.change(input, { target: { value: 'nonexistent-query-string-xyz' } })

  expect(screen.getByText(/no matching projects found/i)).toBeInTheDocument()

  const resetBtn = screen.getByRole('button', { name: /reset filters & show all projects/i })
  fireEvent.click(resetBtn)

  expect(screen.getByText('ClaimSwarm')).toBeInTheDocument()
  expect(screen.getByText('AIRLOCK')).toBeInTheDocument()
  expect(screen.getByText('Festify')).toBeInTheDocument()
})
