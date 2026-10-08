import type { ReactNode } from 'react'
import type { Universe } from '../types'
import s from './renderers.module.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** One spec-sheet row. Every content kind maps onto these four cells. */
function Row({ idx, title, sub, note, metric, verse }: {
  idx: string; title: string; sub: string; note?: ReactNode; metric?: string; verse?: boolean
}) {
  return (
    <article className={s.row}>
      <span className={s.idx}>{idx}</span>
      <div>
        <h3 className={s.title}>{title}</h3>
        <p className={verse ? `${s.sub} ${s.verse}` : s.sub}>{sub}</p>
      </div>
      {note ? <p className={s.note}>{note}</p> : <span />}
      {metric ? <span className={s.metric}>{metric}</span> : <span />}
    </article>
  )
}

export const renderers: Universe['renderers'] = {
  project: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => (
        <Row key={p.slug} idx={pad(i)} title={p.title} sub={p.tagline}
          note={p.decisions[0] ?? p.stack.join(' · ')} metric={p.metrics[0]?.value ?? p.period} />
      ))}
    </div>
  ),
  poem: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => <Row key={p.slug} idx={pad(i)} title={p.slug} sub={p.body} note={p.mood} metric={p.lang} verse />)}
    </div>
  ),
  timelineEntry: ({ records }) => (
    <div className={s.list}>
      {records.map(e => <Row key={e.year + e.title} idx={e.year} title={e.title} sub={e.body} />)}
    </div>
  ),
  persona: ({ records }) => (
    <div className={s.list}>
      {records.map((p, i) => <Row key={p.slug} idx={pad(i)} title={p.title} sub={p.description} />)}
    </div>
  ),
}
