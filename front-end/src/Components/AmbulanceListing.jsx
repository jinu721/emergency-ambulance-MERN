import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, X, CheckCircle, Ambulance, Star, Navigation, User, Award } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { axiosAmbulanceInstance, axiosBookingInstance } from '../axiosInstance';
import { toast } from 'react-toastify';

const AmbulanceListing = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [filteredAmbulances, setFilteredAmbulances] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useManualLocation, setUseManualLocation] = useState(true);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // Track active filter

  useEffect(() => {
    async function fetchAmbulances() {
      try {
        setLoading(true);
        const { data } = await axiosAmbulanceInstance.get('/');
        const availableAmbulances = data.ambulances.filter((x) => x.isAvailable);
        setAmbulances(availableAmbulances);
        setFilteredAmbulances(availableAmbulances);
      } catch (error) {
        toast.error("Failed to load ambulances");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAmbulances();
  }, []);

  // Apply filter when ambulances data changes or filter type changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredAmbulances(ambulances);
    } else {
      setFilteredAmbulances(ambulances.filter(ambulance => 
        ambulance.type.toLowerCase() === activeFilter.toLowerCase()
      ));
    }
  }, [ambulances, activeFilter]);

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleBooking = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setIsDialogOpen(true);
  };

  const bookAmbulance = async () => {
    try {
      if (street.trim() === "") {
        return toast.error("Street Is Required");
      }
      if (city.trim() === "") {
        return toast.error("City is Required");
      }
      if (phone.trim() === "" || !/^\+?[1-9]\d{1,14}$/.test(phone)) {
        return toast.error("Phone Number Should be valid");
      }
      
      let userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        return toast.error("Please Login First For Book");
      }
      
      const userId = JSON.parse(userInfo)?._id;
      if (!userId) {
        return toast.error("Login First For booking");
      }
      
      let data = {
        user: userId,
        dropLocation: {
          street,
          phone,
          city
        },
        ambulance: selectedAmbulance._id,
        driverId: selectedAmbulance.driverId._id
      };
      
      const response = await axiosBookingInstance.post('/', { data });
      setIsDialogOpen(false);
      toast.success("Your Booking Request Has Been Submitted");
      
      // Clear form fields
      setStreet("");
      setCity("");
      setPhone("");
    } catch (err) {
      toast.error("Booking failed. Please try again.");
      console.error(err);
    }
  };

  const getFeaturesByType = (type) => {
    if (type && type.toLowerCase() === "advanced") {
      return [
        "Advanced Life Support",
        "Critical Care Equipment",
        "Cardiac Monitoring",
        "Paramedic Team"
      ];
    }
    
    return [
      "Basic Life Support",
      "First Aid Equipment",
      "Wheelchair Access"
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl mt-16 font-bold">Available Ambulances</h1>
              <p className="text-red-100 mt-2">Find and book emergency medical transportation</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex mt-10 items-center space-x-3">
              <Clock className="h-6 w-6 text-yellow-300" />
              <div >
                <p className="text-sm font-medium">Emergency Response</p>
                <p className="text-xl font-bold">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Filters - Can be expanded in the future */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-5 w-5 text-red-500" />
            <span>Showing ambulances near your area</span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span 
              className={`${activeFilter === "all" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"} px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors`}
              onClick={() => handleFilterChange("all")}
            >
              All Types
            </span>
            <span 
              className={`${activeFilter === "advanced" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"} px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors`}
              onClick={() => handleFilterChange("advanced")}
            >
              Advanced Life Support
            </span>
            <span 
              className={`${activeFilter === "basic" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"} px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors`}
              onClick={() => handleFilterChange("basic")}
            >
              Basic Life Support
            </span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p className="text-gray-600">Loading available ambulances...</p>
          </div>
        ) : filteredAmbulances.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Ambulance className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Ambulances Available</h2>
            <p className="text-gray-600 mb-6">
              {activeFilter !== "all" 
                ? `There are currently no ${activeFilter} ambulances available in your area.` 
                : "There are currently no ambulances available in your area."}
            </p>
            <button 
              className="bg-red-600 hover:bg-red-700 text-white transition-colors py-2 px-6 rounded-lg"
              onClick={() => handleFilterChange("all")}
            >
              View All Types
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAmbulances.map((ambulance) => (
              <div key={ambulance._id || ambulance.id} className="bg-white overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Card Header - Ambulance Type Badge */}
                <div className="relative">
                  <div className="h-4 bg-gradient-to-r from-red-600 to-red-800"></div>
                  <div className="absolute -bottom-4 left-6 bg-yellow-400 text-red-700 px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    {ambulance.type === "advanced" ? "Advanced Service" : "Standard Service"}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6 pt-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <User className="w-5 h-5 mr-2 text-red-500" />
                        {ambulance?.driverId?.name || "Emergency Driver"}
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          {ambulance.isAvailable ? "Available Now" : "In Service"}
                        </span>
                        <span className="ml-2 text-gray-500 text-sm flex items-center">
                          <Award className="w-4 h-4 mr-1 text-blue-500" />
                          Certified
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 flex items-center justify-end">
                        <Clock className="w-4 h-4 mr-1 text-red-500" />
                        <span className="font-medium">{ambulance.eta || "10 min ETA"}</span>
                      </div>
                      <div className="flex items-center justify-end mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-1">(213)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {getFeaturesByType(ambulance.type).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Navigation className="w-4 h-4 mr-1 text-red-500" />
                      <span>4.2 km away</span>
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 py-2 px-5 rounded-lg flex items-center font-medium group-hover:scale-105"
                      onClick={() => handleBooking(ambulance)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Information Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Emergency Ambulance Service</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our ambulance services provide immediate medical attention and transportation to medical facilities.
              All our vehicles are equipped with life-saving equipment and staffed by certified professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Response</h3>
              <p className="text-gray-600 text-sm">
                Our ambulances are strategically located to ensure the fastest possible response times.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Medical Staff</h3>
              <p className="text-gray-600 text-sm">
                All our ambulances are staffed with certified paramedics and emergency medical technicians.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ambulance className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Advanced Equipment</h3>
              <p className="text-gray-600 text-sm">
                Our vehicles are equipped with the latest life-saving technology and medical equipment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative animate-slide-up">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-red-800 rounded-t-xl"></div>
            
            <div className="flex justify-between items-center mb-6 pt-2">
              <h2 className="text-xl font-bold text-gray-900">Book Ambulance Service</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {selectedAmbulance && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Ambulance className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedAmbulance?.driverId?.name || "Emergency Service"}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedAmbulance.eta || "Estimated arrival: 10 minutes"}
                  </p>
                  <p className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded mt-1 inline-block">
                    {selectedAmbulance.type === "advanced" ? "Advanced Life Support" : "Basic Life Support"}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Manual Location Input</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="manual-location"
                      checked={useManualLocation}
                      onChange={(e) => setUseManualLocation(e.target.checked)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="manual-location"
                      className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                        useManualLocation ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                          useManualLocation ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>

                {useManualLocation ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all"
                          placeholder="Enter your street address"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-4 h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <MapPin className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-center">Google Maps Integration</p>
                    <p className="text-gray-400 text-sm text-center mt-2">Coming soon. Please use manual input for now.</p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  onClick={bookAmbulance}
                >
                  <Ambulance className="h-5 w-5 mr-2" />
                  Confirm Emergency Booking
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  By confirming, you agree to our emergency service terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceListing;