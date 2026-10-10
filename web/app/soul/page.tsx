import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { preload } from 'react-dom'
import { loadPoems } from '@/lib/content/load'
import { personas } from '@/content/personas'
import { timeline } from '@/content/timeline'
import { Stage } from '@/components/Stage'
import { Signature } from '@/components/Signature'
import { Entry } from '@/components/Entry'
import { Film } from '@/components/Film'
import { defaultUniverseFor } from '@/lib/universe/css'
import s from '@/components/soul/Soul.module.css'

export const metadata: Metadata = {
  title: 'Owais Ahmed Khan, off the clock',
  description: 'Rider, shayar, strategist. The person behind the work.',
  openGraph: { images: ['/media/ride-poster.webp'] },
}

export default async function Soul() {
  preload('/media/ride-poster.webp', { as: 'image', fetchPriority: 'high' })
  const poems = await loadPoems()
  return (
    <Entry lens="soul" universe={defaultUniverseFor('/soul')}>
      <main>
        <header className={s.hero}>
          <Film className={s.film} src="/media/ride.mp4" poster="/media/ride-poster.webp" />
          <div className={s.heroCopy}>
            <h1 className={s.name}>Owais Ahmed Khan</h1>
            <p className={s.sub}>Rider, shayar, strategist. <em>Throttle open</em>, a notebook in the bag.</p>
          </div>
        </header>

        <Signature slot="afterHero" />

        <section className={s.interlude} aria-label="Why I ride">
          <Film className={s.film} src="/media/throttle.mp4" poster="/media/throttle-poster.webp" />
          <p className={s.quote}>When the mind is cluttered, <span>the throttle clears it.</span></p>
        </section>

        <section className={s.section} aria-labelledby="selves">
          <h2 id="selves" className={s.title}>The many of me</h2>
          <Stage kind="persona" records={personas} />
        </section>

        <section className={s.discipline} aria-labelledby="discipline">
          <div className={s.big}><Image src="/media/gym.webp" alt="A lifter mid-set, backlit in a dark gym" fill sizes="(max-width: 860px) 100vw, 58vw" /></div>
          <div className={s.disciplineCopy}>
            <h2 id="discipline" className={s.title}>Reps</h2>
            <p>Discipline builds strength. Whether in body or in code, consistency compounds results.</p>
          </div>
          <div className={s.small}><Image src="/media/chalk.webp" alt="Chalked hands gripping a loaded barbell" fill sizes="(max-width: 860px) 100vw, 42vw" /></div>
        </section>

        {poems.length > 0 && (
          <section className={s.section} aria-labelledby="poems">
            <h2 id="poems" className={s.title}>Shayari</h2>
            <Stage kind="poem" records={poems} />
          </section>
        )}

        <section className={s.section} aria-labelledby="road">
          <h2 id="road" className={s.title}>The road so far</h2>
          <Stage kind="timelineEntry" records={timeline} />
        </section>

        <section className={s.close} aria-label="Back to the work">
          <Link href="/hire" className={s.back}>See the work</Link>
        </section>
      </main>
    </Entry>
  )
}
