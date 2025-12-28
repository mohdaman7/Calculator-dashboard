# Admin Dashboard Backend API

Professional Node.js/Express backend for managing whitelisted phone numbers and admin access.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, environment)
│   ├── models/          # MongoDB schemas (Admin, PhoneNumber, User, ActivityLog)
│   ├── controllers/     # Route controllers (auth, phone, user, activity)
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication, error handling, logging
│   ├── utils/           # Validators and helpers
│   └── index.js         # Main server file
├── scripts/             # Seed data and migrations
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md           # Documentation
```

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login

### Phone Numbers
- `GET /api/phones` - Get all whitelisted phone numbers
- `GET /api/phones/:id` - Get specific phone number
- `POST /api/phones` - Add new phone number (protected)
- `PUT /api/phones/:id` - Update phone number (protected)
- `DELETE /api/phones/:id` - Delete phone number (protected)

### Users & Admin
- `GET /api/users` - Get all users (protected)
- `POST /api/users/grant-admin` - Grant admin access (protected)
- `POST /api/users/revoke-admin` - Revoke admin access (protected)

### Activity Logs
- `GET /api/activities` - Get activity logs (protected)
- `GET /api/activities/admin/:adminId` - Get admin's activities (protected)

### Health Check
- `GET /health` - Server health status

## Database Models

### Admin
- email (unique)
- password (hashed)
- name
- role (admin | super-admin)
- isActive
- timestamps

### PhoneNumber
- phoneNumber (unique)
- userName
- isActive
- addedBy (reference to Admin)
- lastModifiedBy (reference to Admin)
- timestamps

### User
- name
- email (unique)
- phoneNumber (unique)
- role (user | admin)
- isWhitelisted
- adminId (reference to Admin)
- timestamps

### ActivityLog
- adminId (reference to Admin)
- adminEmail
- action (ADD_PHONE, EDIT_PHONE, DELETE_PHONE, GRANT_ADMIN, REVOKE_ADMIN, LOGIN)
- resourceType (phone, user, admin, auth)
- resourceId
- details
- ipAddress
- status (success | failed)
- timestamps

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Environment Variables

```
MONGODB_URI      - MongoDB connection string
JWT_SECRET       - Secret key for JWT signing
JWT_EXPIRE       - JWT token expiration time
PORT             - Server port (default: 5000)
NODE_ENV         - Environment (development | production)
CORS_ORIGIN      - Frontend URL for CORS
```

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Input validation
- Activity logging for all admin actions
- IP address tracking

## Development

Install nodemon for automatic restart:
```bash
npm install -D nodemon
npm run dev
```

## Production Deployment

1. Update environment variables for production
2. Use a production MongoDB instance
3. Set strong JWT_SECRET
4. Enable HTTPS
5. Configure proper CORS origins
6. Set NODE_ENV=production
