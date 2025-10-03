import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.collection) params.append('collection', filters.collection);
  if (filters.room) params.append('room', filters.room);
  if (filters.style) params.append('style', filters.style);
  if (filters.featured !== undefined) params.append('featured', filters.featured);
  
  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Collections
export const getCollections = async () => {
  const response = await api.get('/collections');
  return response.data;
};

export const getCollection = async (id) => {
  const response = await api.get(`/collections/${id}`);
  return response.data;
};

// Static Content
export const getRooms = async () => {
  const response = await api.get('/rooms');
  return response.data;
};

export const getJournal = async () => {
  const response = await api.get('/journal');
  return response.data;
};

export const getTestimonials = async () => {
  const response = await api.get('/testimonials');
  return response.data;
};

export const getStoreLocation = async () => {
  const response = await api.get('/store-location');
  return response.data;
};

// Forms
export const submitQuoteRequest = async (data) => {
  const response = await api.post('/quote-request', data);
  return response.data;
};

export const submitConsultationRequest = async (data) => {
  const response = await api.post('/consultation-request', data);
  return response.data;
};

export const submitContactMessage = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

// Wishlist
const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const addToWishlist = async (productId) => {
  const sessionId = getSessionId();
  const response = await api.post('/wishlist', { session_id: sessionId, product_id: productId });
  return response.data;
};

export const getWishlist = async () => {
  const sessionId = getSessionId();
  const response = await api.get(`/wishlist/${sessionId}`);
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const sessionId = getSessionId();
  const response = await api.delete(`/wishlist/${sessionId}/${productId}`);
  return response.data;
};

// Reviews
export const submitReview = async (data) => {
  const response = await api.post('/reviews', data);
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await api.get(`/reviews/${productId}`);
  return response.data;
};

export const getReviewStats = async (productId) => {
  const response = await api.get(`/reviews/${productId}/stats`);
  return response.data;
};

export default api;
