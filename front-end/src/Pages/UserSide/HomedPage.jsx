import { Ambulance, Clock, MapPin, Menu, Phone, X } from 'lucide-react';
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';

function HomedPage() {
   
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
       <Navbar/>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative bg-red-50 overflow-hidden">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in">
                  24/7 Emergency
                  <span className="text-red-600"> Ambulance</span> Service
                </h1>
                <p className="text-lg text-gray-600 animate-fade-in-delay">
                  Professional medical transportation services available round the clock.
                  Your safety is our priority.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                    Call Now
                  </button>
                  <button className="bg-white text-red-600 px-8 py-3 rounded-full border-2 border-red-600 hover:bg-red-50 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="lg:block relative animate-float">
                <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-xl p-6">
                  <img
                    src="/api/placeholder/800/600"
                    alt="Ambulance service"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Phone className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock emergency support team ready to respond to your calls.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Clock className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Rapid response times with our strategically located ambulance fleet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MapPin className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
              <p className="text-gray-600">
                Real-time GPS tracking for accurate and efficient emergency response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomedPage