import type { Metadata } from 'next'
import { loadPoems } from '@/lib/content/load'
import { personas } from '@/content/personas'
import { timeline } from '@/content/timeline'
import { Stage } from '@/components/Stage'
import { Signature } from '@/components/Signature'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Page, Hero, Section } from '@/components/Page'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan, off the clock',
  description: 'Rider, shayar, strategist. The person behind the work.',
}

export default async function Soul() {
  const poems = await loadPoems()
  return (
    <Entry lens="soul" universe={defaultUniverseFor('/soul')}>
    <Page>
      <Hero
        eyebrow="[ Soul ] Kolkata, after dark"
        title="Owais Ahmed Khan"
        line={<><strong>Rider. Shayar. Strategist.</strong> When the mind is cluttered, the throttle clears it.</>}
        chips={['Hero Xtreme 125R', 'Shayari since Class 8', 'Chess & strategy', 'Lifting']}
      />
      <Signature slot="afterHero" />
      <Section id="selves" title="The many of me" count={`${personas.length} selves`}>
        <Stage kind="persona" records={personas} />
      </Section>
      {poems.length > 0 && (
        <Section id="poems" title="Shayari" count={`${poems.length} verses`}>
          <Stage kind="poem" records={poems} />
        </Section>
      )}
      <Section id="road" title="The road so far">
        <Stage kind="timelineEntry" records={timeline} />
      </Section>
    </Page>
    </Entry>
  )
}
