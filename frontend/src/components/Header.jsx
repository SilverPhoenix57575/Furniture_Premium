import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MapPin, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Labanya Furnitures
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-emerald-800 ${
                location.pathname === '/' ? 'text-emerald-900' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/collections"
              className={`text-sm font-medium transition-colors hover:text-emerald-800 ${
                location.pathname === '/collections' ? 'text-emerald-900' : 'text-gray-700'
              }`}
            >
              Collections
            </Link>
            <Link
              to="/lookbook"
              className={`text-sm font-medium transition-colors hover:text-emerald-800 ${
                location.pathname === '/lookbook' ? 'text-emerald-900' : 'text-gray-700'
              }`}
            >
              Lookbook
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-emerald-800 ${
                location.pathname === '/about' ? 'text-emerald-900' : 'text-gray-700'
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/design-services"
              className={`text-sm font-medium transition-colors hover:text-emerald-800 ${
                location.pathname === '/design-services' ? 'text-emerald-900' : 'text-gray-700'
              }`}
            >
              Design Services
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link
              to="/store-locator"
              className="hidden lg:flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-emerald-800 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Visit Showroom</span>
            </Link>

            <Link to="/wishlist" className="relative group">
              <Heart className="w-5 h-5 text-gray-700 group-hover:text-emerald-800 transition-colors" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-emerald-800 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/collections"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-emerald-800 transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/lookbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-emerald-800 transition-colors"
              >
                Lookbook
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-emerald-800 transition-colors"
              >
                Our Story
              </Link>
              <Link
                to="/design-services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-emerald-800 transition-colors"
              >
                Design Services
              </Link>
              <Link
                to="/store-locator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-base font-medium text-emerald-800"
              >
                <MapPin className="w-4 h-4" />
                <span>Visit Showroom</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;