import { EMAIL } from './Hero'
import s from './Contact.module.css'

export function Contact() {
  return (
    <section className={s.close} aria-label="Contact">
      <a className={s.big} href={`mailto:${EMAIL}`}>Email me</a>
      <div className={s.row}>
        <span className={s.addr}>{EMAIL}</span>
        <a href="https://github.com/ReaperOAK" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/owaistech" rel="noopener">LinkedIn</a>
      </div>
    </section>
  )
}
