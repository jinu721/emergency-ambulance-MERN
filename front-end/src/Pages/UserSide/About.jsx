import React from 'react';
import { Clock, MapPin, Phone, Shield, Truck, Heart, Award, Users } from 'lucide-react';
import Navbar from '../../Components/Navbar';


const AboutPage = () => {
  return (
    <>
        <Navbar/>
        <div className="pt-16 bg-gray-50">
        <div className="relative bg-red-600 text-white">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">

            </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                EmergencyCare is dedicated to providing rapid, professional, and compassionate emergency medical
                services to our community. We believe that everyone deserves access to immediate medical care
                during emergencies, regardless of location or circumstances.
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            </div>
        </div>

        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose EmergencyCare?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 flex justify-center">
                    <Clock className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">24/7 Availability</h3>
                <p className="text-gray-600 text-center">
                    Our emergency services are available 24 hours a day, 7 days a week, ensuring help is always at hand.
                </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 flex justify-center">
                    <Truck className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Rapid Response</h3>
                <p className="text-gray-600 text-center">
                    With strategically located ambulances, we ensure the fastest possible response times in emergencies.
                </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 flex justify-center">
                    <Shield className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Certified Professionals</h3>
                <p className="text-gray-600 text-center">
                    Our teams consist of highly trained paramedics and EMTs with extensive emergency care experience.
                </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 flex justify-center">
                    <Heart className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Compassionate Care</h3>
                <p className="text-gray-600 text-center">
                    We deliver medical care with empathy and respect, understanding the stress of medical emergencies.
                </p>
                </div>
            </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
                <div className="bg-gray-200 h-80 rounded-lg shadow-md"></div>
            </div>
            
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our History</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2018, EmergencyCare began with a small fleet of three ambulances and a team of dedicated
                emergency medical professionals committed to saving lives in our community.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                Over the years, we've expanded our services, upgraded our equipment, and continued to enhance our
                training protocols to stay at the cutting edge of emergency medical care.
                </p>
                <p className="text-gray-600 leading-relaxed">
                Today, we operate a fleet of over 20 advanced life support ambulances, serving multiple counties
                and responding to thousands of emergencies each year.
                </p>
            </div>
            </div>
        </div>

        <div className="bg-red-600 text-white py-16">
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg opacity-90">Ambulances</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">75+</div>
                <div className="text-lg opacity-90">Medical Professionals</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-lg opacity-90">Emergencies Handled</div>
                </div>
                <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">Communities Served</div>
                </div>
            </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">Dr. Sarah Johnson</h3>
                <p className="text-gray-600">Medical Director</p>
            </div>
            
            <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">Michael Chen</h3>
                <p className="text-gray-600">Operations Manager</p>
            </div>
            
            <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">Jessica Patel</h3>
                <p className="text-gray-600">Training Coordinator</p>
            </div>
            </div>
        </div>

        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                <Award className="h-16 w-16 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Excellence</h3>
                <p className="text-gray-600 text-center">
                    We strive for excellence in every aspect of our emergency medical services.
                </p>
                </div>
                
                <div className="flex flex-col items-center">
                <Users className="h-16 w-16 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Teamwork</h3>
                <p className="text-gray-600 text-center">
                    Our teams work together seamlessly to provide the best possible care in emergencies.
                </p>
                </div>
                
                <div className="flex flex-col items-center">
                <Heart className="h-16 w-16 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Compassion</h3>
                <p className="text-gray-600 text-center">
                    We treat every patient with dignity, respect, and genuine care during their time of need.
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Need Emergency Services?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Our team is ready to respond to your emergency needs 24/7. Call our emergency hotline or find available ambulances near you.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a href="tel:911" className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300 flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 911
                </a>
                <a href="/available" className="bg-gray-800 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
                <MapPin className="mr-2 h-5 w-5" />
                Find Available Ambulances
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default AboutPage;