import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { getProducts } from '../services/api';

const ComparePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
      
      // Get product IDs from URL
      const ids = searchParams.get('ids')?.split(',').filter(Boolean) || [];
      const selected = products.filter(p => ids.includes(p.id));
      setCompareProducts(selected);
    };
    fetchProducts();
  }, [searchParams]);

  const addProduct = (product) => {
    if (compareProducts.length >= 3) return;
    if (compareProducts.find(p => p.id === product.id)) return;
    
    const updated = [...compareProducts, product];
    setCompareProducts(updated);
    setSearchParams({ ids: updated.map(p => p.id).join(',') });
    setShowAddProduct(false);
  };

  const removeProduct = (productId) => {
    const updated = compareProducts.filter(p => p.id !== productId);
    setCompareProducts(updated);
    setSearchParams({ ids: updated.map(p => p.id).join(',') });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Compare Products
          </h1>
          <p className="text-lg text-gray-600">
            Compare up to 3 products side-by-side
          </p>
        </div>

        {compareProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-8">No products selected for comparison</p>
            <Link to="/collections" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 p-4 text-left bg-stone-50">Feature</th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border-b-2 border-gray-300 p-4 bg-stone-50 relative">
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-full"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Link to={`/product/${product.id}`} className="text-lg font-semibold hover:text-emerald-800">
                        {product.name}
                      </Link>
                    </th>
                  ))}
                  {compareProducts.length < 3 && (
                    <th className="border-b-2 border-gray-300 p-4 bg-stone-50">
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <Plus className="w-8 h-8 text-gray-400" />
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">Price</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4 text-emerald-900 font-bold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>
                
                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">Collection</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4 capitalize">
                      {product.collection}
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>

                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">Dimensions</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4">
                      W: {product.dimensions.width}cm<br />
                      D: {product.dimensions.depth}cm<br />
                      H: {product.dimensions.height}cm
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>

                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">Materials</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4">
                      {product.materials.map((m, i) => (
                        <div key={i}>• {m}</div>
                      ))}
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>

                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">Designer</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4">
                      {product.designer}
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>

                <tr>
                  <td className="border-b border-gray-200 p-4 font-semibold">In Stock</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border-b border-gray-200 p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? 'Yes' : 'No'}
                      </span>
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="border-b border-gray-200 p-4"></td>}
                </tr>

                <tr>
                  <td className="p-4"></td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <Link to={`/product/${product.id}`} className="btn-primary w-full text-center block">
                        View Details
                      </Link>
                    </td>
                  ))}
                  {compareProducts.length < 3 && <td className="p-4"></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Add Product to Compare</h2>
                <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allProducts
                  .filter(p => !compareProducts.find(cp => cp.id === p.id))
                  .map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addProduct(product)}
                      className="text-left border border-gray-200 rounded-lg p-4 hover:border-emerald-600 hover:shadow-lg transition-all"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-emerald-900 font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
