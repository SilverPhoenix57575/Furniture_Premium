import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getStoreLocation } from '../services/api';

const StoreLocatorPage = () => {
  const [storeLocation, setStoreLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreLocation = async () => {
      try {
        const data = await getStoreLocation();
        setStoreLocation(data);
      } catch (error) {
        console.error('Error fetching store location:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreLocation();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  }

  if (!storeLocation) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Store information not available</p></div>;
  }
  const mapUrl = `https://www.google.com/maps?q=20.34294,85.8211837&hl=en&z=17&output=embed`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Visit Our Showroom
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit us at Infocity, Patia to experience premium furniture collections. 
            Same-day delivery available across Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-lg shadow-lg h-[500px] mb-6">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Labanya Furnitures Location"
              ></iframe>
            </div>
            
            {/* Directions Button */}
            <a
              href="https://maps.app.goo.gl/e3RVkrN8ES5nVhSG9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block"
            >
              Get Directions
            </a>
          </div>

          {/* Store Information */}
          <div className="order-1 lg:order-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Labanya Furnitures Showroom
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-gray-700">{storeLocation.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                    <a
                      href={`tel:${storeLocation.phone}`}
                      className="text-gray-700 hover:text-emerald-800 transition-colors"
                    >
                      {storeLocation.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a
                      href={`mailto:${storeLocation.email}`}
                      className="text-gray-700 hover:text-emerald-800 transition-colors"
                    >
                      {storeLocation.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Opening Hours</h3>
                    <div className="text-gray-700 space-y-1">
                      <p><span className="font-medium">Monday - Sunday:</span> {storeLocation.hours.weekday}</p>
                      <p className="text-sm text-gray-500 mt-2">Same-day delivery available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Why Visit Us</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Premium furniture collections at Infocity, Patia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Same-day delivery service across Bhubaneswar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Expert guidance for your home furnishing needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Quality craftsmanship and materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Open 7 days a week, 9 AM - 9 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-stone-50 rounded-2xl p-16">
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Plan Your Visit
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Located at Infocity, Patia. Open daily from 9 AM to 9 PM. 
            Contact us to check availability or schedule a visit.
          </p>
          <a href={`mailto:${storeLocation.email}?subject=Showroom Visit Appointment`} className="btn-primary">
            Schedule an Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreLocatorPage;