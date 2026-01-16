#!/bin/bash

# Cloudflare Pages Deployment Script
# This script helps you deploy the update.json to Cloudflare Pages

echo "🚀 Cloudflare Pages Deployment Helper"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Run: git init"
    exit 1
fi

# Check if there's a remote
REMOTE=$(git remote get-url origin 2>/dev/null)
if [ -z "$REMOTE" ]; then
    echo "📦 No GitHub remote found."
    echo ""
    echo "Next steps:"
    echo "1. Create a new repository on GitHub: https://github.com/new"
    echo "2. Run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    read -p "Press Enter after you've created the GitHub repo and added the remote..."
fi

# Check if we need to push
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes. Committing..."
    git add .
    git commit -m "Update files"
fi

# Check if we need to push
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
if [ $? -ne 0 ] || [ "$LOCAL" != "$REMOTE" ]; then
    echo "📤 Pushing to GitHub..."
    git push origin main
else
    echo "✅ Repository is up to date"
fi

echo ""
echo "✅ Local setup complete!"
echo ""
echo "🌐 Next: Deploy to Cloudflare Pages"
echo "======================================"
echo "1. Go to: https://dash.cloudflare.com/"
echo "2. Navigate to: Pages → Create a project"
echo "3. Connect to your GitHub repository"
echo "4. Build settings:"
echo "   - Framework preset: None"
echo "   - Build command: (leave blank)"
echo "   - Build output directory: public"
echo "5. Click 'Save and Deploy'"
echo ""
echo "After deployment, update UpdateService.endpoint with your Cloudflare Pages URL"
