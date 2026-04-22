# 🚀 Quick Start Guide - Attendance Tracker MERN

Get your Attendance Tracker up and running in 5 minutes!

---

## 📋 Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB 5+** - [Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm 9+** - Comes with Node.js
- **Docker & Docker Compose** (optional) - [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

Verify installation:
```bash
node --version  # Should be v18+
npm --version   # Should be 9+
```

---

## ⚡ Option 1: Local Installation (5 minutes)

### Step 1: Setup Environment Files

```bash
# Create .env files from examples
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Step 2: Configure Backend

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_tracker
JWT_SECRET=your_super_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

### Step 3: Configure Frontend

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Step 4: Install Dependencies

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh

# OR manually:
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Step 5: Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Copy connection string
4. Update `MONGODB_URI` in `backend/.env`

**Option C: Docker**
```bash
docker run -d --name mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0
```

### Step 6: Start Application

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm start
```

### Step 7: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

---

## 🐳 Option 2: Docker Installation (3 minutes)

### Step 1: Create .env Files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Step 2: Update backend/.env for Docker

```env
MONGODB_URI=mongodb://root:password@mongodb:27017/attendance_tracker?authSource=admin
JWT_SECRET=your_super_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

### Step 3: Build and Start

```bash
# Build images and start services
docker-compose up --build

# Or just start (if already built)
docker-compose up
```

### Step 4: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://root:password@localhost:27017

### Step 5: Stop Services

```bash
docker-compose down
```

---

## 📱 First Login

### Create an Account

1. Go to http://localhost:3000
2. Click "Sign up"
3. Fill in details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Password123
   - Role: STUDENT
4. Click "Create Account"

### Login

1. Use the email and password you just created
2. You'll be redirected to Dashboard

---

## 🎯 What You Can Do

### As a Student
- ✅ View your attendance records
- ✅ See attendance percentage
- ✅ Update your profile
- ✅ View dashboard with attendance summary

### As a Teacher
- ✅ Mark attendance for students
- ✅ View attendance records
- ✅ See attendance analytics
- ✅ View defaulters (low attendance)
- ✅ Update student records

### As an Admin
- ✅ All teacher permissions
- ✅ Manage users
- ✅ View system analytics
- ✅ Generate reports

---

## 📊 API Endpoints

### Authentication

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123",
    "role": "STUDENT"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'

# Get Current User
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Attendance

```bash
# Get Records
curl http://localhost:5000/api/attendance \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Analytics
curl http://localhost:5000/api/attendance/analytics/summary \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create Record (Teacher Only)
curl -X POST http://localhost:5000/api/attendance \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "classId": "CLASS001",
    "className": "Mathematics 101",
    "date": "2024-01-15",
    "status": "PRESENT",
    "lecturesAttended": 1,
    "totalLectures": 1
  }'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Check MongoDB is running: `brew services list` (macOS)
- Or start with Docker: `docker run -d -p 27017:27017 mongo:7.0`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default: `http://localhost:3000`

---

## 📚 Next Steps

1. **Explore the Code**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`

2. **Read Documentation**
   - Main README: `README.md`
   - Implementation Summary: `IMPLEMENTATION_SUMMARY.md`

3. **Add Features**
   - Bulk CSV upload
   - PDF export
   - Email notifications
   - Advanced analytics

4. **Deploy to Production**
   - Backend: Render.com
   - Frontend: Vercel
   - Database: MongoDB Atlas

---

## 🆘 Need Help?

### Check Logs
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
cd frontend && npm start

# Docker logs
docker-compose logs -f backend
```

### Common Issues
- **500 Server Error**: Check backend logs, database connection
- **Can't access backend**: Verify port 5000 is open and backend is running
- **Can't login**: Verify MongoDB has user data, check backend logs

---

## 🎉 You're All Set!

Your Attendance Tracker is running! Start by:
1. Creating an account
2. Exploring the dashboard
3. Checking out the code
4. Customizing for your needs

**Happy coding! 🚀**
