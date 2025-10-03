import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { lookbookScenes, products } from '../mock';
import { X } from 'lucide-react';

const LookbookPage = () => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const getProduct = (productId) => products.find(p => p.id === productId);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Inspiration Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore beautifully curated spaces and discover how our pieces come together to create stunning interiors.
            Click on any hotspot to shop the look.
          </p>
        </div>

        {/* Lookbook Scenes */}
        <div className="space-y-24">
          {lookbookScenes.map((scene) => (
            <div key={scene.id} className="group">
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {scene.title}
              </h2>
              
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-auto"
                />
                
                {/* Product Hotspots */}
                {scene.products.map((productSpot, index) => {
                  const product = getProduct(productSpot.productId);
                  if (!product) return null;
                  
                  return (
                    <div
                      key={index}
                      className="absolute cursor-pointer"
                      style={{ 
                        left: `${productSpot.x}%`, 
                        top: `${productSpot.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => setSelectedScene({ scene, product })}
                    >
                      {/* Hotspot Dot */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border-2 border-emerald-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <div className="w-3 h-3 bg-emerald-900 rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Hover Card */}
                        {hoveredProduct === product.id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white rounded-lg shadow-2xl p-4 w-64 z-10">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.collection.toUpperCase()}</p>
                            <p className="text-emerald-900 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Products List Below Image */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Featured in this scene:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {scene.products.map((productSpot) => {
                    const product = getProduct(productSpot.productId);
                    if (!product) return null;
                    
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group card-hover"
                      >
                        <div className="overflow-hidden rounded-lg mb-3 image-hover">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <h4 className="font-semibold text-sm mb-1 group-hover:text-emerald-800 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-emerald-900 font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-stone-50 rounded-2xl p-16">
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Need Help Designing Your Space?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert design team can help you create the perfect space with our curated furniture collections.
          </p>
          <Link to="/design-services" className="btn-primary">
            Book a Free Consultation
          </Link>
        </div>
      </div>

      {/* Product Detail Modal (Optional Enhancement) */}
      {selectedScene && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedScene(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedScene(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedScene.product.images[0]}
                alt={selectedScene.product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedScene.product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{selectedScene.product.collection.toUpperCase()}</p>
                <p className="text-2xl text-emerald-900 font-semibold mb-4">
                  ₹{selectedScene.product.price.toLocaleString('en-IN')}
                </p>
                <p className="text-gray-700 mb-6">{selectedScene.product.description.substring(0, 150)}...</p>
                <Link
                  to={`/product/${selectedScene.product.id}`}
                  className="btn-primary inline-block"
                  onClick={() => setSelectedScene(null)}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookbookPage;