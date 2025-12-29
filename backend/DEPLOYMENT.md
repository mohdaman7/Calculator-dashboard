# Deploy Backend to Render - Step by Step Guide

## Prerequisites
- GitHub account with your code pushed
- Render account (free at https://render.com)
- MongoDB Atlas database (free tier available)

---

## Step 1: Setup MongoDB Atlas (if not done)

1. Go to https://www.mongodb.com/atlas
2. Create a free account and cluster
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/admin-dashboard
   ```
5. Replace `<password>` with your actual password

---

## Step 2: Push Code to GitHub

Make sure your backend folder is pushed to GitHub:

```bash
cd /home/mohd-aman/Downloads/admin-dashboard-next-js
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

---

## Step 3: Create Render Account

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended for easy repo access)

---

## Step 4: Create New Web Service

1. Click **"New +"** button in dashboard
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Find and select your repository

---

## Step 5: Configure the Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `admin-dashboard-api` (or your choice) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` (for testing) |

---

## Step 6: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/admin-dashboard` |
| `JWT_SECRET` | `your-super-secret-key-minimum-32-characters-long` |
| `ADMIN_EMAIL` | `your-admin@email.com` |
| `ADMIN_PASSWORD` | `your-secure-password` |
| `CORS_ORIGIN` | `https://your-frontend-domain.vercel.app` |

> ⚠️ **Important:** Use a strong, unique JWT_SECRET (at least 32 characters)

---

## Step 7: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. Watch the logs for any errors

---

## Step 8: Verify Deployment

Once deployed, Render gives you a URL like:
```
https://admin-dashboard-api.onrender.com
```

Test it:
1. Visit `https://your-app.onrender.com/health`
2. Should return: `{"status":"ok","timestamp":"...","uptime":...}`

---

## Step 9: Update Frontend

Update your frontend to use the new API URL:

### Option A: Environment Variable (Recommended)

Create `.env.local` in your frontend root:
```
NEXT_PUBLIC_API_URL=https://admin-dashboard-api.onrender.com/api
```

### Option B: Direct Update

Or update the API URL directly in your frontend code.

---

## Step 10: Test Everything

1. Open your frontend
2. Try logging in with admin credentials
3. Add a phone number
4. Check the verify API:
   ```bash
   curl -X POST https://your-app.onrender.com/api/phone-numbers/verify \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber":"9876543210"}'
   ```

---

## Troubleshooting

### "Application failed to respond"
- Check logs in Render dashboard
- Verify MONGODB_URI is correct
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### "MongoDB connection error"
1. Go to MongoDB Atlas → Network Access
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)

### "CORS error"
- Update `CORS_ORIGIN` to match your frontend domain exactly
- Include `https://` in the URL

### Logs
- View logs: Render Dashboard → Your Service → Logs

---

## Free Tier Limitations

Render free tier:
- Spins down after 15 min of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free

For production, consider upgrading to paid tier ($7/month).

---

## Quick Reference

| Resource | URL |
|----------|-----|
| Render Dashboard | https://dashboard.render.com |
| MongoDB Atlas | https://cloud.mongodb.com |
| Your API | https://your-app.onrender.com |
| Health Check | https://your-app.onrender.com/health |
| Phone Verify | POST https://your-app.onrender.com/api/phone-numbers/verify |
