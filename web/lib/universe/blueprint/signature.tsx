import s from './signature.module.css'

// Public, non-employer figures only (employment NDA). Source: resume.
const METRICS = [
  ['34.2k+', 'clicks, Today Egg Rates'],
  ['2K+', 'monthly users, Today Egg Rates'],
  ['3', 'dApps shipped, TicketVault'],
  ['19,000+', 'field at the Odoo hackathon, national finalist'],
] as const

export function MetricPlate() {
  return (
    <dl className={s.plate}>
      {METRICS.map(([v, l]) => (
        <div key={l} className={s.cell}>
          <dt className={s.label}>{l}</dt>
          <dd className={s.value}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
