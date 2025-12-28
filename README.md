# Admin Dashboard - Next.js Frontend

Professional admin dashboard for managing whitelisted phone numbers. Built with Next.js, React, and TypeScript.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.jsx           # Home/login page
│   └── layout.jsx         # Root layout
├── components/
│   ├── auth/              # Authentication components
│   │   └── LoginForm.jsx
│   ├── dashboard/         # Dashboard components
│   │   ├── Dashboard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── views/         # Different dashboard views
│   │   │   ├── PhoneNumbersView.jsx
│   │   │   ├── UsersView.jsx
│   │   │   └── ActivityLogsView.jsx
│   │   ├── forms/         # Form components
│   │   │   └── PhoneNumberForm.jsx
│   │   └── tables/        # Table components
│   │       └── PhoneNumberTable.jsx
│   └── ui/                # shadcn/ui components
├── services/
│   └── api/               # API service layers
│       ├── authService.js
│       ├── phoneService.js
│       ├── userService.js
│       └── activityService.js
├── hooks/                 # Custom React hooks
│   └── useAuth.js
├── utils/                 # Utility functions
│   ├── api.js
│   ├── validators.js
│   └── formatting.js
├── styles/                # Global styles
│   └── globals.css
└── package.json          # Dependencies
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development
```bash
npm run dev
```

Application will run on http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Features

- **Admin Authentication** - Secure login system with JWT
- **Phone Number Management** - Add, edit, delete, and manage whitelisted phone numbers
- **User & Admin Management** - View users and manage admin access
- **Activity Logs** - Track all admin actions with timestamps and details
- **Responsive Design** - Works on desktop and tablet devices
- **Clean Light Theme** - Professional UI with blue accent colors
- **Real-time Updates** - Instant dashboard updates after changes

## Components

### Authentication
- `LoginForm` - Admin login interface

### Dashboard
- `Dashboard` - Main dashboard container
- `Sidebar` - Navigation sidebar with menu
- `PhoneNumbersView` - Phone number CRUD interface
- `UsersView` - User and admin management
- `ActivityLogsView` - Activity log viewer
- `PhoneNumberForm` - Form for adding/editing numbers
- `PhoneNumberTable` - Phone number table with actions

## Services

### authService
```javascript
await authService.login(email, password)
await authService.register(name, email, password)
```

### phoneService
```javascript
await phoneService.getAllPhones()
await phoneService.getPhoneById(id)
await phoneService.addPhone({ phoneNumber, userName })
await phoneService.updatePhone(id, data)
await phoneService.deletePhone(id)
```

### userService
```javascript
await userService.getAllUsers()
await userService.grantAdminAccess(userId)
await userService.revokeAdminAccess(userId)
```

### activityService
```javascript
await activityService.getActivityLogs(filters)
await activityService.getActivityByAdmin(adminId)
```

## Custom Hooks

### useAuth
```javascript
const { isAuthenticated, isLoading, admin } = useAuth()
```

## Utilities

### validators.js
- `validateEmail(email)` - Email validation
- `validatePhone(phone)` - Phone number validation
- `validatePassword(password)` - Password strength check

### formatting.js
- `formatDate(date, format)` - Date formatting
- `formatDateTime(date)` - DateTime formatting
- `formatPhoneNumber(phone)` - Phone number formatting

### api.js
- `getAuthHeader()` - Get authorization header with token
- `handleApiError(error)` - Centralized error handling

## Environment Variables

```
NEXT_PUBLIC_API_URL           - Backend API base URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL - Development redirect URL
```

## Authentication Flow

1. User visits the application
2. System checks for stored JWT token
3. If no token, shows login form
4. User enters credentials
5. Backend validates and returns JWT
6. Token stored in localStorage
7. User redirected to dashboard
8. Token included in all API requests

## Styling

- Built with Tailwind CSS v4
- Uses shadcn/ui components
- Design tokens defined in `globals.css`
- Responsive mobile-first design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Server-side rendering with Next.js
- Optimized images with next/image
- Code splitting and lazy loading
- CSS minification with Tailwind

## Security

- JWT-based authentication
- Secure localStorage usage
- CORS configuration on backend
- Input validation on both client and server
- Secure API communication

## Development Tips

1. **Add new API service**: Create file in `src/services/api/`
2. **Add new component**: Create in appropriate `src/components/` folder
3. **Add new page**: Create in `src/app/`
4. **Add new hook**: Create in `src/hooks/`
5. **Add new utility**: Create in `src/utils/`

## Troubleshooting

### CORS Error
- Ensure backend CORS_ORIGIN includes your frontend URL
- Check NEXT_PUBLIC_API_URL is correct

### Authentication Error
- Clear localStorage and login again
- Check JWT_SECRET matches between frontend and backend
- Verify token hasn't expired

### API Connection Error
- Ensure backend is running on configured port
- Check network tab in DevTools
- Verify NEXT_PUBLIC_API_URL environment variable

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
1. Build the app: `npm run build`
2. Deploy the `.next` folder
3. Set environment variables on the platform

## License

MIT
