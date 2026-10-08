import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { loadProject, loadProjects } from '@/lib/content/load'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Page, Hero, Section } from '@/components/Page'
import s from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await loadProjects()).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await loadProject((await params).slug)
  return p ? { title: `${p.title} — Owais Ahmed Khan`, description: p.tagline } : {}
}

// ponytail: one neutral layout styled only through tokens. Universe-specific case studies are sub-project B.
export default async function Project({ params }: Props) {
  const p = await loadProject((await params).slug)
  if (!p) notFound()
  return (
    <Entry lens="work" universe={defaultUniverseFor('/hire')}>
    <Page>
      <p><Link href="/hire" className={s.back}>← All work</Link></p>
      <Hero eyebrow={`[ ${p.role} ] ${p.period}`} title={p.title} line={p.tagline} chips={p.stack} />
      {p.body && <Section id="about" title="What it is"><p className={s.body}>{p.body}</p></Section>}
      {p.nda && <p className={s.nda}>Day-job work under NDA. Architecture and specifics stay with the employer.</p>}
      {p.decisions.length > 0 && (
        <Section id="decisions" title="Decisions">
          <ul className={s.list}>{p.decisions.map(d => <li key={d}>{d}</li>)}</ul>
        </Section>
      )}
      {p.devlogs.length > 0 && (
        <Section id="log" title="Build log">
          <ol className={s.list}>{p.devlogs.map(d => <li key={d}>{d}</li>)}</ol>
        </Section>
      )}
      {(p.links.github || p.links.live) && (
        <div className={s.links}>
          {p.links.live && <a href={p.links.live} rel="noopener">Live site ↗</a>}
          {p.links.github && <a href={p.links.github} rel="noopener">Source ↗</a>}
        </div>
      )}
    </Page>
    </Entry>
  )
}
