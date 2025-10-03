import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Download, Share2, Ruler, Package, Sparkles, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProduct, getProducts, addToWishlist, submitQuoteRequest } from '../services/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import ProductReviews from '../components/ProductReviews';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
        
        const allProducts = await getProducts();
        const related = allProducts.filter(p => 
          p.id !== productData.id && 
          (p.collection === productData.collection || p.room === productData.room)
        ).slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <Link to="/collections" className="btn-primary">Browse Collections</Link>
        </div>
      </div>
    );
  }

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(product.id);
      window.dispatchEvent(new Event('storage'));
      toast.success('Added to wishlist!');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info('Already in wishlist');
      } else {
        toast.error('Failed to add to wishlist');
      }
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const customizationText = Object.entries(selectedCustomizations)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      
      await submitQuoteRequest({
        ...quoteForm,
        product_ids: product.id,
        message: `${quoteForm.message}\n\nCustomizations: ${customizationText || 'None'}`
      });
      
      toast.success('Quote request sent! We\'ll contact you soon.');
      setShowQuoteModal(false);
      setQuoteForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit quote request');
    }
  };



  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const downloadTearsheet = () => {
    const tearsheetContent = `
PANKAJ FURNITURE - PRODUCT TEARSHEET
${'='.repeat(50)}

Product: ${product.name}
Collection: ${product.collection.toUpperCase()}
Price: ₹${product.price.toLocaleString('en-IN')}

DESCRIPTION:
${product.description}

DIMENSIONS:
Width: ${product.dimensions.width} cm
Depth: ${product.dimensions.depth} cm
Height: ${product.dimensions.height} cm

MATERIALS:
${product.materials.map(m => `• ${m}`).join('\n')}

DESIGNER: ${product.designer}
DESIGNER'S NOTE: "${product.designerNote}"

CUSTOMIZATION OPTIONS:
${Object.entries(product.customizations || {}).map(([key, values]) => 
  `${key.toUpperCase()}: ${values.join(', ')}`
).join('\n')}

CONTACT:
Email: debipanda27@gmail.com
Phone: +91 98765 43210
Address: Plot No-97, 7th St, Bapuji Nagar, Bhubaneswar, Odisha 751009

${'='.repeat(50)}
Pankaj Furniture - Three Generations of Craftsmanship
    `;

    const blob = new Blob([tearsheetContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.name.replace(/\s+/g, '_')}_Tearsheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast.success('Tearsheet downloaded!');
  };

  const shareProduct = async () => {
    const shareData = {
      title: `${product.name} - Pankaj Furniture`,
      text: `Check out this ${product.name} from Pankaj Furniture! ₹${product.price.toLocaleString('en-IN')}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback: Copy link to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
        } catch (clipboardErr) {
          toast.error('Unable to share. Please copy the URL manually.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-emerald-800">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections" className="hover:text-emerald-800">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-lg mb-4 group">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`overflow-hidden rounded-lg border-2 transition-all ${
                    currentImageIndex === index ? 'border-emerald-900' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-20 md:h-32 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-xs md:text-sm font-medium text-emerald-800 uppercase tracking-wide">
                {product.collection}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-emerald-900 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Customization Options */}
            {product.customizations && (
              <div className="mb-8 space-y-6">
                {Object.entries(product.customizations).map(([key, options]) => (
                  <div key={key}>
                    <h3 className="text-sm md:text-base font-semibold mb-3 capitalize">{key}</h3>
                    <div className="flex flex-wrap gap-3">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedCustomizations({ ...selectedCustomizations, [key]: option })}
                          className={`px-3 md:px-4 py-2 border-2 rounded-lg transition-all text-sm md:text-base ${
                            selectedCustomizations[key] === option
                              ? 'border-emerald-900 bg-emerald-50'
                              : 'border-gray-300 hover:border-emerald-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="w-full btn-primary text-base md:text-lg py-3 md:py-4"
              >
                Request a Quote
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link to="/store-locator" className="btn-secondary text-center py-3 text-sm md:text-base">
                  <MapPin className="inline w-4 md:w-5 h-4 md:h-5 mr-2" />
                  <span className="hidden md:inline">Find in Showroom</span>
                  <span className="md:hidden">Showroom</span>
                </Link>
                
                <button onClick={handleAddToWishlist} className="btn-secondary py-3 text-sm md:text-base">
                  <Heart className="inline w-4 md:w-5 h-4 md:h-5 mr-2" />
                  <span className="hidden md:inline">Add to Wishlist</span>
                  <span className="md:hidden">Wishlist</span>
                </button>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={downloadTearsheet}
                  className="flex-1 text-xs md:text-sm text-gray-700 hover:text-emerald-800 transition-colors py-2"
                >
                  <Download className="inline w-4 h-4 mr-2" />
                  Download Tearsheet
                </button>
                <button 
                  onClick={shareProduct}
                  className="flex-1 text-xs md:text-sm text-gray-700 hover:text-emerald-800 transition-colors py-2"
                >
                  <Share2 className="inline w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Tabbed Information */}
            <div className="border-t pt-8">
              <div className="space-y-6">
                {/* Details & Dimensions */}
                <div>
                  <h3 className="text-sm md:text-base font-semibold flex items-center mb-3">
                    <Ruler className="w-4 md:w-5 h-4 md:h-5 mr-2 text-emerald-800" />
                    Details & Dimensions
                  </h3>
                  <div className="text-sm md:text-base text-gray-700 space-y-2">
                    <p><span className="font-medium">Width:</span> {product.dimensions.width} cm</p>
                    <p><span className="font-medium">Depth:</span> {product.dimensions.depth} cm</p>
                    <p><span className="font-medium">Height:</span> {product.dimensions.height} cm</p>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-sm md:text-base font-semibold flex items-center mb-3">
                    <Package className="w-4 md:w-5 h-4 md:h-5 mr-2 text-emerald-800" />
                    Materials & Care
                  </h3>
                  <ul className="text-sm md:text-base text-gray-700 space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index}>• {material}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    Clean with a soft, dry cloth. Avoid harsh chemicals. Keep away from direct sunlight.
                  </p>
                </div>

                {/* Designer's Note */}
                <div>
                  <h3 className="text-sm md:text-base font-semibold flex items-center mb-3">
                    <Sparkles className="w-4 md:w-5 h-4 md:h-5 mr-2 text-emerald-800" />
                    Designer's Note
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 italic">"{product.designerNote}"</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">— {product.designer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Complete the Look
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group card-hover"
                >
                  <div className="overflow-hidden rounded-lg mb-4 image-hover">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-800 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-emerald-900 font-semibold">₹{relatedProduct.price.toLocaleString('en-IN')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Request a Quote
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <Input
                required
                value={quoteForm.name}
                onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                required
                type="email"
                value={quoteForm.email}
                onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <Input
                required
                type="tel"
                value={quoteForm.phone}
                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={quoteForm.message}
                onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                placeholder="Any specific requirements or questions?"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800">
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;