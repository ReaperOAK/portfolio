'use client'

import { useState } from 'react'
import { EMAIL } from './Hero'
import s from './Contact.module.css'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className={s.close} aria-labelledby="contact-heading">
      <div className={s.headerRow}>
        <div className={s.tzBadge} aria-label="Current Location and Timezone">
          <span className={s.tzDot} aria-hidden="true" />
          <span>Kolkata, IN · UTC+5:30</span>
        </div>
      </div>

      <h2 id="contact-heading" className={s.srOnly}>Contact Owais Ahmed Khan</h2>
      <a className={s.big} href={`mailto:${EMAIL}`}>Email me</a>

      <div className={s.row}>
        <div className={s.emailGroup}>
          <a className={s.addr} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button
            type="button"
            className={s.copyBtn}
            onClick={handleCopy}
            aria-label={copied ? 'Email copied' : 'Copy email address'}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <div className={s.linksGroup}>
          <a href="https://github.com/ReaperOAK" target="_blank" rel="noopener noreferrer">GitHub (@ReaperOAK)</a>
          <span className={s.dot} aria-hidden="true">·</span>
          <a href="https://linkedin.com/in/owaistech" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className={s.dot} aria-hidden="true">·</span>
          <a href="https://x.com/ReaperOAK" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
        </div>
      </div>
    </section>
  )
}
