import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { storeLocation } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pankaj Furniture
            </h3>
            <p className="text-stone-400 mb-6">
              Three generations of craftsmanship. Creating timeless furniture that tells your story.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Design Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Interior Design Consultation
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Custom Furniture
                </Link>
              </li>
              <li>
                <Link to="/design-services" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Trade Program
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-stone-400 text-sm">{storeLocation.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${storeLocation.phone}`} className="text-stone-400 hover:text-emerald-400 transition-colors">
                  {storeLocation.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${storeLocation.email}`} className="text-stone-400 hover:text-emerald-400 transition-colors">
                  {storeLocation.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-stone-400">
                <span className="font-semibold text-white">Mon-Fri:</span> {storeLocation.hours.weekday}
              </p>
              <p className="text-sm text-stone-400">
                <span className="font-semibold text-white">Sat-Sun:</span> {storeLocation.hours.weekend}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Pankaj Furniture. All rights reserved. Crafted with passion in Bhubaneswar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;