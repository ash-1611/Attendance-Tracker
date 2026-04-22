# 📚 Attendance Tracker - MERN Stack Application

> A professional, production-ready attendance management system built with MongoDB, Express, React, and Node.js

## 🎯 Features

- ✅ **Authentication & Authorization** - JWT-based auth with role-based access control (Student, Teacher, Admin)
- ✅ **Attendance Management** - Create, read, update, and delete attendance records
- ✅ **Real-time Analytics** - View attendance statistics and trends
- ✅ **Responsive Design** - Mobile-friendly UI with modern design system
- ✅ **REST API** - Fully documented API endpoints
- ✅ **Database** - MongoDB with Mongoose schemas
- ✅ **Security** - Password hashing, JWT tokens, CORS protection
- ✅ **Docker Support** - Easy deployment with Docker Compose
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **Logging** - Server-side logging for debugging

## 📋 Project Structure

```
attendance-tracker-mern/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── models/            # MongoDB schemas
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   ├── config/            # Configuration files
│   │   ├── app.js             # Express app setup
│   │   └── index.js           # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom React hooks
│   │   ├── styles/            # CSS files
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── docker-compose.yml         # Docker services
├── package.json               # Root package.json
└── setup.sh                   # Setup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB 5+ (local or Docker)
- Docker & Docker Compose (optional)

### 1. Clone the Repository

```bash
cd attendance-tracker-mern
```

### 2. Setup Environments

Create environment files from examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_tracker
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

Update `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Attendance Tracker
REACT_APP_ENV=development
```

### 3. Install Dependencies

```bash
# Using the setup script
chmod +x setup.sh
./setup.sh

# OR manually
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

**Option B: Docker**
```bash
docker run -d --name mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0
```

### 5. Start the Application

```bash
# Development mode (both frontend and backend)
npm run dev

# OR separately:
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 📖 API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "STUDENT"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { ... }
}
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Attendance Endpoints

**Get Attendance Records**
```
GET /api/attendance?page=1&limit=20&status=PRESENT
Authorization: Bearer <token>
```

**Create Attendance Record**
```
POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "classId": "class_id",
  "className": "Mathematics 101",
  "date": "2024-01-15",
  "status": "PRESENT",
  "lecturesAttended": 1,
  "totalLectures": 1
}
```

**Get Analytics**
```
GET /api/attendance/analytics/summary
Authorization: Bearer <token>
```

**Get Defaulters**
```
GET /api/attendance/defaulters/list?classId=class_id&threshold=75
Authorization: Bearer <token>
```

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Run all tests
npm run test
```

## 🎨 Design System

### Colors
- Primary: `#5577ff`
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Neutral: Grayscale

### Spacing
- Base unit: 8px
- Scales: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)

### Typography
- Font Family: System fonts (San Francisco, Segoe UI, etc.)
- Sizes: xs to 4xl
- Weights: Light (300) to Bold (700)

## 🔐 Security Features

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Role-based access control
✅ CORS protection
✅ Request validation
✅ MongoDB injection prevention
✅ Rate limiting ready
✅ HTTPS/TLS ready for production

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT auth
- bcryptjs - Password hashing
- cors - CORS middleware
- helmet - Security headers
- morgan - HTTP logging

### Frontend
- react - UI framework
- react-router-dom - Routing
- axios - HTTP client
- framer-motion - Animations
- react-hook-form - Form management
- chart.js - Charts

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_tracker
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_ENABLE_PWA=false
```

## 🚀 Production Deployment

### Backend (Render.com)
1. Push to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push to GitHub
2. Import project to Vercel
3. Set environment variables
4. Auto-deploy

## 📞 Support & Contact

For issues or questions, please create an issue on GitHub.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Made with ❤️ for Education**
