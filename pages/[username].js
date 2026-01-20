import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from '../styles/Profile.module.css'

export default function Profile() {
  const router = useRouter()
  const { username } = router.query
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Clean username (remove @ if present)
  const cleanUsername = username?.replace('@', '')

  useEffect(() => {
    if (!cleanUsername) return

    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('username, display_name, bio, avatar_url')
          .eq('username', cleanUsername)
          .single()

        if (fetchError) {
          // Profile not found - show placeholder
          setProfile({
            username: cleanUsername,
            displayName: cleanUsername,
            bio: 'Creator on PRNHub',
            avatarUrl: null
          })
        } else {
          setProfile({
            username: data.username,
            displayName: data.display_name || data.username,
            bio: data.bio || 'Creator on PRNHub',
            avatarUrl: data.avatar_url
          })
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
        // Fallback to placeholder
        setProfile({
          username: cleanUsername,
          displayName: cleanUsername,
          bio: 'Creator on PRNHub',
          avatarUrl: null
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
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
        <meta property="og:url" content={`https://prnhub-jet.vercel.app/@${cleanUsername}`} />
        {profile?.avatarUrl && <meta property="og:image" content={profile.avatarUrl} />}
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`@${cleanUsername} on PRNHub`} />
        <meta name="twitter:description" content={profile?.bio || 'Creator on PRNHub'} />
        {profile?.avatarUrl && <meta name="twitter:image" content={profile.avatarUrl} />}
      </Head>

      <main className={styles.main}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {profile?.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={cleanUsername}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {cleanUsername?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className={styles.username}>@{cleanUsername}</h1>
          {profile?.displayName !== cleanUsername && (
            <p className={styles.displayName}>{profile?.displayName}</p>
          )}
          <p className={styles.bio}>{profile?.bio}</p>

          <div className={styles.cta}>
            <button 
              onClick={() => {
                // Try custom scheme first (instant if app installed)
                window.location.href = `prnhub://profile/${cleanUsername}`
                
                // Fallback to App Store after 2 seconds if app didn't open
                setTimeout(() => {
                  window.location.href = 'https://apps.apple.com/app/prnhub'
                }, 2000)
              }}
              className={styles.primaryButton}
            >
              Open in App
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
            💡 This profile is best viewed in the PRNHub app
          </p>
        </div>
      </main>
    </div>
  )
}
