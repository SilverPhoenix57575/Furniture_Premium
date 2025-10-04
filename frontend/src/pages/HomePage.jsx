import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { getProducts, getCollections, getRooms, getJournal, getTestimonials } from '../services/api';

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [journalPosts, setJournalPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, productsData, roomsData, journalData, testimonialsData] = await Promise.all([
          getCollections(),
          getProducts({ featured: true }),
          getRooms(),
          getJournal(),
          getTestimonials()
        ]);
        setCollections(collectionsData);
        setFeaturedProducts(productsData);
        setRooms(roomsData);
        setJournalPosts(journalData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl mb-6 animate-[slideUp_1s_ease-out]" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="inline-block animate-[slideUp_1s_ease-out_0.1s_both]">Timeless</span>{' '}
            <span className="inline-block animate-[slideUp_1s_ease-out_0.2s_both]">Design,</span><br />
            <span className="inline-block animate-[slideUp_1s_ease-out_0.3s_both]">Modern</span>{' '}
            <span className="inline-block animate-[slideUp_1s_ease-out_0.4s_both]">Living</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_0.6s_both]">
            Three generations of master craftsmen creating furniture that becomes family heirlooms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out_0.8s_both]">
            <Link to="/collections" className="btn-primary">
              Explore Our Collections
            </Link>
            <Link to="/store-locator" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              <MapPin className="inline w-5 h-5 mr-2" />
              Visit Our Showroom
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Curated Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover furniture that blends heritage craftsmanship with contemporary design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.filter(c => c.featured).map((collection) => (
              <Link
                key={collection.id}
                to={`/collections?collection=${collection.id}`}
                className="group card-hover"
              >
                <div className="relative overflow-hidden rounded-lg h-96 image-hover">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {collection.name}
                    </h3>
                    <p className="text-gray-200 mb-4">{collection.description}</p>
                    <span className="inline-flex items-center text-emerald-300 font-medium group-hover:translate-x-2 transition-transform">
                      Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Room */}
      <section className="section-spacing bg-stone-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shop by Room
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect pieces for every space in your home
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.id}
                to={`/collections?room=${room.id}`}
                className="group card-hover"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square image-hover">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-600 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold group-hover:text-emerald-300 transition-colors">{room.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Signature Pieces
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked favorites from our master craftsmen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <div key={product.id}>
                <Link to={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-lg mb-4 image-hover card-hover">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-emerald-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{product.collection.toUpperCase()}</p>
                  <p className="text-emerald-900 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/collections" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Snippet */}
      <section className="section-spacing bg-stone-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="image-hover overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=1000&fit=crop"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Three Generations of Excellence
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Since 1965, Pankaj Furniture has been synonymous with exceptional craftsmanship and timeless design. 
                What began in a small workshop in Bhubaneswar has grown into a celebrated furniture house, 
                preserving traditional Indian woodworking techniques while embracing contemporary aesthetics.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Every piece that leaves our workshop carries the soul of the artisan who crafted it, 
                the history of techniques passed down through centuries, and our commitment to sustainable practices.
              </p>
              <Link to="/about" className="btn-secondary">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Journal
            </h2>
            <p className="text-lg text-gray-600">
              Stories of craftsmanship, design inspiration, and sustainable practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalPosts.map((post) => (
              <article key={post.id} className="group card-hover">
                <div className="overflow-hidden rounded-lg mb-4 image-hover">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                  <span className="text-emerald-800 font-medium">{post.category}</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-800 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center text-emerald-800 font-medium group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-stone-800 p-8 rounded-lg">
                <p className="text-lg text-stone-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-stone-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;