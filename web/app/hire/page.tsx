import type { Metadata } from 'next'
import { preload } from 'react-dom'
import { loadProjects } from '@/lib/content/load'
import { Stage } from '@/components/Stage'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Hero } from '@/components/hire/Hero'
import { Proof } from '@/components/hire/Proof'
import { Reel } from '@/components/hire/Reel'
import { Principles } from '@/components/hire/Principles'
import { Career } from '@/components/hire/Career'
import { OffClock } from '@/components/hire/OffClock'
import { Contact } from '@/components/hire/Contact'
import s from './page.module.css'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan, Senior Developer',
  description: 'Senior Developer. Backends and the infrastructure under them: scale-out, fail-closed billing, load-shedding. 31 shipped projects.',
  openGraph: { images: ['/media/desk-poster.webp'] },
}

// The order a hiring manager should meet the work in. Everything else lands in the archive below.
const FEATURED = ['genai-media-platform', 'creator-marketplace', 'today-egg-rates', 'chesscodex', 'ticketvault', 'linearecta', 'cse-farewell-2025']

export default async function Hire() {
  preload('/media/desk-poster.webp', { as: 'image', fetchPriority: 'high' })
  const all = await loadProjects()
  const featured = FEATURED.map(slug => all.find(p => p.slug === slug)).filter(p => p !== undefined)
  const rest = all.filter(p => !FEATURED.includes(p.slug))
  return (
    <Entry lens="work" universe={defaultUniverseFor('/hire')}>
      <main>
        <Hero />
        <Proof />
        <Reel projects={featured} />
        <Principles />
        <Career />
        <section className={s.archive} aria-labelledby="archive-title">
          <h2 id="archive-title" className={s.title}>Everything else</h2>
          <p className={s.lede}>{rest.length} more, from hackathon weekends to tools I built for myself.</p>
          <Stage kind="project" records={rest} />
        </section>
        <OffClock />
        <Contact />
      </main>
    </Entry>
  )
}
