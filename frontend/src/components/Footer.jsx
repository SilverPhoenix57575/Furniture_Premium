import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { storeLocation } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section - Larger */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-bold text-white mb-4 mt-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Labanya Furnitures
            </h3>
            <p className="text-stone-400 mb-6 leading-relaxed text-base">
              Three generations of craftsmanship. Creating timeless furniture that tells your story since 1965.
            </p>
            
            {/* Social Links */}
            <div className="mb-8">
              <p className="text-sm text-stone-500 mb-3 uppercase tracking-wider">Follow Us</p>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-700 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-700 hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:bg-emerald-700 hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-lg mt-8">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Design Services
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-lg mt-8">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Custom Furniture
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Trade Program
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Space Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-lg mt-8">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <a 
                    href="https://maps.app.goo.gl/e3RVkrN8ES5nVhSG9" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    Plot No-368, Infocity Ave, Sishu Vihar,<br />Patia, Bhubaneswar, Odisha 751024
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 group">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a 
                    href={`tel:${storeLocation.phone}`} 
                    className="text-stone-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {storeLocation.phone}
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a 
                    href={`mailto:${storeLocation.email}`} 
                    className="text-stone-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {storeLocation.email}
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3 mt-6 pt-6 border-t border-stone-800 mb-8">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-stone-400">
                      <span className="text-white font-medium">Mon-Fri:</span> {storeLocation.hours.weekday}
                    </p>
                    <p className="text-stone-400 mt-1 mb-4">
                      <span className="text-white font-medium">Sat-Sun:</span> {storeLocation.hours.weekend}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-500 text-sm">
              &copy; {new Date().getFullYear()} Labanya Furnitures. All rights reserved.
            </p>
            <p className="text-stone-500 text-sm">
              Crafted with passion in Bhubaneswar, Odisha
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;