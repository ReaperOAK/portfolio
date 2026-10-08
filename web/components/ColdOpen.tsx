'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import s from './ColdOpen.module.css'

const SEEN = 'site:coldOpenSeen'
const LENGTH_MS = 6400

/** ~6s scene that resolves into the fork. Any scroll, key or click jumps to the final frame. Plays once per visitor.
 *  The doors are real links in the DOM from the first frame; only their appearance is animated. */
export function ColdOpen() {
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const finish = () => {
      setPlaying(false)
      try { localStorage.setItem(SEEN, '1') } catch {}
    }
    const t = setTimeout(finish, LENGTH_MS)
    const skip = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    skip.forEach(e => addEventListener(e, finish, { once: true, passive: true }))
    return () => {
      clearTimeout(t)
      skip.forEach(e => removeEventListener(e, finish))
    }
  }, [])

  return (
    <section className={`${s.scene} ${playing ? s.play : ''}`} data-testid="cold-open" data-playing={playing}>
      <div className={s.photo}>
        <Image src="/cold-open/helmet-desk.webp" alt="A riding helmet on a desk beside a monitor full of code, at night"
          fill priority sizes="100vw" />
      </div>
      <div className={s.loader} aria-hidden="true">
        <div className={s.rule} />
        <div className={s.count} />
      </div>
      <div className={s.title}>
        <p className={s.eyebrow}>[ Kolkata, after dark ]</p>
        <h1 className={s.name}>Owais Ahmed Khan</h1>
      </div>
      <nav className={s.doors} aria-label="Choose a way in">
        <Link href="/soul" className={s.door}>
          <span className={s.doorLabel}>The helmet</span>
          <span className={s.doorName}>Meet the person</span>
        </Link>
        <Link href="/hire" className={s.door}>
          <span className={s.doorLabel}>The monitor</span>
          <span className={s.doorName}>See the work</span>
        </Link>
      </nav>
      <p className={s.hint} aria-hidden="true">or scroll</p>
    </section>
  )
}
