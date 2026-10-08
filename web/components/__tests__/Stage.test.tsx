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

test("before the visit is entered, Stage renders the route's universe — what the server rendered", async () => {
  const { renderToString } = await import('react-dom/server')
  const { Entry } = await import('../Entry')
  useSite.setState({ universe: 'blueprint', entered: false })
  const html = renderToString(<Entry lens="soul" universe="nightride"><Stage kind="project" records={projects} /></Entry>)
  expect(html).toMatch(/board/) // Nightride's speed board, not Blueprint's spec sheet
  expect(html).not.toMatch(/__list/)
})
