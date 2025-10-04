import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, SlidersHorizontal, GitCompare } from 'lucide-react';
import { getProducts, getCollections, addToWishlist, getWishlist, removeFromWishlist } from '../services/api';
import { toast } from 'sonner';

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    collection: searchParams.get('collection') || '',
    room: searchParams.get('room') || '',
    style: '',
    priceRange: 'all'
  });
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, collectionsData, wishlistData] = await Promise.all([
          getProducts(),
          getCollections(),
          getWishlist()
        ]);
        setProducts(productsData);
        setCollections(collectionsData);
        setWishlistItems(wishlistData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    const handleStorageChange = async () => {
      try {
        const wishlistData = await getWishlist();
        setWishlistItems(wishlistData);
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.collection && product.collection !== filters.collection) return false;
      if (filters.room && product.room !== filters.room) return false;
      if (filters.style && product.style !== filters.style) return false;
      
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-50k' && product.price >= 50000) return false;
        if (filters.priceRange === '50k-100k' && (product.price < 50000 || product.price >= 100000)) return false;
        if (filters.priceRange === '100k-150k' && (product.price < 100000 || product.price >= 150000)) return false;
        if (filters.priceRange === 'above-150k' && product.price < 150000) return false;
      }
      
      return true;
    });
  }, [products, filters]);

  const handleAddToWishlist = async (productId, e) => {
    e.preventDefault();
    const isInWishlist = wishlistItems.includes(productId);
    
    // Update UI immediately
    if (isInWishlist) {
      setWishlistItems(prev => prev.filter(id => id !== productId));
    } else {
      setWishlistItems(prev => [...prev, productId]);
    }
    
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
        toast.success('Removed from wishlist', { duration: 1500 });
      } else {
        await addToWishlist(productId);
        toast.success('Added to wishlist', { duration: 1500 });
      }
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      // Revert UI on error
      if (isInWishlist) {
        setWishlistItems(prev => [...prev, productId]);
      } else {
        setWishlistItems(prev => prev.filter(id => id !== productId));
      }
      toast.error('Failed to update wishlist');
    }
  };

  const styles = [...new Set(products.map(p => p.style))];
  const rooms = [...new Set(products.map(p => p.room))];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Collections
            </h1>
            <p className="text-lg text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} of exceptional craftsmanship
            </p>
          </div>
          {compareList.length > 0 && (
            <button
              onClick={() => navigate(`/compare?ids=${compareList.join(',')}`)}
              className="btn-primary flex items-center gap-2"
            >
              <GitCompare className="w-5 h-5" />
              Compare ({compareList.length})
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4"
              >
                <span className="font-medium">Filters</span>
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              <div className={`bg-white border border-gray-200 rounded-lg p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <h3 className="font-semibold text-lg mb-4">Filter By</h3>

                {/* Collection Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Collection</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="collection"
                        checked={filters.collection === ''}
                        onChange={() => setFilters({ ...filters, collection: '' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">All Collections</span>
                    </label>
                    {collections.map(collection => (
                      <label key={collection.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="collection"
                          checked={filters.collection === collection.id}
                          onChange={() => setFilters({ ...filters, collection: collection.id })}
                          className="w-4 h-4 text-emerald-900"
                        />
                        <span className="text-sm">{collection.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Room Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Room</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="room"
                        checked={filters.room === ''}
                        onChange={() => setFilters({ ...filters, room: '' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">All Rooms</span>
                    </label>
                    {rooms.map(room => (
                      <label key={room} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="room"
                          checked={filters.room === room}
                          onChange={() => setFilters({ ...filters, room: room })}
                          className="w-4 h-4 text-emerald-900"
                        />
                        <span className="text-sm capitalize">{room}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Style Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Style</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="style"
                        checked={filters.style === ''}
                        onChange={() => setFilters({ ...filters, style: '' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">All Styles</span>
                    </label>
                    {styles.map(style => (
                      <label key={style} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="style"
                          checked={filters.style === style}
                          onChange={() => setFilters({ ...filters, style: style })}
                          className="w-4 h-4 text-emerald-900"
                        />
                        <span className="text-sm capitalize">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === 'all'}
                        onChange={() => setFilters({ ...filters, priceRange: 'all' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">All Prices</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === 'under-50k'}
                        onChange={() => setFilters({ ...filters, priceRange: 'under-50k' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">Under ₹50,000</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === '50k-100k'}
                        onChange={() => setFilters({ ...filters, priceRange: '50k-100k' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">₹50,000 - ₹1,00,000</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === '100k-150k'}
                        onChange={() => setFilters({ ...filters, priceRange: '100k-150k' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">₹1,00,000 - ₹1,50,000</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === 'above-150k'}
                        onChange={() => setFilters({ ...filters, priceRange: 'above-150k' })}
                        className="w-4 h-4 text-emerald-900"
                      />
                      <span className="text-sm">Above ₹1,50,000</span>
                    </label>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => setFilters({ collection: '', room: '', style: '', priceRange: 'all' })}
                  className="w-full text-sm text-emerald-800 font-medium hover:text-emerald-900 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No products found matching your filters.</p>
                <button
                  onClick={() => setFilters({ collection: '', room: '', style: '', priceRange: 'all' })}
                  className="mt-4 btn-secondary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group card-hover relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-lg mb-4 image-hover">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-80 object-cover"
                        />
                        <button
                          onClick={(e) => handleAddToWishlist(product.id, e)}
                          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className={`w-5 h-5 transition-colors ${
                            wishlistItems.includes(product.id) 
                              ? 'text-emerald-600 fill-emerald-600' 
                              : 'text-gray-700'
                          }`} />
                        </button>
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{product.collection.toUpperCase()}</p>
                      <p className="text-emerald-900 font-semibold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                    </Link>
                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={compareList.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (compareList.length >= 3) {
                              toast.info('You can compare up to 3 products');
                              return;
                            }
                            setCompareList([...compareList, product.id]);
                          } else {
                            setCompareList(compareList.filter(id => id !== product.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">Add to compare</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;