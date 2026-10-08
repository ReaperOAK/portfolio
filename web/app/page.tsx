import { loadProjects } from '@/lib/content/load'
import { ColdOpen } from '@/components/ColdOpen'
import { Stage } from '@/components/Stage'
import { Page, Section } from '@/components/Page'
import Link from 'next/link'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'

// The fork is a URL, not a door: / never gates anything. Scroll past the scene and the work is already here.
export default async function Home() {
  const featured = (await loadProjects())
    .sort((a, b) => Number(b.nda) - Number(a.nda) || Number(!!b.links.live) - Number(!!a.links.live))
    .slice(0, 6)
  return (
    <Entry lens="work" universe={defaultUniverseFor('/')}>
      <ColdOpen />
      <Page>
        <Section id="lately" title="Lately" count="6 of many">
          <Stage kind="project" records={featured} />
          <p><Link href="/hire">All the work →</Link> · <Link href="/soul">The person behind it →</Link></p>
        </Section>
      </Page>
    </Entry>
  )
}
