# Backend Deployment Guide

## Prerequisites

- Node.js 16+
- MongoDB Atlas or local MongoDB
- Render, Heroku, or similar hosting

## Deployment Steps

### 1. Prepare for Production

Update `.env` for production:
```
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
MONGODB_URI=<production-mongodb-uri>
CORS_ORIGIN=<your-frontend-url>
```

### 2. Deploy to Render

1. Push code to GitHub
2. Create account on render.com
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables
7. Deploy

### 3. Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set JWT_SECRET=<secret>
heroku config:set MONGODB_URI=<uri>
git push heroku main
```

### 4. MongoDB Atlas Setup

1. Create free cluster at mongodb.com/atlas
2. Create database user
3. Get connection string
4. Add to environment variables

## Security Checklist

- [ ] Strong JWT_SECRET (32+ characters)
- [ ] Production MongoDB instance
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting (optional)
- [ ] Request logging
- [ ] Error handling configured
- [ ] Database backups enabled

## Monitoring

- Check server logs regularly
- Monitor database performance
- Track API response times
- Review activity logs for issues

## Scaling

- Use database indexing for performance
- Implement caching if needed
- Consider load balancing for high traffic
- Archive old activity logs periodically
