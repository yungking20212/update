# Quick Start - Deploy Update Endpoint

## ✅ What's Already Done:
- ✅ Git repository initialized
- ✅ `update.json` created in `public/` directory
- ✅ Files committed locally

## 🚀 Next Steps (Choose One):

### Option 1: Using GitHub CLI (Fastest)
```bash
# Install GitHub CLI if needed: brew install gh
gh auth login
gh repo create prnhub-updates --public --source=. --remote=origin --push
```

### Option 2: Manual GitHub Setup
1. Go to https://github.com/new
2. Create a new repository named `prnhub-updates` (or any name)
3. **Don't** initialize with README, .gitignore, or license
4. Run these commands:
```bash
cd /Users/kendallgipson/Desktop/prnhub
git remote add origin https://github.com/YOUR_USERNAME/prnhub-updates.git
git branch -M main
git push -u origin main
```

### Option 3: Use the Deploy Script
```bash
./DEPLOY.sh
```

## 🌐 Deploy to Cloudflare Pages

After pushing to GitHub:

1. Go to https://dash.cloudflare.com/
2. Click **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your repository
5. Configure:
   - **Framework preset**: `None`
   - **Build command**: (leave blank)
   - **Build output directory**: `public`
6. Click **Save and Deploy**

## 📱 Update Your App

After Cloudflare deploys, you'll get a URL like:
`https://your-project.pages.dev/update.json`

Update `UpdateService.swift`:
```swift
static var endpoint: String = "https://your-project.pages.dev/update.json"
```

## ✨ Done!

Your update endpoint will be live and your app can check for updates automatically!
