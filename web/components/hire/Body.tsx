import type { Project } from '@/lib/content/types'
import { Stage } from '@/components/Stage'
import { Reel } from './Reel'
import { Principles } from './Principles'
import { Career } from './Career'
import { OffClock } from './OffClock'
import { Contact } from './Contact'
import s from './Body.module.css'

// The order a hiring manager should meet the work in. Everything else lands in the archive.
const FEATURED = ['genai-media-platform', 'creator-marketplace', 'today-egg-rates', 'chesscodex', 'ticketvault', 'linearecta', 'cse-farewell-2025']

// Kept as /work pages, left out of the archive: tutorial-level builds undercut a senior pitch.
const UNLISTED = ['simple-responsive-navigation-bar', 'react-weather-app', 'vanillajs-weather-app', 'spotify-ui-clone', 'simon-says-game', 'university-python-scripts-sem-3', 'portfolio-website']

/** Everything below a hero: shared by /hire (under the film) and / (under the cold open). */
export function Body({ projects }: { projects: Project[] }) {
  const featured = FEATURED.map(slug => projects.find(p => p.slug === slug)).filter(p => p !== undefined)
  const rest = projects.filter(p => !FEATURED.includes(p.slug) && !UNLISTED.includes(p.slug))
  return (
    <>
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
