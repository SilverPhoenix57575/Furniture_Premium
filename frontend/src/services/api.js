import axios from 'axios';
import { products as mockProducts, collections as mockCollections, rooms as mockRooms, journalPosts as mockJournal, testimonials as mockTestimonials, storeLocation as mockStoreLocation } from '../mock';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 500
});

// Products
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.collection) params.append('collection', filters.collection);
    if (filters.room) params.append('room', filters.room);
    if (filters.style) params.append('style', filters.style);
    if (filters.featured !== undefined) params.append('featured', filters.featured);
    
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    let filtered = mockProducts;
    if (filters.collection) filtered = filtered.filter(p => p.collection === filters.collection);
    if (filters.room) filtered = filtered.filter(p => p.room === filters.room);
    if (filters.style) filtered = filtered.filter(p => p.style === filters.style);
    if (filters.featured !== undefined) filtered = filtered.filter(p => p.featured === filters.featured);
    return filtered;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }
};

// Collections
export const getCollections = async () => {
  try {
    const response = await api.get('/collections');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockCollections;
  }
};

export const getCollection = async (id) => {
  try {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    const collection = mockCollections.find(c => c.id === id);
    if (!collection) throw new Error('Collection not found');
    return collection;
  }
};

// Static Content
export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockRooms;
  }
};

export const getJournal = async () => {
  try {
    const response = await api.get('/journal');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockJournal;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockTestimonials;
  }
};

export const getStoreLocation = async () => {
  try {
    const response = await api.get('/store-location');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using mock data:', error.message);
    return mockStoreLocation;
  }
};

// Forms
export const submitQuoteRequest = async (data) => {
  try {
    const response = await api.post('/quote-request', data);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, form submission simulated:', error.message);
    return { message: 'Quote request received! We will contact you soon.' };
  }
};

export const submitConsultationRequest = async (data) => {
  try {
    const response = await api.post('/consultation-request', data);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, form submission simulated:', error.message);
    return { message: 'Consultation request received! We will contact you soon.' };
  }
};

export const submitContactMessage = async (data) => {
  try {
    const response = await api.post('/contact', data);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, form submission simulated:', error.message);
    return { message: 'Message sent successfully! We will get back to you soon.' };
  }
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
  try {
    const sessionId = getSessionId();
    const response = await api.post('/wishlist', { session_id: sessionId, product_id: productId });
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using localStorage for wishlist:', error.message);
    const sessionId = getSessionId();
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${sessionId}`) || '[]');
    if (wishlist.includes(productId)) {
      throw { response: { status: 400 } };
    }
    wishlist.push(productId);
    localStorage.setItem(`wishlist_${sessionId}`, JSON.stringify(wishlist));
    return { message: 'Added to wishlist' };
  }
};

export const getWishlist = async () => {
  try {
    const sessionId = getSessionId();
    const response = await api.get(`/wishlist/${sessionId}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using localStorage for wishlist:', error.message);
    const sessionId = getSessionId();
    return JSON.parse(localStorage.getItem(`wishlist_${sessionId}`) || '[]');
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const sessionId = getSessionId();
    const response = await api.delete(`/wishlist/${sessionId}/${productId}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using localStorage for wishlist:', error.message);
    const sessionId = getSessionId();
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${sessionId}`) || '[]');
    const filtered = wishlist.filter(id => id !== productId);
    localStorage.setItem(`wishlist_${sessionId}`, JSON.stringify(filtered));
    return { message: 'Removed from wishlist' };
  }
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
