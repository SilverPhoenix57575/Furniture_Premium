from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import logging
from pathlib import Path
from database import get_db

ROOT_DIR = Path(__file__).parent
DATA_DIR = ROOT_DIR / "data"

app = FastAPI(title="Pankaj Furniture API")
api_router = APIRouter(prefix="/api")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load JSON data
def load_json(filename):
    with open(DATA_DIR / filename, 'r', encoding='utf-8') as f:
        return json.load(f)

products_data = load_json('products.json')
collections_data = load_json('collections.json')
static_data = load_json('static.json')

# Pydantic Models
class QuoteRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    product_ids: str
    message: Optional[str] = None

class ConsultationRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    project_type: str
    budget: Optional[str] = None
    message: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class WishlistItem(BaseModel):
    session_id: str
    product_id: str

# Products Endpoints
@api_router.get("/products")
def get_products(
    collection: Optional[str] = None,
    room: Optional[str] = None,
    style: Optional[str] = None,
    featured: Optional[bool] = None
):
    filtered = products_data
    if collection:
        filtered = [p for p in filtered if p['collection'] == collection]
    if room:
        filtered = [p for p in filtered if p['room'] == room]
    if style:
        filtered = [p for p in filtered if p['style'] == style]
    if featured is not None:
        filtered = [p for p in filtered if p['featured'] == featured]
    return filtered

@api_router.get("/products/{product_id}")
def get_product(product_id: str):
    product = next((p for p in products_data if p['id'] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Collections Endpoints
@api_router.get("/collections")
def get_collections():
    return collections_data

@api_router.get("/collections/{collection_id}")
def get_collection(collection_id: str):
    collection = next((c for c in collections_data if c['id'] == collection_id), None)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection

# Static Content Endpoints
@api_router.get("/rooms")
def get_rooms():
    return static_data['rooms']

@api_router.get("/journal")
def get_journal():
    return static_data['journal']

@api_router.get("/testimonials")
def get_testimonials():
    return static_data['testimonials']

@api_router.get("/store-location")
def get_store_location():
    return static_data['storeLocation']

# Quote Request
@api_router.post("/quote-request")
def create_quote_request(request: QuoteRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO quote_requests (name, email, phone, product_ids, message) VALUES (?, ?, ?, ?, ?)",
        (request.name, request.email, request.phone, request.product_ids, request.message)
    )
    conn.commit()
    request_id = cursor.lastrowid
    conn.close()
    return {"id": request_id, "message": "Quote request submitted successfully"}

# Consultation Request
@api_router.post("/consultation-request")
def create_consultation_request(request: ConsultationRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO consultation_requests (name, email, phone, project_type, budget, message) VALUES (?, ?, ?, ?, ?, ?)",
        (request.name, request.email, request.phone, request.project_type, request.budget, request.message)
    )
    conn.commit()
    request_id = cursor.lastrowid
    conn.close()
    return {"id": request_id, "message": "Consultation request submitted successfully"}

# Contact Message
@api_router.post("/contact")
def create_contact_message(message: ContactMessage):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        (message.name, message.email, message.subject, message.message)
    )
    conn.commit()
    message_id = cursor.lastrowid
    conn.close()
    return {"id": message_id, "message": "Message sent successfully"}

# Wishlist
@api_router.post("/wishlist")
def add_to_wishlist(item: WishlistItem):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO wishlist (session_id, product_id) VALUES (?, ?)",
            (item.session_id, item.product_id)
        )
        conn.commit()
        item_id = cursor.lastrowid
        conn.close()
        return {"id": item_id, "message": "Added to wishlist"}
    except:
        conn.close()
        raise HTTPException(status_code=400, detail="Item already in wishlist")

@api_router.get("/wishlist/{session_id}")
def get_wishlist(session_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT product_id FROM wishlist WHERE session_id = ?", (session_id,))
    items = [row[0] for row in cursor.fetchall()]
    conn.close()
    return items

@api_router.delete("/wishlist/{session_id}/{product_id}")
def remove_from_wishlist(session_id: str, product_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM wishlist WHERE session_id = ? AND product_id = ?", (session_id, product_id))
    conn.commit()
    conn.close()
    return {"message": "Removed from wishlist"}

app.include_router(api_router)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/")
def root():
    return {"message": "Pankaj Furniture API", "status": "running"}

@app.get("/favicon.ico")
def favicon():
    return {"message": "No favicon"}
