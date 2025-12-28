# Complete Setup Guide

Professional Admin Dashboard for Phone Number Whitelist Management

## System Requirements

- Node.js 16.x or higher
- npm 7.x or higher
- MongoDB (local or Atlas)
- Code editor (VS Code recommended)

## Quick Start

### 1. Clone or Download Project

```bash
cd admin-dashboard
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Update API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Backend Setup

```bash
# Install backend dependencies
npm run backend:install

# Create environment file
cd backend
cp .env.example .env

# Update .env with:
# MONGODB_URI=mongodb://localhost:27017/admin-dashboard
# JWT_SECRET=your-secure-secret-key-here
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Create account at mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
npm run backend:dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# App runs on http://localhost:3000
```

### 6. First Login

Open http://localhost:3000 in your browser

**Create Admin Account:**
1. Click "Register" or use existing form
2. Enter email and password
3. Login with credentials

**Default Test Credentials:**
```
Email: admin@example.com
Password: password123
```

(You'll need to register this account first)

## Project Structure Overview

```
admin-dashboard/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── services/            # API services
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   └── styles/              # CSS
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Route logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   └── utils/           # Utilities
│   ├── .env.example         # Environment template
│   └── package.json         # Backend dependencies
├── package.json             # Frontend dependencies
├── .env.local.example       # Frontend env template
└── README.md               # Documentation
```

## API Endpoints

### Authentication
```
POST /api/auth/register      # Register new admin
POST /api/auth/login         # Login admin
```

### Phone Numbers
```
GET    /api/phones           # Get all numbers
POST   /api/phones           # Add number
PUT    /api/phones/:id       # Update number
DELETE /api/phones/:id       # Delete number
```

### Users & Admin
```
GET    /api/users            # Get all users
POST   /api/users/grant-admin # Grant admin access
POST   /api/users/revoke-admin # Revoke admin access
```

### Activity Logs
```
GET    /api/activities       # Get activity logs
GET    /api/activities/admin/:id # Get admin's activities
```

## Features

✅ Admin Authentication with JWT
✅ Add/Edit/Delete Phone Numbers
✅ Manage User Roles
✅ Grant/Revoke Admin Access
✅ Track Admin Activities
✅ Responsive UI Design
✅ Activity Logging
✅ Clean Light Theme
✅ Professional Grade

## Common Issues & Solutions

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check connection string in backend/.env
- For MongoDB Atlas, verify IP whitelist

### "CORS Error"
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify backend CORS_ORIGIN setting

### "Login fails"
- Clear browser cache/localStorage
- Check JWT_SECRET in backend/.env
- Verify admin account exists in MongoDB

### "Port 3000 or 5000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your-super-secret-key-minimum-32-chars
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Development Workflow

1. **Start MongoDB**: `mongod`
2. **Start Backend**: `npm run backend:dev`
3. **Start Frontend**: `npm run dev`
4. **Open Browser**: http://localhost:3000
5. **Login/Register**: Create admin account
6. **Test Features**: Add/edit/delete phone numbers

## Production Deployment

### Backend (Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy with `npm start`

### Frontend (Vercel)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

See `backend/DEPLOYMENT.md` for detailed instructions.

## Testing

### Manual Testing Checklist
- [ ] User can register new admin
- [ ] User can login with credentials
- [ ] Admin can add phone number
- [ ] Admin can edit phone number
- [ ] Admin can delete phone number
- [ ] Admin can view all users
- [ ] Admin can grant admin access
- [ ] Admin can revoke admin access
- [ ] Admin can view activity logs
- [ ] Logout works properly

## Next Steps

1. **Customize**: Modify colors and styling in `app/globals.css`
2. **Add Features**: Create new API endpoints in backend
3. **Database Backup**: Set up MongoDB backups
4. **Monitoring**: Enable logging and monitoring
5. **Security**: Use strong JWT_SECRET and HTTPS in production

## Support & Help

- Check documentation in README.md files
- Review API endpoints in backend/README.md
- Check component structure in this guide
- Review error messages in browser console

## License

MIT

---

**Ready to go!** Your admin dashboard is fully set up and ready for use.
