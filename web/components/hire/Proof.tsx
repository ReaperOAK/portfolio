import s from './Proof.module.css'

// Verified public figures only (employment NDA: no employer metrics). Source: resume.
const FIGURES = [
  { value: '3 yrs', label: 'building and running production systems' },
  { value: '31', label: 'projects shipped, from hackathon builds to live platforms' },
  { value: '34.2k+', label: 'clicks on Today Egg Rates, built solo' },
  { value: '19,000+', label: 'entrants at the Odoo Hackathon. National finalist.' },
]

export function Proof() {
  return (
    <section className={s.band} aria-label="In numbers">
      {FIGURES.map(f => (
        <div key={f.label} className={s.fig}>
          <p className={s.value}>{f.value}</p>
          <p className={s.label}>{f.label}</p>
        </div>
      ))}
    </section>
  )
}
