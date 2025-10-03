import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;