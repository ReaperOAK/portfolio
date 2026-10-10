'use client'
import { useEffect, useRef } from 'react'

/** A muted ambient loop with a poster that carries LCP. Reduced motion or save-data: the poster stays a still. */
export function Film({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return
    v.src = src // attach only now, so the video never competes with the poster for first paint
    v.play().catch(() => {})
  }, [src])
  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />
}
