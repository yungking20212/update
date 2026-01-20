import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Profile.module.css'

export default function Profile() {
  const router = useRouter()
  const { username } = router.query
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Clean username (remove @ if present)
  const cleanUsername = username?.replace('@', '')

  useEffect(() => {
    if (!cleanUsername) return

    // TODO: Replace with actual Supabase fetch
    // For now, show static landing page
    setProfile({
      username: cleanUsername,
      displayName: cleanUsername,
      bio: 'Creator on PRNHub'
    })
    setLoading(false)
  }, [cleanUsername])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>@{cleanUsername} on PRNHub</title>
        <meta name="description" content={`Check out @${cleanUsername}'s profile on PRNHub`} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={`@${cleanUsername} on PRNHub`} />
        <meta property="og:description" content={profile?.bio || 'Creator on PRNHub'} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://prnhub.app/@${cleanUsername}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`@${cleanUsername} on PRNHub`} />
        <meta name="twitter:description" content={profile?.bio || 'Creator on PRNHub'} />
      </Head>

      <main className={styles.main}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            <div className={styles.avatarPlaceholder}>
              {cleanUsername?.charAt(0).toUpperCase()}
            </div>
          </div>

          <h1 className={styles.username}>@{cleanUsername}</h1>
          <p className={styles.bio}>{profile?.bio}</p>

          <div className={styles.cta}>
            <a 
              href="prnhub://profile/${cleanUsername}"
              className={styles.primaryButton}
            >
              Open in App
            </a>
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
            💡 This profile is best viewed in the PRNHub app
          </p>
        </div>
      </main>
    </div>
  )
}
