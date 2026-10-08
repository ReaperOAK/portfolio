import { render, screen } from '@testing-library/react'
import { blueprint } from '../blueprint'
import type { Project } from '@/lib/content/types'

const projects: Project[] = [{
  slug: 'ticketvault', title: 'TicketVault', tagline: 'NFT ticketing.', stack: ['Aptos'], role: 'Lead',
  period: '2025', metrics: [{ value: '3', label: 'dApps' }], decisions: ['Relayer sponsors gas.'],
  devlogs: [], links: {}, nda: false,
}]

test('renders every project title', () => {
  const R = blueprint.renderers.project
  render(<R records={projects} lens="work" />)
  expect(screen.getByText('TicketVault')).toBeInTheDocument()
})

test('renders identical content under either lens', () => {
  const R = blueprint.renderers.project
  const { container, unmount } = render(<R records={projects} lens="work" />)
  const work = container.textContent
  unmount()
  const { container: soul } = render(<R records={projects} lens="soul" />)
  expect(soul.textContent).toBe(work)
})

test('signature pieces render without throwing', () => {
  for (const Piece of Object.values(blueprint.signature ?? {})) render(<Piece />)
})
