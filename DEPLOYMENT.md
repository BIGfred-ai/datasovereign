# DataSovereign Deployment Guide

This guide provides comprehensive instructions for deploying DataSovereign in various environments, from local development to production deployment.

## Quick Deployment Options

### 1. Static File Hosting

DataSovereign is built as a static web application and can be deployed to any static hosting service:

#### GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Select source: Deploy from a branch
# Choose: main branch / root
# Your site will be available at: https://yourusername.github.io/datasovereign
```

#### Netlify
```bash
# Connect your GitHub repository to Netlify
# Build settings:
# - Build command: (leave empty)
# - Publish directory: /
# Auto-deploy on git push
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts for configuration
```

### 2. Local Development Server

#### Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Access at: http://localhost:8000
```

#### Node.js
```bash
# Using serve package
npx serve . -p 8000

# Using http-server
npx http-server -p 8000

# Access at: http://localhost:8000
```

#### PHP
```bash
php -S localhost:8000

# Access at: http://localhost:8000
```

### 3. Docker Deployment

#### Dockerfile
```dockerfile
FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Build and Run
```bash
# Build Docker image
docker build -t datasovereign .

# Run container
docker run -p 8080:80 datasovereign

# Access at: http://localhost:8080
```

### 4. Cloud Platform Deployment

#### AWS S3 + CloudFront
```bash
# Create S3 bucket
aws s3 mb s3://datasovereign-app

# Upload files
aws s3 sync . s3://datasovereign-app --exclude "*.md" --exclude ".git/*"

# Configure bucket for static website hosting
aws s3 website s3://datasovereign-app --index-document index.html

# Set up CloudFront distribution for global CDN
```

#### Google Cloud Storage
```bash
# Create bucket
gsutil mb gs://datasovereign-app

# Upload files
gsutil -m cp -r . gs://datasovereign-app

# Configure for web serving
gsutil web set -m index.html gs://datasovereign-app
```

#### Azure Static Web Apps
```bash
# Install Azure CLI
az extension add --name staticwebapp

# Create static web app
az staticwebapp create \
  --name datasovereign \
  --resource-group myResourceGroup \
  --source https://github.com/yourusername/datasovereign \
  --location "Central US" \
  --branch main \
  --app-location "/" \
  --api-location "" \
  --output-location "/"
```

## Production Deployment Considerations

### Security Headers

Add these security headers to your web server configuration:

```nginx
# Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data:;" always;
```

### HTTPS Configuration

Always use HTTPS in production:

```nginx
# Nginx HTTPS configuration
server {
    listen 443 ssl http2;
    server_name datasovereign.example.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    root /var/www/datasovereign;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name datasovereign.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Performance Optimization

#### Gzip Compression
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

#### Caching Headers
```nginx
# Cache static assets
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache HTML with shorter expiry
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### Monitoring and Analytics

#### Basic Monitoring
```bash
# Monitor server resources
htop
iostat -x 1
netstat -tuln

# Check web server logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

#### Application Monitoring
Consider integrating:
- Google Analytics for user behavior
- Sentry for error tracking
- Uptime monitoring services
- Performance monitoring tools

### Backup and Recovery

#### Automated Backups
```bash
#!/bin/bash
# backup-script.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/datasovereign"
SOURCE_DIR="/var/www/datasovereign"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create compressed backup
tar -czf $BACKUP_DIR/datasovereign_$DATE.tar.gz -C $SOURCE_DIR .

# Keep only last 30 days of backups
find $BACKUP_DIR -name "datasovereign_*.tar.gz" -mtime +30 -delete

echo "Backup completed: datasovereign_$DATE.tar.gz"
```

#### Cron Job Setup
```bash
# Add to crontab (crontab -e)
0 2 * * * /path/to/backup-script.sh
```

## Environment-Specific Configurations

### Development
```bash
# Local development with live reload
npx live-server --port=8000 --open=/

# Or using browser-sync
npx browser-sync start --server --files "*.html,*.css,*.js"
```

### Staging
```bash
# Use staging-specific configuration
# Set up staging domain: staging.datasovereign.com
# Enable basic authentication for access control
# Use staging analytics tracking ID
```

### Production
```bash
# Production checklist:
# ✓ HTTPS enabled
# ✓ Security headers configured
# ✓ Gzip compression enabled
# ✓ Caching headers set
# ✓ Monitoring configured
# ✓ Backup system in place
# ✓ CDN configured (optional)
# ✓ Domain configured
# ✓ SSL certificate valid
```

## Troubleshooting

### Common Issues

#### CORS Errors
```javascript
// If serving from file:// protocol
// Use a local server instead of opening HTML directly
```

#### Missing Icons
```html
<!-- Ensure Feather Icons CDN is accessible -->
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
```

#### Mobile Responsiveness
```css
/* Ensure viewport meta tag is present */
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Performance Issues
```bash
# Check file sizes
du -sh *

# Optimize images if needed
# Minify CSS/JS for production
# Enable compression
```

### Security Issues
```bash
# Check for mixed content warnings
# Verify HTTPS configuration
# Test security headers
# Validate CSP policy
```

## Support

For deployment support:
1. Check this documentation first
2. Review common issues section
3. Create an issue on GitHub
4. Contact the development team

---

**Note**: DataSovereign is designed to be deployment-agnostic and should work on any modern web hosting platform that supports static files.

