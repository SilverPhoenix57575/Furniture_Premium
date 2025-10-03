import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getProductReviews, getReviewStats, submitReview } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ total_reviews: 0, average_rating: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    rating: 5,
    review_text: ''
  });

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const [reviewsData, statsData] = await Promise.all([
        getProductReviews(productId),
        getReviewStats(productId)
      ]);
      setReviews(reviewsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview({
        product_id: productId,
        ...formData
      });
      toast.success('Review submitted successfully!');
      setFormData({ customer_name: '', customer_email: '', rating: 5, review_text: '' });
      setShowForm(false);
      loadReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="border-t pt-12 mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Customer Reviews
        </h2>
        
        {stats.total_reviews > 0 ? (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(stats.average_rating))}
              <span className="text-2xl font-bold">{stats.average_rating}</span>
            </div>
            <span className="text-gray-600">
              Based on {stats.total_reviews} {stats.total_reviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">No reviews yet. Be the first to review this product!</p>
        )}

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-secondary"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Write Your Review</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating *</label>
              {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review *</label>
              <Textarea
                required
                value={formData.review_text}
                onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                placeholder="Share your experience with this product..."
                rows={5}
              />
            </div>

            <Button type="submit" className="bg-emerald-900 hover:bg-emerald-800">
              Submit Review
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold">{review.customer_name}</span>
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
