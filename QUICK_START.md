# Quick Start Guide - Furniture Website

## ✅ FIXED: Your dependencies are now properly installed!

## Current Status
- ✅ Frontend dependencies: 1453 packages installed
- ✅ react-scripts: v5.0.1 (working)
- ✅ date-fns: v3.6.0 (compatible with react-day-picker)
- ✅ All React 19 components ready

## How to Run the Project

### Step 1: Start the Backend (Terminal 1)

```bash
cd "A:\OneDrive\Desktop\Folders\Project\demo website\Furniture\Demo Website Premium\Furniture_Premium\backend"

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Start the server
uvicorn server:app --reload
```

**Backend will run at:** http://127.0.0.1:8000
**API Docs:** http://127.0.0.1:8000/docs

### Step 2: Start the Frontend (Terminal 2)

```bash
cd "A:\OneDrive\Desktop\Folders\Project\demo website\Furniture\Demo Website Premium\Furniture_Premium\frontend"

# Start the React app
npm start
```

**Frontend will run at:** http://localhost:3000

## ⚠️ IMPORTANT: What NOT to Do

### ❌ NEVER run these commands:
```bash
npm audit fix --force    # This BREAKS your installation!
npm update               # Can cause version conflicts
```

### ✅ If you see vulnerabilities:
- **Ignore them** - They are mostly dev dependencies and don't affect production
- The warnings about deprecated packages are normal for React 18/19 projects
- Only fix vulnerabilities if they are in production dependencies AND critical

## Common Issues & Solutions

### Issue: "Cannot find module 'react-scripts'"
**Solution:**
```bash
cd frontend
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Port 8000 already in use
**Solution:**
```bash
# Find and kill the process
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Backend won't start
**Solution:**
```bash
cd backend
pip install --upgrade -r requirements.txt
```

## Project Structure

```
Furniture_Premium/
├── frontend/              # React app (Port 3000)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app
│   └── package.json
│
└── backend/              # FastAPI server (Port 8000)
    ├── data/            # JSON data files
    ├── server.py        # Main API
    ├── database.py      # SQLite setup
    └── furniture.db     # Database (auto-created)
```

## Available Features

### Frontend (React 19)
- ✅ Product browsing & filtering
- ✅ Product detail pages
- ✅ Wishlist functionality
- ✅ Quote request forms
- ✅ Design consultation booking
- ✅ Responsive design
- ✅ Store locator

### Backend (FastAPI)
- ✅ RESTful API endpoints
- ✅ SQLite database
- ✅ CORS enabled for localhost:3000
- ✅ Interactive API docs (Swagger)

## Testing the Setup

1. **Backend Test:**
   - Open: http://127.0.0.1:8000/docs
   - Try: GET /api/products
   - Should return product list

2. **Frontend Test:**
   - Open: http://localhost:3000
   - Should see the homepage
   - Navigate to collections page

3. **Integration Test:**
   - Open browser console (F12)
   - Check for any API errors
   - Test adding items to wishlist

## Development Tips

1. **Hot Reload:** Both frontend and backend support hot reload
2. **API Docs:** Always check http://127.0.0.1:8000/docs for API reference
3. **Console Logs:** Keep browser console open to catch errors
4. **Database:** SQLite file is at `backend/furniture.db`

## Next Steps

1. ✅ Dependencies installed
2. ✅ Configuration fixed
3. 🔄 Start both servers
4. 🔄 Test the application
5. 🔄 Begin development

## Need Help?

- Check the main README.md for detailed documentation
- API documentation: http://127.0.0.1:8000/docs
- Contact: debipanda27@gmail.com

---

**Last Updated:** After fixing npm audit damage
**Status:** Ready to run ✅
