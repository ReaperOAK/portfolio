'use client'
import { useEffect, useRef } from 'react'
import { useSite } from '@/lib/store'
import s from './signature.module.css'

const ARC = 245 // visible sweep of the 327-unit circumference, a 270° gauge
const REDLINE = 11000

/** Scroll speed is throttle. Decorative: hidden from assistive tech, absent at the static tier. */
export function Tacho() {
  const tier = useSite(st => st.tier)
  const arc = useRef<SVGCircleElement>(null)
  const num = useRef<HTMLElement>(null)

  useEffect(() => {
    if (tier === 'static') return
    let raf = 0
    let lastY = scrollY
    let vel = 0
    let shown = -1
    const tick = () => {
      const y = scrollY
      vel += (Math.min(Math.abs(y - lastY) * 2.4, 100) - vel) * 0.12 // eased toward instantaneous speed, 0–100
      lastY = y
      const rpm = Math.round((vel / 100) * REDLINE / 100) * 100
      if (rpm !== shown && arc.current && num.current) {
        arc.current.setAttribute('stroke-dasharray', `${(vel / 100) * ARC} 327`)
        num.current.textContent = String(rpm)
        shown = rpm
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [tier])

  if (tier === 'static') return null
  return (
    <div className={s.cluster} aria-hidden="true">
      <div className={s.gauge}>
        <svg viewBox="0 0 120 120" width="132" height="132">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--u-line)" strokeWidth="7" strokeDasharray={`${ARC} 327`} strokeLinecap="round" />
          <circle ref={arc} cx="60" cy="60" r="52" fill="none" stroke="var(--u-accent)" strokeWidth="7" strokeDasharray="0 327" strokeLinecap="round" />
        </svg>
        <div className={s.readout}>
          <b ref={num} className={s.rpm}>0</b>
          <span className={s.unit}>scroll rpm</span>
        </div>
      </div>
      <p className={s.copy}>
        Scroll speed is throttle. <em>Ride it harder and the needle follows.</em>
      </p>
    </div>
  )
}
