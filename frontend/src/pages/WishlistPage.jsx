import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart } from 'lucide-react';
import { products } from '../mock';
import { toast } from 'sonner';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
    
    const handleStorageChange = () => {
      loadWishlist();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistProducts = products.filter(p => savedWishlist.includes(p.id));
    setWishlist(wishlistProducts);
  };

  const removeFromWishlist = (productId) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = savedWishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('storage'));
    loadWishlist();
    toast.success('Removed from wishlist');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            My Wishlist
          </h1>
          <p className="text-lg text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding pieces you love to your wishlist
            </p>
            <Link to="/collections" className="btn-primary">
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="group card-hover relative">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg mb-4 image-hover">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{product.collection.toUpperCase()}</p>
                  <p className="text-emerald-900 font-semibold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                </Link>
                
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 transition-colors group"
                >
                  <Trash2 className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;