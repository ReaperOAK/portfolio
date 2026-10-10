import { Film } from '@/components/Film'
import s from './Hero.module.css'

export const EMAIL = 'oaak78692@gmail.com'

export function Hero() {
  return (
    <header className={s.hero}>
      <Film className={s.film} src="/media/desk.mp4" poster="/media/desk-poster.webp" priority />
      <div className={s.copy}>
        <h1 className={s.name}>Owais Ahmed Khan</h1>
        <p className={s.sub}>
          <strong>Senior Developer.</strong> I build backends and the infrastructure under them, then carry the pager.
        </p>
        <div className={s.actions}>
          <a className={s.primary} href={`mailto:${EMAIL}`}>Email me</a>
          <a className={s.secondary} href="#work">See the work</a>
        </div>
      </div>
    </header>
  )
}
