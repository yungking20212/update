import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from '../../styles/Post.module.css'

export default function Post() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            id,
            caption,
            thumbnail_url,
            video_url,
            profiles:user_id (
              username,
              display_name
            )
          `)
          .eq('id', id)
          .single()

        if (fetchError) {
          // Post not found - show placeholder
          setPost({
            id,
            caption: 'Check out this amazing post!',
            username: 'creator',
            thumbnailUrl: null
          })
        } else {
          setPost({
            id: data.id,
            caption: data.caption || 'Check out this post!',
            username: data.profiles?.username || 'creator',
            displayName: data.profiles?.display_name,
            thumbnailUrl: data.thumbnail_url,
            videoUrl: data.video_url
          })
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to load post')
        // Fallback to placeholder
        setPost({
          id,
          caption: 'Check out this amazing post!',
          username: 'creator',
          thumbnailUrl: null
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

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
        <title>{post?.caption || 'Post on PRNHub'}</title>
        <meta name="description" content={post?.caption || 'Check out this post on PRNHub'} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={post?.caption || 'Post on PRNHub'} />
        <meta property="og:description" content={`By @${post?.username} on PRNHub`} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={`https://prnhub-jet.vercel.app/post/${id}`} />
        {post?.thumbnailUrl && <meta property="og:image" content={post.thumbnailUrl} />}
        {post?.videoUrl && <meta property="og:video" content={post.videoUrl} />}
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="1280" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.caption || 'Post on PRNHub'} />
        <meta name="twitter:description" content={`By @${post?.username} on PRNHub`} />
        {post?.thumbnailUrl && <meta name="twitter:image" content={post.thumbnailUrl} />}
      </Head>

      <main className={styles.main}>
        <div className={styles.postCard}>
          <div className={styles.videoPlaceholder}>
            {post?.thumbnailUrl ? (
              <img 
                src={post.thumbnailUrl} 
                alt={post.caption}
                className={styles.thumbnail}
              />
            ) : null}
            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

          <div className={styles.content}>
            <p className={styles.caption}>{post?.caption}</p>
            <p className={styles.creator}>
              by @{post?.username}
              {post?.displayName && ` (${post.displayName})`}
            </p>
          </div>

          <div className={styles.cta}>
            <button 
              onClick={() => {
                // Try custom scheme first (instant if app installed)
                window.location.href = `prnhub://post/${id}`
                
                // Fallback to App Store after 2 seconds if app didn't open
                setTimeout(() => {
                  window.location.href = 'https://apps.apple.com/app/prnhub'
                }, 2000)
              }}
              className={styles.primaryButton}
            >
              Watch in App
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
            🎥 Videos are best viewed in the PRNHub app
          </p>
        </div>
      </main>
    </div>
  )
}
