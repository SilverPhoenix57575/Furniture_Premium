# Quick Setup Guide for New Developers

## Step-by-Step Installation

### Prerequisites Check
Run these commands to verify installations:
```bash
node --version    # Should be v16 or higher
npm --version     # Should be 8 or higher
python --version  # Should be 3.8 or higher
```

If any are missing, install them first.

---

## Frontend Setup (5 minutes)

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps
```

**Important:** The `--legacy-peer-deps` flag is required due to React 19 compatibility.

### Step 3: Install Additional Package
```bash
npm install ajv@^8.0.0 --legacy-peer-deps
```

### Step 4: Start Development Server
```bash
npm start
```

✅ Frontend should now be running at http://localhost:3000

---

## Backend Setup (5 minutes)

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Create Environment File
Create a file named `.env` in the `backend` folder with:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=pankaj_furniture
CORS_ORIGINS=http://localhost:3000
```

**For MongoDB Atlas (Cloud):**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=pankaj_furniture
CORS_ORIGINS=http://localhost:3000
```

### Step 5: Start Backend Server
```bash
uvicorn server:app --reload
```

✅ Backend should now be running at http://localhost:8000

---

## Troubleshooting

### Problem: npm install fails with dependency errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Problem: "Cannot find module 'ajv'"
**Solution:**
```bash
npm install ajv@^8.0.0 --legacy-peer-deps
```

### Problem: MongoDB connection error
**Solutions:**
1. Ensure MongoDB is installed and running
2. Check `.env` file exists in backend folder
3. Verify MONGO_URL is correct
4. For Atlas, check username/password and network access

### Problem: Port already in use
**Solution:**
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## Verification Checklist

After setup, verify:
- [ ] Frontend opens at http://localhost:3000
- [ ] You can see the Pankaj Furniture homepage
- [ ] Navigation works (click on Collections, About, etc.)
- [ ] Backend API responds at http://localhost:8000/api/
- [ ] No console errors in browser (F12 → Console tab)

---

## Next Steps

1. Read the main README.md for detailed documentation
2. Check WEBSITE_ANALYSIS_REPORT.md for feature status
3. Review contracts.md for API implementation plan

---

## Quick Commands Reference

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps          # Install dependencies
npm start                                # Start dev server
npm run build                            # Build for production
```

### Backend
```bash
cd backend
pip install -r requirements.txt         # Install dependencies
uvicorn server:app --reload             # Start dev server
uvicorn server:app --host 0.0.0.0       # Start with network access
```

---

## Getting Help

If you encounter issues:
1. Check the Troubleshooting section above
2. Review error messages carefully
3. Ensure all prerequisites are installed
4. Contact: debipanda27@gmail.com
