import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { storeLocation } from '../mock';

const StoreLocatorPage = () => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.4076!2d85.8245!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE3JzQ2LjAiTiA4NcKwNDknMjguMiJF!5e0!3m2!1sen!2sin!4v1234567890`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Visit Our Showroom
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty and craftsmanship of our furniture in person. 
            Our team is ready to help you find the perfect pieces for your space.
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
                title="Pankaj Furniture Location"
              ></iframe>
            </div>
            
            {/* Directions Button */}
            <a
              href="https://share.google/Z3QVHf4usv7LI18vF"
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
                Bhubaneswar Showroom
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
                      <p><span className="font-medium">Monday - Friday:</span> {storeLocation.hours.weekday}</p>
                      <p><span className="font-medium">Saturday - Sunday:</span> {storeLocation.hours.weekend}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Explore our complete furniture collections in a beautifully designed space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Expert consultants to help you find the perfect pieces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>See and touch the quality of materials and craftsmanship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Complimentary design consultation available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-800 mr-2">•</span>
                    <span>Coffee and refreshments while you browse</span>
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
            Want to ensure we have specific pieces in stock or need dedicated time with our design team? 
            Schedule an appointment for a personalized experience.
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