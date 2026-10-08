import type { Metadata } from 'next'
import { loadProjects } from '@/lib/content/load'
import { timeline } from '@/content/timeline'
import { Stage } from '@/components/Stage'
import { Signature } from '@/components/Signature'
import { SetEntry } from '@/components/SetEntry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Page, Hero, Section } from '@/components/Page'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan — Work',
  description: 'Senior Developer. Backend and infrastructure, generative-AI systems, full-stack product.',
}

export default async function Hire() {
  // ponytail: day job first, then anything live, then the rest. Real curation is sub-project B.
  const projects = (await loadProjects()).sort(
    (a, b) => Number(b.nda) - Number(a.nda) || Number(!!b.links.live) - Number(!!a.links.live),
  )
  return (
    <Page>
      <SetEntry lens="work" universe={defaultUniverseFor('/hire')} />
      <Hero
        eyebrow="[ Work ] Kolkata, India"
        title="Owais Ahmed Khan"
        line={<><strong>Senior Developer.</strong> I build the backend and the infrastructure under it, then I carry the pager for it.</>}
        chips={['Backend & infrastructure', 'Generative-AI systems', 'TypeScript · Python · Java', 'B.Tech 2027']}
      />
      <Signature slot="afterHero" />
      <Section id="systems" title="Selected systems" count={`${projects.length} records`}>
        <Stage kind="project" records={projects} />
        <Signature slot="afterList" />
      </Section>
      <Section id="timeline" title="Timeline">
        <Stage kind="timelineEntry" records={timeline} />
      </Section>
    </Page>
  )
}
