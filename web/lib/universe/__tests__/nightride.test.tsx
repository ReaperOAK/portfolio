import { render, screen } from '@testing-library/react'
import { nightride } from '../nightride'
import { blueprint } from '../blueprint'
import { Tacho } from '../nightride/signature'
import { useSite } from '@/lib/store'
import { makeProject } from '@/test/fixtures'

const projects = [makeProject({ slug: 'ticketvault', title: 'TicketVault', tagline: 'NFT ticketing.', stack: ['Aptos'] })]

test('renders the same records as blueprint', () => {
  for (const u of [blueprint, nightride]) {
    const R = u.renderers.project
    const { unmount } = render(<R records={projects} lens="work" />)
    expect(screen.getByText('TicketVault')).toBeInTheDocument()
    expect(screen.getByText('NFT ticketing.')).toBeInTheDocument()
    unmount()
  }
})

test('declares a distinct look from blueprint', () => {
  expect(nightride.tokens.accent).not.toBe(blueprint.tokens.accent)
  expect(nightride.curtain.background).not.toBe(blueprint.curtain.background)
})

test('the tacho is absent at the static tier and decorative otherwise', () => {
  useSite.setState({ tier: 'static' })
  const { container, unmount } = render(<Tacho />)
  expect(container).toBeEmptyDOMElement()
  unmount()
  useSite.setState({ tier: 'full' })
  const { container: c2 } = render(<Tacho />)
  expect(c2.firstElementChild).toHaveAttribute('aria-hidden', 'true')
})
