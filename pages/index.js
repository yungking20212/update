import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PRNHub - Discover Amazing Content</title>
        <meta name="description" content="PRNHub - The next generation content platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.gradient}>PRNHub</span>
          </h1>
          
          <p className={styles.description}>
            Discover, create, and share amazing content
          </p>

          <div className={styles.buttonGroup}>
            <a 
              href="https://apps.apple.com/app/prnhub" 
              className={styles.downloadButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download on the App Store
            </a>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>🎨 Create</h3>
            <p>Express yourself with powerful creative tools</p>
          </div>
          <div className={styles.feature}>
            <h3>🔍 Discover</h3>
            <p>Find content tailored to your interests</p>
          </div>
          <div className={styles.feature}>
            <h3>🤝 Connect</h3>
            <p>Build your community and engage with fans</p>
          </div>
        </div>
      </main>
    </div>
  )
}
