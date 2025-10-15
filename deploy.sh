#!/bin/bash

# TheTreeWay Website Deployment Script
# This script builds and deploys the static website to VPS

set -e

echo "🚀 Starting TheTreeWay website deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed. 'out' directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Create a tarball for deployment
echo "📦 Creating deployment package..."
tar -czf thetreeway-website.tar.gz -C out .

echo "✅ Deployment package created: thetreeway-website.tar.gz"

# Instructions for VPS deployment
echo "
🎯 Next steps for VPS deployment:

1. Upload the package to your VPS:
   scp thetreeway-website.tar.gz user@your-vps:/path/to/deployment/

2. On your VPS, extract and deploy:
   cd /path/to/deployment/
   tar -xzf thetreeway-website.tar.gz -C /var/www/thetreeway.com/
   
3. Ensure your Nginx configuration is set up for:
   - thetreeway.com (Spanish - default)
   - thetreeway.com/en (English)

4. Restart Nginx:
   sudo systemctl reload nginx

📝 Note: Make sure SSL certificates are configured for thetreeway.com
"

echo "🎉 Deployment preparation complete!"