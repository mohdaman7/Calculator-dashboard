# Getting Started with Admin Dashboard

Complete step-by-step guide to set up and run the admin dashboard locally.

## Prerequisites Checklist

Before starting, ensure you have:

- ✅ Node.js v16 or higher (`node --version`)
- ✅ npm v7 or higher (`npm --version`)
- ✅ MongoDB installed or MongoDB Atlas account
- ✅ Git (optional, for cloning)
- ✅ Code editor (VS Code recommended)

## Step 1: Project Setup

### Clone or Download

```bash
# If using git
git clone <repository-url>
cd admin-dashboard

# If downloaded as ZIP, extract and navigate
cd admin-dashboard
```

## Step 2: Frontend Installation

### Install Dependencies

```bash
npm install
```

This installs all frontend packages including:
- Next.js
- React
- shadcn/ui components
- Tailwind CSS
- API libraries

### Configure Environment

```bash
# Copy example file
cp .env.local.example .env.local

# Edit .env.local
nano .env.local
# or use your editor
```

Set the API URL (keep default for local development):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 3: Backend Installation

### Install Backend Dependencies

```bash
# Method 1: Using npm script
npm run backend:install

# Method 2: Manual
cd backend
npm install
cd ..
```

### Configure Backend Environment

```bash
# Navigate to backend
cd backend

# Copy example file
cp .env.example .env

# Edit .env file
nano .env
# or use your editor
```

Set these values:
```
# MongoDB - Local (default)
MONGODB_URI=mongodb://localhost:27017/admin-dashboard

# MongoDB - Atlas (Cloud option)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard

# Generate a strong secret (at least 32 characters)
JWT_SECRET=your-super-secret-key-minimum-32-characters

# Other settings (optional)
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Step 4: MongoDB Setup

### Option A: Local MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Windows:**
- Download MongoDB Community from mongodb.com
- Run installer and follow prompts
- MongoDB runs as service automatically

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify it's running:**
```bash
mongo # or mongosh for newer versions
> db.version()
# Should show version number
```

### Option B: MongoDB Atlas (Cloud)

1. Visit mongodb.com/atlas
2. Create free account
3. Create a new cluster (Free tier available)
4. Click "Connect"
5. Choose "Drivers"
6. Copy connection string
7. Update `MONGODB_URI` in backend/.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard
   ```

## Step 5: Start the Application

### Terminal 1: Start Backend

```bash
# From root directory
npm run backend:dev

# You should see:
# [v0] MongoDB Connected
# [v0] Server running on port 5000
```

### Terminal 2: Start Frontend

```bash
# From root directory (in a new terminal)
npm run dev

# You should see:
# ▲ Next.js 16.0.10
# ✓ Ready in 1234ms
```

### Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## Step 6: Create Your First Admin Account

### Method 1: Register New Admin

If registration is enabled:
1. Click "Register" on login page
2. Enter email, password, and name
3. Click Register
4. Login with your credentials

### Method 2: Seed Database

Or use the seed script to populate demo data:

```bash
# From backend directory
cd backend
npm run seed

# You'll see:
# Test Credentials:
# Email: admin@example.com
# Password: admin123
```

Then login with those credentials.

## Step 7: Start Using the Dashboard

### Navigation Menu

After login, you'll see the sidebar with three main sections:

1. **Phone Numbers**
   - View all whitelisted phone numbers
   - Add new phone numbers
   - Edit existing numbers
   - Delete numbers

2. **Users & Admins**
   - View all registered users
   - Grant admin access
   - Revoke admin access

3. **Activity Logs**
   - See all admin actions
   - Track who did what and when
   - Monitor system activity

### First Actions

1. **Add a Phone Number**
   - Click "Add Phone Number" button
   - Enter phone number (10-15 digits)
   - Enter user name
   - Click "Add"

2. **View Phone Numbers**
   - See table of all numbers
   - Edit or delete as needed

3. **Check Activity Logs**
   - See your actions logged
   - Verify timestamps

## Testing the System

### Manual Test Checklist

- [ ] **Login**: Can you login successfully?
- [ ] **Add Phone**: Can you add a new phone number?
- [ ] **View List**: Are phone numbers displaying in table?
- [ ] **Edit Phone**: Can you edit an existing number?
- [ ] **Delete Phone**: Can you delete a number?
- [ ] **View Users**: Can you see registered users?
- [ ] **View Logs**: Can you see activity logs?
- [ ] **Logout**: Can you logout successfully?

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Problem:** MongoDB connection failing

**Solutions:**
```bash
# Check MongoDB is running
mongo --version

# Start MongoDB
mongod  # macOS/Linux
# Windows: MongoDB should auto-start

# Check connection string in backend/.env
# Should be: mongodb://localhost:27017/admin-dashboard

# For MongoDB Atlas, ensure:
# - Username/password are correct
# - IP address is whitelisted (use 0.0.0.0/0 for development)
```

### Issue: "CORS Error" in browser

**Problem:** Frontend can't reach backend

**Solutions:**
```bash
# Check backend is running on port 5000
# Check NEXT_PUBLIC_API_URL in .env.local
# Should be: http://localhost:5000/api

# Verify backend CORS_ORIGIN in backend/.env
# Should include: http://localhost:3000
```

### Issue: "Port 3000 or 5000 already in use"

**Problem:** Another application using the port

**Solutions:**
```bash
# Find process on port
lsof -ti:3000  # for port 3000
lsof -ti:5000  # for port 5000

# Kill the process
kill -9 <PID>

# Or use different ports
PORT=5001 npm run backend:dev  # backend on 5001
npm run dev -- -p 3001          # frontend on 3001
```

### Issue: "Login fails with invalid credentials"

**Problem:** Admin account doesn't exist

**Solutions:**
```bash
# Option 1: Run seed script (creates demo account)
cd backend
npm run seed

# Option 2: Register new admin in UI
# Use the registration form on login page

# Option 3: Check admin exists in MongoDB
mongo
> use admin-dashboard
> db.admins.find()
```

### Issue: "Changes not appearing in dashboard"

**Problem:** Frontend not updating

**Solutions:**
```bash
# Refresh the page
Ctrl + R (or Cmd + R on Mac)

# Clear browser cache
Ctrl + Shift + Delete

# Check browser console for errors
F12 or Cmd + Option + I

# Verify backend is responding
curl http://localhost:5000/health
```

## Development Tips

### Project Structure

```
admin-dashboard/
├── src/app/              # Pages
├── src/components/       # Components
├── src/services/api/     # API calls
├── src/hooks/            # React hooks
├── src/utils/            # Utilities
├── backend/src/          # Backend code
└── README.md            # Documentation
```

### Common Commands

```bash
# Frontend development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Backend development
npm run backend:dev      # Start backend dev server
npm run backend:start    # Start backend (production)
npm run backend:install  # Install backend deps

# Database
cd backend && npm run seed  # Seed with demo data
```

### Code Organization

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Next.js pages in `src/app/`
- **Services**: API calls in `src/services/api/`
- **Utils**: Helper functions in `src/utils/`
- **Hooks**: Custom React hooks in `src/hooks/`

### Adding New Features

1. **New API Endpoint**
   - Add route in `backend/src/routes/`
   - Add controller in `backend/src/controllers/`

2. **New Frontend Component**
   - Create in `src/components/`
   - Import in parent component

3. **New API Service**
   - Create in `src/services/api/`
   - Use in components via hooks

## Next Steps

### After Setup

1. **Customize Colors**
   - Edit `src/styles/globals.css`
   - Change CSS variables (--primary, --accent, etc.)

2. **Add More Features**
   - Duplicate existing views/components
   - Modify as needed

3. **Deploy**
   - Follow `backend/DEPLOYMENT.md`
   - Deploy to Vercel/Heroku

4. **Production Setup**
   - Use MongoDB Atlas
   - Set strong JWT_SECRET
   - Enable HTTPS
   - Configure proper CORS

## Quick Reference

### URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Docs | http://localhost:5000/health |
| MongoDB | localhost:27017 |

### Default Ports

| Application | Port |
|------------|------|
| Next.js Frontend | 3000 |
| Express Backend | 5000 |
| MongoDB | 27017 |

### Files to Update

| File | Purpose |
|------|---------|
| `.env.local` | Frontend config |
| `backend/.env` | Backend config |
| `src/styles/globals.css` | Styling |
| `backend/src/config/env.js` | Backend settings |

## Getting Help

1. **Check Documentation**
   - Read README.md files
   - Check SETUP.md for details

2. **Check Browser Console**
   - F12 or Cmd+Option+I
   - Look for error messages

3. **Check Terminal Output**
   - Look for error logs
   - Check backend output

4. **Reset Everything**
   ```bash
   # Clear MongoDB
   mongo
   > use admin-dashboard
   > db.dropDatabase()
   
   # Reseed
   npm run seed
   ```

## You're All Set!

Your admin dashboard is now running. Start adding phone numbers and managing your application!

For more details, see:
- `README.md` - Full documentation
- `backend/README.md` - Backend API docs
- `SETUP.md` - Detailed setup guide

Happy coding!
