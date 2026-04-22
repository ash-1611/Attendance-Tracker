#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=====================================${NC}"
echo -e "${YELLOW}Attendance Tracker MERN Setup${NC}"
echo -e "${YELLOW}=====================================${NC}\n"

# Check Node version
echo -e "${YELLOW}Checking Node.js version...${NC}"
node_version=$(node -v)
echo -e "${GREEN}Node.js version: $node_version${NC}\n"

# Create .env files
echo -e "${YELLOW}Creating .env files...${NC}"

if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo -e "${GREEN}✓ Created backend/.env${NC}"
else
  echo -e "${YELLOW}⚠ backend/.env already exists${NC}"
fi

if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
  echo -e "${YELLOW}⚠ frontend/.env already exists${NC}"
fi

echo ""

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"

echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update backend/.env with your MongoDB URI and JWT_SECRET"
echo "2. Update frontend/.env with your API URL"
echo "3. Start MongoDB (locally or via Docker)"
echo "4. Run: npm run dev"
echo ""
