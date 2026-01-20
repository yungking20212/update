// Smart Link Helper for Sharing
// Always use HTTPS URLs for sharing (universal links)
// Custom schemes are only for "Open in App" buttons

export const generateShareURL = {
  profile: (username) => {
    const clean = username.replace('@', '')
    return `https://prnhub.app/@${clean}`
  },
  
  post: (id) => {
    return `https://prnhub.app/post/${id}`
  },
  
  tag: (name) => {
    return `https://prnhub.app/tag/${name}`
  },
  
  sound: (id) => {
    return `https://prnhub.app/sound/${id}`
  }
}

export const generateShareText = {
  profile: (username) => {
    return `Check out @${username.replace('@', '')} on PRNHub!`
  },
  
  post: (caption) => {
    return caption || 'Check out this post on PRNHub!'
  },
  
  tag: (name) => {
    return `Explore #${name} on PRNHub`
  }
}

// Usage in iOS app:
// 
// For share button (use HTTPS):
// let url = "https://prnhub.app/@username"
// 
// For internal navigation (use custom scheme):
// let url = "prnhub://profile/username"
