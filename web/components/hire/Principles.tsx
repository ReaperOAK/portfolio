import Image from 'next/image'
import s from './Principles.module.css'

// Drawn from the public, NDA-safe résumé. No internal metrics, configs, vendors or product names.
const PRINCIPLES = [
  { title: 'Scale before launch day', body: 'Moved a single-box backend to a horizontally scaled, highly available setup with zero downtime, ahead of the traffic.' },
  { title: 'Fail closed where money moves', body: 'A credit ledger that stays correct under concurrent spend, replayed webhooks and payment providers failing halfway.' },
  { title: 'Shed load. Never hang.', body: 'Under a burst, the system answers fast with "try again shortly" instead of timing out and taking everything down with it.' },
  { title: 'Measure, then fix', body: 'Load-tested to find where it breaks, traced it to the real bottleneck, and took worst-case login from tens of seconds to under one.' },
]

export function Principles() {
  return (
    <section className={s.wrap} aria-labelledby="principles-title">
      <div className={s.pin}>
        <div className={s.photo}>
          <Image src="/media/portrait-desk.webp" alt="Owais at his desk" fill sizes="(max-width: 860px) 100vw, 40vw" />
        </div>
        <h2 id="principles-title" className={s.title}>How I build</h2>
      </div>
      <ol className={s.list}>
        {PRINCIPLES.map(p => (
          <li key={p.title} className={s.item}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
