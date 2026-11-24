import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.chassis}>
        <div className={styles.statusBadge}>
          <span>●</span> 404 · ROUTE_NOT_FOUND
        </div>
        
        <div className={styles.code}>404</div>

        <h1 className={styles.title}>Signal Lost in the Void</h1>

        <p className={styles.description}>
          The requested coordinate does not exist or has been shifted across universes.
          Return to base radar to inspect all 44 verified production architectures.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            ← Return to Base
          </Link>
          <Link href="/hire" className={styles.secondaryBtn}>
            View Availability &amp; Contact
          </Link>
        </div>
      </div>
    </main>
  )
}
