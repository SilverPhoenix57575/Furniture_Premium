# API Contracts & Backend Integration Plan

## Overview
This document outlines the backend implementation for Pankaj Furniture website. Currently, the frontend is fully functional with mock data stored in `/app/frontend/src/mock.js`. The backend will integrate real data storage, form submissions, and email notifications.

## Current Mock Data (Frontend Only)
Located in: `/app/frontend/src/mock.js`

- **Collections**: 4 furniture collections with images and descriptions
- **Products**: 6 furniture products with full details, images, customization options
- **Rooms**: 5 room categories
- **Lookbook Scenes**: 3 curated room scenes with product hotspots
- **Journal Posts**: 3 blog articles
- **Testimonials**: 3 customer testimonials
- **Store Location**: Single showroom in Bhubaneswar
- **Brand Story**: Company history and values

## Backend Implementation Tasks

### 1. Database Models (MongoDB)

#### Product Model
```python
{
  "_id": ObjectId,
  "product_id": str,  # e.g., "p1"
  "name": str,
  "collection": str,
  "category": str,  # sofa, table, chair, bed, storage
  "room": str,  # living, dining, bedroom, study, outdoor
  "style": str,  # mid-century, traditional, minimalist, modern
  "price": int,
  "description": str,
  "materials": [str],
  "dimensions": {
    "width": int,
    "depth": int,
    "height": int
  },
  "designer": str,
  "designer_note": str,
  "images": [str],  # URLs
  "customizations": {
    "fabric": [str],
    "wood": [str],
    "size": [str]
  },
  "in_stock": bool,
  "featured": bool,
  "created_at": datetime,
  "updated_at": datetime
}
```

#### Quote Request Model
```python
{
  "_id": ObjectId,
  "product_id": str,
  "product_name": str,
  "customer_name": str,
  "email": str,
  "phone": str,
  "message": str,
  "customizations": dict,  # selected customizations
  "status": str,  # pending, contacted, closed
  "created_at": datetime
}
```

#### Design Consultation Model
```python
{
  "_id": ObjectId,
  "name": str,
  "email": str,
  "phone": str,
  "project_type": str,  # residential, commercial, renovation, custom
  "budget": str,  # under-5l, 5l-10l, 10l-20l, above-20l
  "message": str,
  "status": str,  # pending, scheduled, completed
  "created_at": datetime
}
```

#### Wishlist Model (Optional - currently browser storage)
```python
{
  "_id": ObjectId,
  "session_id": str,  # or user_id if auth is added
  "product_ids": [str],
  "created_at": datetime,
  "updated_at": datetime
}
```

### 2. API Endpoints

#### Products API
- `GET /api/products` - Get all products with optional filters (collection, room, style, price_range)
- `GET /api/products/{product_id}` - Get single product details
- `GET /api/products/featured` - Get featured products

#### Collections API
- `GET /api/collections` - Get all collections
- `GET /api/collections/{collection_id}` - Get collection details with products

#### Quote Requests API
- `POST /api/quotes` - Create new quote request
  - Request Body: `{ product_id, product_name, name, email, phone, message, customizations }`
  - Actions: Save to DB + Send email to `debipanda27@gmail.com`
  - Response: Success message

#### Design Consultations API
- `POST /api/consultations` - Create new consultation request
  - Request Body: `{ name, email, phone, project_type, budget, message }`
  - Actions: Save to DB + Send email to `debipanda27@gmail.com`
  - Response: Success message

#### Lookbook API (Optional)
- `GET /api/lookbook` - Get all lookbook scenes with product references

### 3. Email Integration

**Email Service**: SMTP or SendGrid (to be determined)

**Email Templates Needed**:

1. **Quote Request Email** (to business)
   - Subject: "New Quote Request: [Product Name]"
   - Body: Customer details, product info, customizations, message

2. **Quote Confirmation Email** (to customer)
   - Subject: "We received your quote request - Pankaj Furniture"
   - Body: Thank you message, what to expect next

3. **Consultation Request Email** (to business)
   - Subject: "New Design Consultation Request"
   - Body: Customer details, project type, budget, message

4. **Consultation Confirmation Email** (to customer)
   - Subject: "Your Design Consultation Request - Pankaj Furniture"
   - Body: Thank you message, next steps

### 4. Frontend Integration Changes

**Files to Modify**:

1. `/app/frontend/src/pages/ProductDetailPage.jsx`
   - Replace quote form mock submission with API call to `POST /api/quotes`

2. `/app/frontend/src/pages/DesignServicesPage.jsx`
   - Replace consultation form mock submission with API call to `POST /api/consultations`

3. `/app/frontend/src/pages/ProductListingPage.jsx`
   - Replace mock products data with API call to `GET /api/products`

4. `/app/frontend/src/pages/HomePage.jsx`
   - Replace mock data with API calls for featured products and collections

5. `/app/frontend/src/mock.js`
   - Keep for reference during development
   - Can be removed after full backend integration

### 5. Environment Variables

**Backend (.env)**:
- `MONGO_URL` - Already configured
- `DB_NAME` - Already configured
- `SMTP_HOST` - Email server host
- `SMTP_PORT` - Email server port
- `SMTP_USER` - Email username
- `SMTP_PASSWORD` - Email password
- `BUSINESS_EMAIL=debipanda27@gmail.com` - Recipient for form submissions

### 6. Testing Checklist

**Backend Testing**:
- [ ] Products API returns correct data with filters
- [ ] Quote request saves to database
- [ ] Quote request sends email to business
- [ ] Consultation request saves to database
- [ ] Consultation request sends email to business
- [ ] Email templates render correctly

**Frontend Integration Testing**:
- [ ] Product listing page loads from API
- [ ] Product detail page loads from API
- [ ] Quote form submission works with success message
- [ ] Consultation form submission works with success message
- [ ] Toast notifications display correctly

## Implementation Priority

1. **Phase 1**: Database models and seed data
2. **Phase 2**: Products API endpoints
3. **Phase 3**: Quote and consultation endpoints with email
4. **Phase 4**: Frontend integration
5. **Phase 5**: Testing and refinement

## Notes

- All form submissions should validate email format
- Phone numbers should accept Indian format (+91)
- Error handling should provide user-friendly messages
- Rate limiting should be considered for form submissions to prevent spam
- Consider adding captcha for production deployment (future enhancement)
