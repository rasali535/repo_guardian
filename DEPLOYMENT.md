# 🚀 Deployment Guide

This guide covers deploying Repo Guardian to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Docker Deployment](#docker-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:

1. ✅ Built the project successfully (`npm run build`)
2. ✅ Tested the production build locally (`npm run preview`)
3. ✅ Configured environment variables
4. ✅ Set up AI provider API keys (if using real AI)

## Environment Configuration

### Required Environment Variables

Create these environment variables in your hosting platform:

```env
# AI Provider (required)
VITE_AI_PROVIDER=mock  # or 'openai' or 'anthropic'

# OpenAI (if using OpenAI)
VITE_OPENAI_API_KEY=sk-...
VITE_OPENAI_MODEL=gpt-4

# Anthropic (if using Anthropic)
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_ANTHROPIC_MODEL=claude-3-opus-20240229

# GitHub (optional)
VITE_GITHUB_TOKEN=ghp_...

# Application
VITE_APP_NAME=Repo Guardian
VITE_APP_VERSION=1.0.0
```

### Security Notes

⚠️ **Important**: 
- Never commit `.env` files to version control
- Use `.env.example` as a template
- Rotate API keys regularly
- Use different keys for development and production

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard
6. Deploy!

### Vercel Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Netlify Deployment

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables
7. Deploy!

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Docker Deployment

### Dockerfile

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Build and Run

```bash
# Build image
docker build -t repo-guardian .

# Run container
docker run -p 8080:80 repo-guardian
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Custom Server Deployment

### Build for Production

```bash
npm run build
```

### Serve with Node.js

Install a static file server:

```bash
npm install -g serve
```

Serve the build:

```bash
serve -s dist -l 3000
```

### Serve with Apache

1. Copy `dist/` contents to your web root
2. Create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Serve with Nginx

Add to your nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/repo-guardian/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Post-Deployment

### 1. Verify Deployment

- ✅ Check all pages load correctly
- ✅ Test repository analysis
- ✅ Verify file downloads work
- ✅ Test toast notifications
- ✅ Check responsive design on mobile

### 2. Monitor Performance

Use tools like:
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### 3. Set Up Analytics (Optional)

Add analytics to track usage:

```typescript
// src/config/analytics.ts
export const initAnalytics = () => {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Initialize your analytics service
  }
};
```

### 4. Configure CDN (Optional)

For better performance, use a CDN:
- Cloudflare
- AWS CloudFront
- Fastly

### 5. Set Up Monitoring

Monitor your application with:
- [Sentry](https://sentry.io/) for error tracking
- [LogRocket](https://logrocket.com/) for session replay
- [Datadog](https://www.datadoghq.com/) for infrastructure monitoring

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Check hosting platform's environment variable settings

### 404 Errors on Refresh

- Configure your server for SPA routing
- Add proper redirects/rewrites
- See platform-specific sections above

### Slow Performance

- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable caching headers

## Security Checklist

- [ ] API keys stored securely in environment variables
- [ ] `.env` files not committed to git
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented (if using real APIs)
- [ ] Input validation on all forms
- [ ] XSS protection enabled

## Scaling Considerations

For high-traffic deployments:

1. **Use a CDN** for static assets
2. **Enable caching** at multiple levels
3. **Implement rate limiting** for API calls
4. **Use serverless functions** for backend logic
5. **Monitor costs** especially for AI API usage

## Support

For deployment issues:
- Check the [main README](README.md)
- Open an issue on GitHub
- Contact support@repoguardian.dev

---

**Happy Deploying! 🚀**