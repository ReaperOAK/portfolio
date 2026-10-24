import { render, screen } from '@testing-library/react'
import { blueprint } from '../blueprint'
import { makeProject } from '@/test/fixtures'

const projects = [makeProject({ slug: 'ticketvault', title: 'TicketVault', tagline: 'NFT ticketing.', stack: ['Aptos'], metrics: [{ value: '3', label: 'dApps' }], decisions: ['Relayer sponsors gas.'] })]

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

test('project titles link to their detail page in every universe', async () => {
  const { UNIVERSES, REGISTERED } = await import('../registry')
  for (const id of REGISTERED) {
    const R = UNIVERSES[id].renderers.project
    const { unmount } = render(<R records={projects} lens="work" />)
    expect(screen.getByRole('link', { name: 'TicketVault' })).toHaveAttribute('href', '/work/ticketvault')
    unmount()
  }
})
