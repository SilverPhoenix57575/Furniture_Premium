# Pankaj Furniture Website

A modern, full-stack furniture e-commerce website built with React and FastAPI.

## Tech Stack

### Frontend
- React 19.0.0
- React Router DOM
- Tailwind CSS
- Radix UI Components
- Axios for API calls

### Backend
- FastAPI
- SQLite (built-in, no installation needed)
- JSON files for static content
- Python 3.8+

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **No database installation needed** - SQLite is built into Python

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Furniture-by-emergent
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (use --legacy-peer-deps flag to resolve dependency conflicts)
npm install --legacy-peer-deps

# Install ajv package (required for webpack)
npm install ajv@^8.0.0 --legacy-peer-deps

# Start the development server
npm start
```

The frontend will start at **http://localhost:3000**

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (no virtual environment needed for quick start)
pip install -r requirements.txt

# Or with virtual environment (recommended):
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### 4. Database Setup

**No manual setup needed!** The SQLite database (`furniture.db`) is automatically created when you start the server.

The `.env` file is already configured with:
```env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 5. Start the Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Start the FastAPI server
uvicorn server:app --reload
```

The backend API will be available at:
- **http://127.0.0.1:8000** - API endpoints
- **http://127.0.0.1:8000/docs** - Interactive API documentation (Swagger UI)
- **http://127.0.0.1:8000/api/products** - Example: Get all products

## Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd Furniture-by-emergent/backend
   uvicorn server:app --reload
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd Furniture-by-emergent/frontend
   npm start
   ```

3. Open your browser and navigate to **http://localhost:3000**

4. Test the API at **http://127.0.0.1:8000/docs**

## Common Issues & Solutions

### Issue: `Cannot find module 'ajv/dist/compile/codegen'`
**Solution:**
```bash
cd frontend
npm install ajv@^8.0.0 --legacy-peer-deps
```

### Issue: `ERESOLVE unable to resolve dependency tree`
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: Backend won't start - Module not found
**Solution:**
```bash
cd Furniture-by-emergent/backend
pip install -r requirements.txt
uvicorn server:app --reload
```

### Issue: Port 3000 or 8000 already in use
**Solution:**
```bash
# Kill the process using the port
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

## Project Structure

```
Furniture-by-emergent/
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities
│   │   ├── mock.js          # Mock data
│   │   └── App.js           # Main app component
│   └── package.json
│
├── backend/                 # FastAPI backend
│   ├── data/               # JSON data files
│   │   ├── products.json   # Product catalog
│   │   ├── collections.json # Collections
│   │   └── static.json     # Rooms, journal, testimonials
│   ├── server.py           # Main server file
│   ├── database.py         # SQLite database setup
│   ├── furniture.db        # SQLite database (auto-created)
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
│
└── README.md
```

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend
- `uvicorn server:app --reload` - Start development server
- `pytest` - Run tests

## Features

- ✅ Product browsing and filtering
- ✅ Product detail pages with image galleries
- ✅ Wishlist functionality (database-backed)
- ✅ Quote request forms (saved to database)
- ✅ Design consultation booking (saved to database)
- ✅ Responsive design
- ✅ Store locator
- ✅ Backend API with SQLite database
- ✅ RESTful API endpoints
- ⚠️ Frontend-Backend integration (pending)
- ⚠️ Email notifications (pending)

## Development Notes

- The frontend currently uses mock data from `src/mock.js`
- Backend API is fully functional with all endpoints ready
- Frontend needs to be updated to use API endpoints instead of mock data
- Email service configuration required for form submissions

## API Endpoints

### Products
- `GET /api/products` - List all products (supports filters: collection, room, style, featured)
- `GET /api/products/{id}` - Get single product details

### Collections
- `GET /api/collections` - List all collections
- `GET /api/collections/{id}` - Get single collection

### Static Content
- `GET /api/rooms` - List all rooms
- `GET /api/journal` - List journal posts
- `GET /api/testimonials` - List testimonials
- `GET /api/store-location` - Get store information

### Forms (POST)
- `POST /api/quote-request` - Submit quote request
- `POST /api/consultation-request` - Submit consultation request
- `POST /api/contact` - Send contact message

### Wishlist
- `POST /api/wishlist` - Add item to wishlist
- `GET /api/wishlist/{session_id}` - Get user's wishlist
- `DELETE /api/wishlist/{session_id}/{product_id}` - Remove from wishlist

**Interactive API Documentation:** http://127.0.0.1:8000/docs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact: debipanda27@gmail.com
