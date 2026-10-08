import type { Metadata } from 'next'
import { loadProjects } from '@/lib/content/load'
import { timeline } from '@/content/timeline'
import { Stage } from '@/components/Stage'
import { Signature } from '@/components/Signature'
import { SetEntry } from '@/components/SetEntry'
import s from './page.module.css'

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
    <main className={s.page}>
      <SetEntry lens="work" universe="blueprint" />
      <header className={s.hero}>
        <p className={s.eyebrow}>[ Work ] Kolkata, India</p>
        <h1 className={s.name}>Owais Ahmed Khan</h1>
        <p className={s.line}>
          <strong>Senior Developer.</strong> I build the backend and the infrastructure under it, then I carry the pager for it.
        </p>
        <ul className={s.chips}>
          {['Backend & infrastructure', 'Generative-AI systems', 'TypeScript · Python · Java', 'B.Tech 2027'].map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </header>

      <section className={s.section} aria-labelledby="systems">
        <div className={s.head}>
          <h2 id="systems" className={s.title}>Selected systems</h2>
          <span className={s.count}>{projects.length} records</span>
        </div>
        <Stage kind="project" records={projects} />
        <Signature slot="afterList" />
      </section>

      <section className={s.section} aria-labelledby="timeline">
        <div className={s.head}>
          <h2 id="timeline" className={s.title}>Timeline</h2>
        </div>
        <Stage kind="timelineEntry" records={timeline} />
      </section>
    </main>
  )
}
