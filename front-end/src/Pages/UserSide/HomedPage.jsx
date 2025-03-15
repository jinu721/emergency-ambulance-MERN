import { Ambulance, Clock, Heart, MapPin, Phone, Shield, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-white"></div>
        </div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-block px-4 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm mb-4">
                <p className="text-sm font-medium tracking-wider">EMERGENCY MEDICAL SERVICES</p>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Swift Response <span className="block">When Every</span> <span className="text-yellow-300">Minute Counts</span>
              </h1>
              
              <p className="text-xl opacity-90 font-light">
                Professional emergency ambulance services available 24/7. 
                State-of-the-art equipment and highly trained medical professionals.
              </p>
              
              <div className="flex flex-wrap gap-5 pt-4">
                <button className="group flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-105">
                  <Phone className="w-5 h-5" />
                  <span>Call Emergency: 911</span>
                </button>
                <button className="flex items-center gap-2 bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-all duration-300">
                  <Users className="w-5 h-5" />
                  <span>Our Services</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute -top-20 -left-20 w-full h-full bg-white opacity-10 rounded-full transform -translate-x-1/2"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                <img 
                  src="/homeimge.png" 
                  alt="Emergency Ambulance Service" 
                  className="rounded-xl object-cover w-full h-full shadow-inner"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-red-700 font-bold px-6 py-3 rounded-lg shadow-lg transform rotate-6">
                  Rapid Response
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold text-red-600">500+</p>
              <p className="text-gray-600 text-sm mt-2">AMBULANCES</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-red-600">15k+</p>
              <p className="text-gray-600 text-sm mt-2">EMERGENCY CALLS</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-red-600">99%</p>
              <p className="text-gray-600 text-sm mt-2">SUCCESS RATE</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-red-600">24/7</p>
              <p className="text-gray-600 text-sm mt-2">AVAILABILITY</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Emergency Services</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              We provide comprehensive emergency medical services with state-of-the-art equipment and highly trained professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-red-500">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ambulance className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Emergency Transport</h3>
              <p className="text-gray-600">
                Rapid medical transportation with advanced life support equipment for critical emergencies.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-red-500">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Critical Care</h3>
              <p className="text-gray-600">
                Specialized care for patients requiring intensive monitoring during transportation.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-red-500">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Medical Assistance</h3>
              <p className="text-gray-600">
                On-site emergency medical assistance with trained paramedics and emergency equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              We are committed to providing the fastest and most reliable emergency services
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support Center</h3>
                <p className="text-gray-600 mb-6">
                  Our emergency dispatch center is staffed round-the-clock with trained professionals ready to respond to your calls immediately.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Phone className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Immediate call response</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Users className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Trained emergency dispatchers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Medical guidance while en route</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 p-6 rounded-2xl ">
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className=" p-6 rounded-2xl ">
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced GPS Tracking</h3>
                <p className="text-gray-600 mb-6">
                  Our fleet is equipped with state-of-the-art GPS tracking systems that allow us to dispatch the nearest available ambulance to your location.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Real-time location tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Optimized route planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Shield className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">Reduced response times</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Emergency? Don't Wait!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our emergency response team is ready to assist you 24/7.
            Call us immediately for prompt medical assistance.
          </p>
          <button className="bg-white text-red-600 px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
            Call Emergency Hotline
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;