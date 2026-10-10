import Image from 'next/image'
import Link from 'next/link'
import s from './OffClock.module.css'

export function OffClock() {
  return (
    <section className={s.scene} aria-labelledby="offclock-title">
      <div className={s.bg} aria-hidden="true">
        <Image src="/media/rain.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={s.copy}>
        <h2 id="offclock-title" className={s.line}>
          Off the clock: a <em>125R</em> on wet Kolkata roads, a notebook of shayari, and a barbell.
        </h2>
        <Link href="/soul" className={s.link}>Meet the person behind the work</Link>
      </div>
    </section>
  )
}
