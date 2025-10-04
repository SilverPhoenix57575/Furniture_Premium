import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LookbookPage from './pages/LookbookPage';
import AboutPage from './pages/AboutPage';
import DesignServicesPage from './pages/DesignServicesPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design-services" element={<DesignServicesPage />} />
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors toastOptions={{ style: { maxWidth: '180px', padding: '8px 12px', fontSize: '14px' } }} />
      </BrowserRouter>
    </div>
  );
}

export default App;