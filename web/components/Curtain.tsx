'use client'
import { useCallback } from 'react'
import { useSite, type UniverseId } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import s from './Curtain.module.css'

/* A singleton overlay, located by id at morph time rather than through refs captured during render. */
const CURTAIN_ID = 'morph-curtain'
const INNER_ID = 'morph-curtain-inner'

export function Curtain() {
  return (
    <div id={CURTAIN_ID} className={s.curtain} aria-hidden="true">
      <div id={INNER_ID} className={s.inner} />
    </div>
  )
}

/** Sweep the incoming universe's curtain in, swap under cover, sweep out. Reduced motion: instant swap. */
export function useMorphTo() {
  const setUniverse = useSite(st => st.setUniverse)
  const setMorphing = useSite(st => st.setMorphing)

  return useCallback(
    (next: UniverseId) => {
      const { universe, morphing } = useSite.getState()
      if (morphing || next === universe) return

      const curtain = document.getElementById(CURTAIN_ID)
      const inner = document.getElementById(INNER_ID)
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !curtain || !inner || typeof inner.animate !== 'function') return setUniverse(next)

      const spec = resolve(next).curtain
      setMorphing(true)
      curtain.style.opacity = '1'
      inner.style.background = spec.background

      inner
        .animate([{ transform: 'scaleX(0)', transformOrigin: 'left center' }, { transform: 'scaleX(1)', transformOrigin: 'left center' }],
          { duration: spec.durationIn, easing: spec.easing, fill: 'forwards' })
        .finished.then(() => {
          setUniverse(next)
          return inner.animate(
            [{ transform: 'scaleX(1)', transformOrigin: 'right center' }, { transform: 'scaleX(0)', transformOrigin: 'right center' }],
            { duration: spec.durationOut, easing: spec.easing, fill: 'forwards' },
          ).finished
        })
        // An interrupted animation (tab hidden, element removed) must never leave the curtain up or the store locked.
        .catch(() => setUniverse(next))
        .finally(() => {
          curtain.style.opacity = '0'
          setMorphing(false)
        })
    },
    [setUniverse, setMorphing],
  )
}
