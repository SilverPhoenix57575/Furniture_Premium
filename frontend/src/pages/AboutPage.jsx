import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Leaf, Heart } from 'lucide-react';
import { brandStory } from '../mock';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {brandStory.title}
          </h1>
          <p className="text-2xl text-gray-200">
            {brandStory.subtitle}
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="container mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
            {brandStory.story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-stone-50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg text-center card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <Award className="w-8 h-8 text-emerald-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Every piece is crafted to the highest standards, ensuring quality that lasts generations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <Users className="w-8 h-8 text-emerald-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Heritage</h3>
              <p className="text-gray-600">
                We honor traditional techniques passed down through three generations of master craftsmen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <Leaf className="w-8 h-8 text-emerald-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                All our wood comes from responsibly managed forests, ensuring environmental stewardship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <Heart className="w-8 h-8 text-emerald-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-600">
                Every artisan brings love and dedication to their craft, creating furniture with soul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Image Gallery */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            The Art of Craftsmanship
          </h2>
          <p className="text-lg text-gray-600">
            A glimpse into our workshop and the hands that create magic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="image-hover overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=800&fit=crop"
              alt="Master craftsman at work"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="image-hover overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=800&fit=crop"
              alt="Wood selection"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="image-hover overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=800&fit=crop"
              alt="Detail work"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Experience Our Craftsmanship
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-emerald-100">
            Visit our showroom in Bhubaneswar to see and feel the quality of our furniture firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/store-locator" className="btn-primary" style={{ backgroundColor: 'white', color: '#064e3b' }}>
              Visit Our Showroom
            </Link>
            <Link to="/design-services" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;