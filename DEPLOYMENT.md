# Deployment Guide

## Quick Deploy to Replit

1. Push your code to GitHub
2. Import the repository to Replit
3. The app will automatically install dependencies and start
4. Click "Deploy" in Replit to make it publicly available

## Manual Deployment

### Prerequisites
- Node.js 20+
- npm or yarn

### Build and Deploy

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration

The app runs on port 5000 by default. For production deployment:

1. Set `NODE_ENV=production`
2. Configure your reverse proxy (nginx/Apache) to serve on port 80/443
3. Set up SSL certificates for HTTPS

### Docker Deployment (Optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

The app is optimized for mobile use and includes PWA capabilities for installation on mobile devices.