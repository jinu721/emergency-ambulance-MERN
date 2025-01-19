import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import Navbar from '../../Components/Navbar';

const ContactPage = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl opacity-90">
            We're here to help 24/7. Reach out to us for any emergency assistance or inquiries.
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Phone className="w-10 h-10 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emergency Hotline</h3>
            <p className="text-gray-600 mb-4">Available 24/7 for emergency response</p>
            <p className="text-2xl font-bold text-red-600">1-800-EMERGENCY</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Mail className="w-10 h-10 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">For non-emergency inquiries</p>
            <p className="text-lg text-red-600">support@emergency.care</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Clock className="w-10 h-10 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
            <p className="text-gray-600 mb-4">Emergency Response</p>
            <p className="text-lg font-semibold">24 Hours / 7 Days</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              For non-emergency inquiries, please fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text"
                    placeholder="John" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text"
                    placeholder="Doe" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  placeholder="john@example.com" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  placeholder="+1 (555) 000-0000" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors min-h-[150px]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Send Message
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Location</h2>
            <p className="text-gray-600 mb-8">
              Visit our main emergency response center or reach out through our various contact channels.
            </p>
            
            <div className="p-6 bg-white rounded-lg shadow-lg mb-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Main Response Center</h3>
                  <p className="text-gray-600">
                    123 Emergency Street<br />
                    Medical District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-red-600" />
                Quick Response
              </h3>
              <p className="text-gray-600 mb-4">
                For faster response to non-emergency inquiries, you can also reach us through our social channels:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Twitter: @EmergencyCare</p>
                <p>Facebook: /EmergencyCare</p>
                <p>LinkedIn: /company/emergency-care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;