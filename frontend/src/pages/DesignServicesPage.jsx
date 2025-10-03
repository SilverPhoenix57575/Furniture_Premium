import React, { useState } from 'react';
import { Compass, Pencil, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const DesignServicesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { submitConsultationRequest } = await import('../services/api');
      await submitConsultationRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message
      });
      toast.success('Thank you! Our design team will contact you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    }
  };

  const services = [
    {
      icon: <Compass className="w-10 h-10" />,
      title: 'Space Planning',
      description: 'Our designers will help you optimize your space layout for maximum functionality and aesthetic appeal.'
    },
    {
      icon: <Pencil className="w-10 h-10" />,
      title: 'Custom Design',
      description: 'Need something unique? We can create bespoke furniture pieces tailored to your exact specifications.'
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: 'Complete Furnishing',
      description: 'From concept to installation, we handle everything to transform your space into a masterpiece.'
    }
  ];

  const process = [
    { step: '01', title: 'Initial Consultation', description: 'We discuss your vision, needs, and budget in a complimentary meeting.' },
    { step: '02', title: 'Design Proposal', description: 'Our team creates detailed plans with 3D visualizations and product selections.' },
    { step: '03', title: 'Refinement', description: 'We refine the design based on your feedback until it\'s perfect.' },
    { step: '04', title: 'Implementation', description: 'We coordinate delivery and installation for a seamless experience.' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Design Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Expert guidance to create spaces that reflect your unique style and needs
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            What We Offer
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive design solutions for your home or office
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-200 p-8 rounded-lg card-hover text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 text-emerald-900">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone-50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              A seamless journey from concept to completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-emerald-100 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-emerald-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Program */}
      <section className="container py-24">
        <div className="bg-emerald-900 text-white rounded-2xl p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              For Design Professionals
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Join our Trade Program and enjoy exclusive benefits including special pricing, priority access to new collections, 
              and dedicated support for your projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                <span className="text-left">Trade discounts on all products</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                <span className="text-left">Dedicated account manager</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                <span className="text-left">Priority project support</span>
              </div>
            </div>
            <p className="text-sm text-emerald-200 mb-6">
              Requirements: Valid business license and professional credentials
            </p>
            <button className="btn-primary" style={{ backgroundColor: 'white', color: '#064e3b' }}>
              Apply for Trade Program
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="container pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Book a Free Consultation
            </h2>
            <p className="text-lg text-gray-600">
              Let's discuss how we can bring your vision to life
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Type *</label>
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="renovation">Renovation</option>
                  <option value="custom">Custom Furniture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estimated Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select range</option>
                <option value="under-5l">Under ₹5 Lakhs</option>
                <option value="5l-10l">₹5-10 Lakhs</option>
                <option value="10l-20l">₹10-20 Lakhs</option>
                <option value="above-20l">Above ₹20 Lakhs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tell us about your project</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your ideas, requirements, timeline, or any specific questions..."
                rows={6}
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 py-6 text-lg">
              Submit Consultation Request
            </Button>

            <p className="text-sm text-gray-500 text-center">
              We'll get back to you within 24 hours. Your information is kept confidential.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default DesignServicesPage;