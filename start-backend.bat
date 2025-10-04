@echo off
echo Starting Pankaj Furniture Backend Server...
cd backend
python -m pip install -r requirements.txt
echo.
echo Starting server at http://127.0.0.1:8000
python -m uvicorn server:app --reload
pause