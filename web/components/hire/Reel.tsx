import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/content/types'
import s from './Reel.module.css'

export function Reel({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className={s.reel} aria-labelledby="work-title"
      style={{ ['--pan' as string]: `${Math.max(projects.length * 60 - 100, 0)}vw` }}>
      <div className={s.stage}>
        <div className={s.head}>
          <h2 id="work-title" className={s.title}>Selected work</h2>
          <p className={s.lede}>Two systems I run at my day job, and the ones I built before it that are still live.</p>
        </div>
        <div className={s.track}>
          {projects.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} className={s.card}>
              <div className={s.frame}>
                {p.cover
                  ? <Image src={p.cover} alt={`${p.title}${p.nda ? '' : ', live site'}`} fill sizes="(max-width: 768px) 72vw, 58vw"
                      loading="eager" fetchPriority="low" /> /* lazy never fires for cards translated off-screen inside the panned track */
                  : <div className={s.type} aria-hidden="true"><span className={s.typeWord}>{p.title}</span></div>}
              </div>
              <div className={s.meta}>
                <h3 className={s.name}>{p.title}</h3>
                <span className={s.year}>{p.period}</span>
                <p className={s.what}>{p.tagline}</p>
                {p.metrics[0] && <span className={s.fig}>{p.metrics[0].value} {p.metrics[0].label}</span>}
                {p.nda && <span className={s.nda}>Day job. Under NDA, so shape rather than specifics.</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
