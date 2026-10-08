'use client'
import Link from 'next/link'
import { useSite } from '@/lib/store'
import { REGISTERED, UNIVERSES } from '@/lib/universe/registry'
import { useMorphTo } from './Curtain'
import s from './Dock.module.css'

/** Lens is a place you go (a route). Universe is a look you put on (a morph). Two controls, two axes. */
export function LensSwitch() {
  const lens = useSite(st => st.lens)
  return (
    <nav aria-label="Lens" className={s.group}>
      <Link href="/hire" className={s.item} aria-current={lens === 'work' ? 'page' : undefined}>Work</Link>
      <Link href="/soul" className={s.item} aria-current={lens === 'soul' ? 'page' : undefined}>Soul</Link>
    </nav>
  )
}

export function UniverseRail() {
  const universe = useSite(st => st.universe)
  const morphing = useSite(st => st.morphing)
  const morphTo = useMorphTo()
  return (
    <div role="group" aria-label="Universe" className={s.group}>
      {REGISTERED.map(id => (
        <button key={id} type="button" className={s.item} aria-pressed={universe === id} disabled={morphing}
          title={`${UNIVERSES[id].name}: ${UNIVERSES[id].origin}`} onClick={() => morphTo(id)}>
          {UNIVERSES[id].name}
        </button>
      ))}
    </div>
  )
}

export function Dock() {
  return (
    <div className={s.dock}>
      <LensSwitch />
      <span className={s.sep} aria-hidden="true" />
      <UniverseRail />
    </div>
  )
}
