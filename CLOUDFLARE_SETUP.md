# Cloudflare Pages Setup for Update Endpoint

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `prnhub-updates` or use your existing repo)
3. Initialize and push this directory:

```bash
cd /Users/kendallgipson/Desktop/prnhub
git init
git add public/update.json
git commit -m "Add update.json endpoint"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: (leave blank)
   - **Build output directory**: `public`
6. Click **Save and Deploy**

## Step 3: Update Your App

After deployment, Cloudflare will give you a URL like:
`https://your-project.pages.dev/update.json`

Update `UpdateService.endpoint` in your app:

```swift
static var endpoint: String = "https://your-project.pages.dev/update.json"
```

## Updating the JSON

To update the version info:
1. Edit `public/update.json`
2. Commit and push to GitHub
3. Cloudflare Pages will automatically redeploy
