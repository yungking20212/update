import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Tag.module.css'

export default function Tag() {
  const router = useRouter()
  const { name } = router.query

  return (
    <div className={styles.container}>
      <Head>
        <title>#{name} on PRNHub</title>
        <meta name="description" content={`Explore posts tagged with #${name} on PRNHub`} />
        
        <meta property="og:title" content={`#{name} on PRNHub`} />
        <meta property="og:description" content={`Explore posts tagged with #${name}`} />
        <meta property="og:url" content={`https://prnhub.app/tag/${name}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.tagCard}>
          <div className={styles.tagIcon}>#</div>
          
          <h1 className={styles.tagName}>#{name}</h1>
          <p className={styles.description}>Explore trending content</p>

          <div className={styles.cta}>
            <button 
              onClick={() => {
                // Try custom scheme first (instant if app installed)
                window.location.href = `prnhub://tag/${name}`
                
                // Fallback to App Store after 2 seconds if app didn't open
                setTimeout(() => {
                  window.location.href = 'https://apps.apple.com/app/prnhub'
                }, 2000)
              }}
              className={styles.primaryButton}
            >
              Explore in App
            </button>
            <a 
              href="https://apps.apple.com/app/prnhub"
              className={styles.secondaryButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App
            </a>
          </div>

          <p className={styles.hint}>
            🔥 Discover trending #{name} content in the app
          </p>
        </div>
      </main>
    </div>
  )
}
