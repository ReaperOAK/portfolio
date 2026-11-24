import { Film } from '@/components/Film'
import s from './Hero.module.css'

export const EMAIL = 'oaak78692@gmail.com'

export function Hero() {
  return (
    <header className={s.hero}>
      <Film className={s.film} src="/media/desk.mp4" poster="/media/desk-poster.webp" priority />
      <div className={s.copy}>
        <div className={s.badge} role="status" aria-label="Availability Status">
          <span className={s.pulse} aria-hidden="true" />
          <span className={s.badgeText}>Available for Senior Roles & AI Architecture</span>
        </div>

        <h1 className={s.name}>Owais Ahmed Khan</h1>

        <p className={s.sub}>
          <strong>Senior Developer & Systems Architect.</strong> I engineer high-throughput distributed backends, autonomous agent swarms, and adversarial zero-trust sandboxes.
        </p>

        <div className={s.actions}>
          <a className={s.primary} href={`mailto:${EMAIL}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Email me
          </a>
          <a className={s.secondary} href="#work">
            <span>Explore 44 Case Studies</span>
            <span className={s.arrow} aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={s.socialRow} aria-label="Social & Code Profiles">
          <a href="https://github.com/ReaperOAK" target="_blank" rel="noopener noreferrer" className={s.socialLink}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub (@ReaperOAK)</span>
          </a>
          <span className={s.socialSep} aria-hidden="true">·</span>
          <a href="https://linkedin.com/in/owaistech" target="_blank" rel="noopener noreferrer" className={s.socialLink}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </header>
  )
}
