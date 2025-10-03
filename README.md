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
- MongoDB with Motor (async driver)
- Python 3.8+

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas

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

# Create a virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=pankaj_furniture
CORS_ORIGINS=http://localhost:3000
```

For MongoDB Atlas, use:
```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/
DB_NAME=pankaj_furniture
CORS_ORIGINS=http://localhost:3000
```

### 5. Start the Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Start the FastAPI server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at **http://localhost:8000**

## Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   uvicorn server:app --reload
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to **http://localhost:3000**

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

### Issue: Backend won't start - MongoDB connection error
**Solution:**
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string in `.env`
- Verify network connectivity

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
│   ├── server.py           # Main server file
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables (create this)
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
- ✅ Wishlist functionality (localStorage)
- ✅ Quote request forms
- ✅ Design consultation booking
- ✅ Responsive design
- ✅ Store locator
- ⚠️ Backend API integration (in progress)
- ⚠️ Email notifications (pending)

## Development Notes

- The frontend currently uses mock data from `src/mock.js`
- Backend API endpoints need to be implemented for full functionality
- Email service configuration required for form submissions

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
