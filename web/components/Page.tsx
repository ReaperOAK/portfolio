import type { ReactNode } from 'react'
import s from './Page.module.css'

export function Page({ children }: { children: ReactNode }) {
  return <main className={s.page}>{children}</main>
}

export function Hero({ eyebrow, title, line, chips }: { eyebrow: string; title: string; line: ReactNode; chips: string[] }) {
  return (
    <header className={s.hero}>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h1 className={s.name}>{title}</h1>
      <p className={s.line}>{line}</p>
      <ul className={s.chips}>{chips.map(c => <li key={c}>{c}</li>)}</ul>
    </header>
  )
}

export function Section({ id, title, count, children }: { id: string; title: string; count?: string; children: ReactNode }) {
  return (
    <section className={s.section} aria-labelledby={id}>
      <div className={s.head}>
        <h2 id={id} className={s.title}>{title}</h2>
        {count && <span className={s.count}>{count}</span>}
      </div>
      {children}
    </section>
  )
}
