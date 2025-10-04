# Labanya Furnitures Website

A modern, full-stack furniture e-commerce website built with React 19 and FastAPI.

## Tech Stack

### Frontend

- React 19.0.0 with React Router DOM 7.5.1
- Tailwind CSS 3.4.17 with custom animations
- Radix UI Components (full suite)
- React Hook Form + Zod validation
- Axios for API calls
- CRACO for custom webpack config

### Backend

- FastAPI 0.110.1
- SQLite (built-in database)
- Uvicorn ASGI server
- Pydantic for data validation
- Python 3.8+

## Prerequisites

- Node.js v16+ - [Download](https://nodejs.org/)
- Python v3.8+ - [Download](https://www.python.org/)
- SQLite (included with Python)

## Quick Start

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd Furniture_Premium/backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn server:app --reload
```

Backend runs at: <http://127.0.0.1:8000>  
API Docs: <http://127.0.0.1:8000/docs>

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd Furniture_Premium/frontend

# Install dependencies (FIRST TIME ONLY)
npm install --legacy-peer-deps

# Start React app
npm start
```

Frontend runs at: <http://localhost:3000>

## CRITICAL: Dependency Management

### SAFE Commands

```bash
npm install --legacy-peer-deps    # Install dependencies
npm start                          # Start dev server
npm run build                      # Production build
```

### NEVER RUN

```bash
npm audit fix --force    # BREAKS installation!
npm update               # Causes version conflicts
```

**Why?** The project uses React 19 with packages expecting React 18. The `--legacy-peer-deps` flag handles this safely.

## Common Issues

### Issue: npm install fails with ERESOLVE errors

**Solution:**

```bash
cd frontend
del package-lock.json
rmdir /s /q node_modules
npm install --legacy-peer-deps
```

### Issue: Port already in use

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
```

### Issue: Backend module not found

**Solution:**

```bash
cd backend
pip install --upgrade -r requirements.txt
```

## Project Structure

```text
Furniture_Premium/
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── ui/         # Radix UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/          # Route pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductListingPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities
│   │   ├── mock.js         # Mock data
│   │   ├── App.js          # Main app
│   │   └── index.js        # Entry point
│   ├── craco.config.js     # Webpack customization
│   ├── tailwind.config.js  # Tailwind setup
│   └── package.json        # Dependencies
│
├── backend/
│   ├── data/               # JSON data
│   │   ├── products.json
│   │   ├── collections.json
│   │   └── static.json
│   ├── server.py           # FastAPI app
│   ├── database.py         # SQLite setup
│   ├── email_service.py    # Email handler
│   ├── furniture.db        # Database (auto-created)
│   └── requirements.txt
│
├── tests/                  # Test files
├── README.md              # This file
├── QUICK_START.md         # Quick reference
└── SETUP_GUIDE.md         # Detailed setup
```

## Available Scripts

### Frontend Scripts

```bash
npm start          # Dev server (port 3000)
npm run build      # Production build
npm test           # Run tests
```

### Backend Scripts

```bash
uvicorn server:app --reload    # Dev server (port 8000)
python -m pytest               # Run tests
```

## Features

### Implemented

- Product catalog with filtering (collection, room, style)
- Product detail pages with image galleries
- Wishlist functionality (localStorage + database)
- Quote request forms (database-backed)
- Design consultation booking
- Responsive design (mobile-first)
- Store locator with map
- RESTful API with FastAPI
- SQLite database (auto-setup)
- Interactive API documentation

### In Progress

- Frontend-Backend integration
- Email notifications (SMTP configured)
- User authentication
- Shopping cart

### Planned

- Payment gateway integration
- Order management
- Admin dashboard
- Product reviews

## Current Status

- **Frontend:** Uses mock data from src/mock.js
- **Backend:** Fully functional API ready at /api/*
- **Database:** SQLite with auto-migration
- **Next Step:** Connect frontend to backend API

## API Reference

**Base URL:** <http://127.0.0.1:8000>  
**Docs:** <http://127.0.0.1:8000/docs> (Swagger UI)

### Products

```text
GET  /api/products              # List all (filters: collection, room, style, featured)
GET  /api/products/{id}         # Get single product
```

### Collections

```text
GET  /api/collections           # List all
GET  /api/collections/{id}      # Get single collection
```

### Static Content

```text
GET  /api/rooms                 # Room categories
GET  /api/journal               # Blog posts
GET  /api/testimonials          # Customer reviews
GET  /api/store-location        # Store info
```

### Forms

```text
POST /api/quote-request         # Request product quote
POST /api/consultation-request  # Book design consultation
POST /api/contact               # Contact form
```

### Wishlist

```text
POST   /api/wishlist                        # Add item
GET    /api/wishlist/{session_id}           # Get user wishlist
DELETE /api/wishlist/{session_id}/{prod_id} # Remove item
```

**Test the API:** Open <http://127.0.0.1:8000/docs> and try endpoints interactively

## Development Workflow

1. **Start both servers** (backend + frontend)
2. **Make changes** to code (hot reload enabled)
3. **Test in browser** at <http://localhost:3000>
4. **Check API** at <http://127.0.0.1:8000/docs>
5. **Commit changes** with clear messages

## Troubleshooting

### Dependencies broken after npm audit

```bash
cd frontend
del package-lock.json
rmdir /s /q node_modules
npm install --legacy-peer-deps
```

### React app won't start

- Check if port 3000 is free
- Verify node_modules exists
- Try: `npm install --legacy-peer-deps`

### Backend errors

- Check Python version: `python --version`
- Reinstall: `pip install -r requirements.txt`
- Verify furniture.db was created

### CORS errors in browser

- Backend must run on port 8000
- Frontend must run on port 3000
- Check backend console for CORS logs

## Resources

- **API Docs:** <http://127.0.0.1:8000/docs>
- **React Docs:** <https://react.dev>
- **FastAPI Docs:** <https://fastapi.tiangolo.com>
- **Tailwind CSS:** <https://tailwindcss.com>
- **Radix UI:** <https://www.radix-ui.com>

## License

Proprietary and confidential.

## Contact

**Developer:** <debipanda27@gmail.com>  
**Project:** Labanya Furnitures Website  
**Status:** Active Development
