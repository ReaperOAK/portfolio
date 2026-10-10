import type { Project } from '@/lib/content/types'
import { Stage } from '@/components/Stage'
import { Proof } from './Proof'
import { Reel } from './Reel'
import { Principles } from './Principles'
import { Career } from './Career'
import { OffClock } from './OffClock'
import { Contact } from './Contact'
import s from './Body.module.css'

// The order a hiring manager should meet the work in. Everything else lands in the archive.
const FEATURED = ['genai-media-platform', 'creator-marketplace', 'today-egg-rates', 'chesscodex', 'ticketvault', 'linearecta', 'cse-farewell-2025']

/** Everything below a hero: shared by /hire (under the film) and / (under the cold open). */
export function Body({ projects }: { projects: Project[] }) {
  const featured = FEATURED.map(slug => projects.find(p => p.slug === slug)).filter(p => p !== undefined)
  const rest = projects.filter(p => !FEATURED.includes(p.slug))
  return (
    <>
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
    </>
  )
}
