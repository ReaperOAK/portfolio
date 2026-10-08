import type { Universe } from '../types'
import s from './renderers.module.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')

/** One lap on the board. Uppercase comes from CSS: the content strings stay identical to every other universe. */
function Row({ idx, title, sub, metric, verse }: { idx: string; title: string; sub: string; metric?: string; verse?: boolean }) {
  return (
    <article className={s.row}>
      <span className={s.idx}>{idx}</span>
      <div>
        <h3 className={s.title}>{title}</h3>
        <p className={verse ? s.verse : s.sub}>{sub}</p>
      </div>
      {metric ? <span className={s.metric}>{metric}</span> : <span />}
    </article>
  )
}

export const renderers: Universe['renderers'] = {
  project: ({ records }) => (
    <div className={s.board}>
      {records.map((p, i) => (
        <Row key={p.slug} idx={pad(i)} title={p.title} sub={p.tagline} metric={p.metrics[0]?.value ?? p.period} />
      ))}
    </div>
  ),
  poem: ({ records }) => (
    <div className={s.board}>
      {records.map((p, i) => <Row key={p.slug} idx={pad(i)} title={p.slug} sub={p.body} metric={p.mood} verse />)}
    </div>
  ),
  timelineEntry: ({ records }) => (
    <div className={s.board}>
      {records.map(e => <Row key={e.year + e.title} idx={e.year.slice(2)} title={e.title} sub={e.body} metric={e.year} />)}
    </div>
  ),
  persona: ({ records }) => (
    <div className={s.board}>
      {records.map((p, i) => <Row key={p.slug} idx={pad(i)} title={p.title} sub={p.description} />)}
    </div>
  ),
}
