import s from './Career.module.css'

// Public, résumé-level facts.
const ROLES = [
  { when: '2025 - 2026', what: 'Senior App Developer', where: 'Stealth AI Startup', body: '' },
  { when: '2024 - 2025', what: 'Full-stack developer, contract', where: 'Kolkata Chess Academy', body: 'A learning platform with role-based dashboards and Stockfish-powered training, built from scratch.' },
  { when: '2023 - 2024', what: 'Full-stack engineer, freelance', where: 'Today Egg Rates', body: 'Built and scaled a price-data platform solo, with the caching and SEO that let it grow.' },
]

export function Career() {
  return (
    <section className={s.career} aria-labelledby="career-title">
      <h2 id="career-title" className={s.title}>Where I have worked</h2>
      {ROLES.map(r => (
        <article key={r.when} className={s.role}>
          <span className={s.when}>{r.when}</span>
          <h3 className={s.what}>{r.what}</h3>
          <p className={s.where}>{r.where}</p>
          {r.body && <p className={s.body}>{r.body}</p>}
        </article>
      ))}
    </section>
  )
}
