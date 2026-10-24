import Image from 'next/image'
import s from './Principles.module.css'

// General engineering opinions only. Nothing here describes work done for an employer (employer rule).
const PRINCIPLES = [
  { title: 'Measure, then fix', body: 'Find where it actually breaks before changing anything, then fix that bottleneck instead of adding more of everything.' },
  { title: 'Fail loudly, recover quietly', body: 'Errors should be obvious to whoever is on call and invisible to the people using the thing.' },
  { title: 'Boring where it counts', body: 'Well-understood tools for the foundations; spend the novelty budget only where it earns its keep.' },
  { title: 'Leave it deployable', body: 'Small steps, always shippable, so the next change is never a scary one.' },
]

export function Principles() {
  return (
    <section className={s.wrap} aria-labelledby="principles-title">
      <div className={s.pin}>
        <h2 id="principles-title" className={s.title}>How I build</h2>
        <div className={s.photo}>
          <Image src="/media/portrait-desk.webp" alt="Owais at his desk" fill sizes="(max-width: 860px) 100vw, 40vw" />
        </div>
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
