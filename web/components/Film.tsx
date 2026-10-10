'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/** An ambient loop over a responsive priority poster. The poster carries LCP (srcset, AVIF, preload); the video
 *  attaches only once the browser is idle and fades in when it is actually playing, so it never competes with
 *  first paint. Reduced motion or save-data: the poster stays a still. */
export function Film({ src, poster, className, priority = false }: { src: string; poster: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return
    const start = () => { v.src = src; v.play().catch(() => {}) }
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    const id = idle(start)
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number)
  }, [src])

  return (
    <div className={`film-wrap ${className ?? ''}`} aria-hidden="true">
      <Image src={poster} alt="" fill sizes="100vw" quality={55} className="film-poster"
        preload={priority} fetchPriority={priority ? 'high' : undefined} loading={priority ? 'eager' : 'lazy'} />
      <video ref={ref} className="film-video" data-playing={playing} muted loop playsInline preload="none" onPlaying={() => setPlaying(true)} />
    </div>
  )
}
