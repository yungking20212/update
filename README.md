# PRNHub Web - Deep Linking Landing Pages

Simple, beautiful landing pages that support deep linking to the PRNHub iOS app.

## 🎯 Features

- ✅ Universal Links / Deep Linking support
- ✅ Profile landing pages (`/@username`)
- ✅ Post landing pages (`/post/:id`)
- ✅ Tag landing pages (`/tag/:name`)
- ✅ Sound landing pages (`/sound/:id`)
- ✅ App download CTAs
- ✅ Social sharing meta tags (Open Graph + Twitter Cards)
- ✅ Apple App Site Association (AASA) file configured

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
prnhub/
├── pages/
│   ├── _app.js                 # App wrapper
│   ├── index.js                # Homepage
│   ├── [username].js           # Profile pages (/@username)
│   ├── post/[id].js           # Post pages
│   └── tag/[name].js          # Tag pages
├── styles/
│   ├── globals.css            # Global styles
│   ├── Home.module.css
│   ├── Profile.module.css
│   ├── Post.module.css
│   └── Tag.module.css
├── public/
│   ├── .well-known/
│   │   └── apple-app-site-association
│   └── apple-app-site-association
├── package.json
├── next.config.js
└── vercel.json
```

## 🔗 Deep Linking Flow

### 1. User taps link on iOS device
```
https://prnhub.app/@johndoe
```

### 2. iOS checks AASA file
```
GET https://prnhub.app/.well-known/apple-app-site-association
```

### 3. If app is installed
- App opens to profile view
- `DeepLinkManager` parses URL
- Shows `PublicProfileView`

### 4. If app is NOT installed
- Web page loads
- Shows profile info + "Download App" button

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   vercel link
   ```

2. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

3. **Add Custom Domain**:
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add `prnhub.app`
   - Update DNS records at your registrar

4. **Verify AASA File**:
   ```
   https://prnhub.app/.well-known/apple-app-site-association
   ```

## 🎨 Customization

### Update App Store Link

Edit all instances of:
```javascript
https://apps.apple.com/app/prnhub
```

Replace with your actual App Store URL.

### Update Deep Link Scheme

Edit all instances of:
```javascript
prnhub://profile/username
```

If your app uses a different URL scheme.

### Fetch Real Data

Currently pages show placeholder data. To fetch real data from Supabase:

```javascript
// In pages/[username].js
useEffect(() => {
  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', cleanUsername)
      .single()
    
    setProfile(data)
  }
  
  fetchProfile()
}, [cleanUsername])
```

## 📱 iOS App Configuration

Make sure your iOS app has:

1. **Associated Domains** capability in Xcode:
   ```
   applinks:prnhub.app
   ```

2. **DeepLinkManager** handles URLs:
   ```swift
   .onOpenURL { url in
       deepLinkManager.handleURL(url)
   }
   ```

3. **App ID** matches AASA file:
   ```
   YX28KZ28AJ.com.prnhub.prnhub.YX28KZ28AJ
   ```

## 🧪 Testing

### Test Deep Links

**On device with app installed**:
```bash
# Open Notes app, paste link, tap it
https://prnhub.app/@testuser
```

**In Safari**:
```bash
# Should show web page + smart app banner
https://prnhub.app/@testuser
```

**Using xcrun** (simulator):
```bash
xcrun simctl openurl booted "https://prnhub.app/@testuser"
```

### Verify AASA File

```bash
curl https://prnhub.app/.well-known/apple-app-site-association
```

Should return JSON without redirects.

## 📊 Analytics (Optional)

Add analytics to track:
- Page views
- App download clicks
- Deep link opens

Example with Vercel Analytics:
```bash
npm install @vercel/analytics
```

```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

## 🔒 Security

- HTTPS required for universal links
- AASA file must be served without redirects
- Content-Type must be `application/json`
- Domain verification happens at app install time

## 📝 TODO

- [ ] Add Supabase integration for real data
- [ ] Add og:image for social sharing
- [ ] Add video/sound landing pages
- [ ] Add 404 page
- [ ] Add loading states
- [ ] Add error handling
- [ ] SEO optimization
- [ ] Analytics integration

## 🐛 Troubleshooting

**Deep links not working?**
1. Verify AASA file is accessible (no 404, no redirects)
2. Check iOS app has correct Associated Domains
3. Reinstall app (iOS caches AASA on install)
4. Check `DeepLinkManager` is wired up

**Vercel deployment failing?**
1. Make sure `package.json` has correct Next.js version
2. Run `npm install` locally first
3. Check build logs in Vercel dashboard

**DNS not propagating?**
1. Can take up to 48 hours
2. Use https://dnschecker.org to monitor
3. Clear browser cache
4. Try incognito mode

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Made with ❤️ for PRNHub**
