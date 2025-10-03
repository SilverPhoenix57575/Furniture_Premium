from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import logging
from pathlib import Path
from database import get_db
from email_service import (
    send_quote_notification,
    send_consultation_notification,
    send_contact_notification,
    send_customer_confirmation
)

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

class Review(BaseModel):
    product_id: str
    customer_name: str
    customer_email: EmailStr
    rating: int
    review_text: str
    photo_url: Optional[str] = None

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
    
    # Send email notifications
    quote_data = {
        'name': request.name,
        'email': request.email,
        'phone': request.phone,
        'product_ids': request.product_ids,
        'message': request.message
    }
    send_quote_notification(quote_data)
    send_customer_confirmation(request.email, request.name, 'quote request')
    
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
    
    # Send email notifications
    consultation_data = {
        'name': request.name,
        'email': request.email,
        'phone': request.phone,
        'project_type': request.project_type,
        'budget': request.budget,
        'message': request.message
    }
    send_consultation_notification(consultation_data)
    send_customer_confirmation(request.email, request.name, 'consultation request')
    
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
    
    # Send email notifications
    contact_data = {
        'name': message.name,
        'email': message.email,
        'subject': message.subject,
        'message': message.message
    }
    send_contact_notification(contact_data)
    send_customer_confirmation(message.email, message.name, 'message')
    
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

# Reviews
@api_router.post("/reviews")
def create_review(review: Review):
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO reviews (product_id, customer_name, customer_email, rating, review_text, photo_url) VALUES (?, ?, ?, ?, ?, ?)",
        (review.product_id, review.customer_name, review.customer_email, review.rating, review.review_text, review.photo_url)
    )
    conn.commit()
    review_id = cursor.lastrowid
    conn.close()
    return {"id": review_id, "message": "Review submitted successfully"}

@api_router.get("/reviews/{product_id}")
def get_product_reviews(product_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, product_id, customer_name, rating, review_text, photo_url, created_at FROM reviews WHERE product_id = ? ORDER BY created_at DESC",
        (product_id,)
    )
    reviews = []
    for row in cursor.fetchall():
        reviews.append({
            "id": row[0],
            "product_id": row[1],
            "customer_name": row[2],
            "rating": row[3],
            "review_text": row[4],
            "photo_url": row[5],
            "created_at": row[6]
        })
    conn.close()
    return reviews

@api_router.get("/reviews/{product_id}/stats")
def get_review_stats(product_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT COUNT(*), AVG(rating) FROM reviews WHERE product_id = ?",
        (product_id,)
    )
    row = cursor.fetchone()
    conn.close()
    return {
        "total_reviews": row[0] or 0,
        "average_rating": round(row[1], 1) if row[1] else 0
    }

app.include_router(api_router)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/")
def root():
    return {"message": "Pankaj Furniture API", "status": "running"}

@app.get("/favicon.ico")
def favicon():
    return {"message": "No favicon"}
