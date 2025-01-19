import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, X, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { axiosAmbulanceInstance, axiosBookingInstance } from '../axiosInstance';
import { toast } from 'react-toastify';

const AmbulanceListing = () => {
  const [ambulances, setAmbulances] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useManualLocation, setUseManualLocation] = useState(true);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    async function fetchAmbulances() {
      const { data } = await axiosAmbulanceInstance.get('/')
      console.log(data.ambulances)
      setAmbulances(() => {
        return data.ambulances.filter((x) => x.isAvailable)
      })
     
    }
    fetchAmbulances()
  }, [])

  const handleBooking = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setIsDialogOpen(true)
  };

  const bookAmbulance = async () => {
    try {
       if(street.trim()== ""){
        return toast.error("Street Is Required")
       }
       if(city.trim() == ""){
        return toast.error("City is Required")
       }
       if(phone.trim() == ""  || /^\+?[1-9]\d{1,14}$/.test(phone) == false    ){
        return toast.error("Phone Number Should be valid")
       }
      let userInfo = localStorage.getItem("userInfo")
      if (!userInfo) {
        return toast.error("Please Login First For Book")

      }
      console.log( JSON.parse(userInfo))
      const userId = JSON.parse(userInfo)?._id
      if(!userId){
         return toast.error("Login First For booking ")
      }
      let data = {
        user:userId,
        dropLocation: {
          street,
          phone,
          city
        },
        ambulance: selectedAmbulance._id,
        driverId: selectedAmbulance.driverId._id
      }
      const response = await axiosBookingInstance.post(`/`, {data })
      console.log(response)
      setIsDialogOpen(false)
      toast.success("Your Requests Submitted")
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Ambulances</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ambulances.map((ambulance) => (
            <div key={ambulance.id} className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{ambulance?.driverId?.name}</h3>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-2">
                    {ambulance.isAvailable ?"Available" : "In Services"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 flex items-center justify-end">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{ambulance.eta}</span>
                  </div>
                  <div className="text-yellow-500 mt-1">
                    {'★'.repeat(Math.floor(4))}
                    <span className="text-gray-400 text-sm ml-1">(213)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                { ["Basic Life Support", "First Aid Equipment", "Wheelchair Access"]?.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors py-2 px-4 rounded"
                onClick={() => handleBooking(ambulance)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Book Ambulance Service</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Manual Location Input</label>
                    <input
                      type="checkbox"
                      checked={useManualLocation}
                      onChange={(e) => setUseManualLocation(e.target.checked)}
                    />
                  </div>

                  {useManualLocation ? (
                    <div className="space-y-4">
                      <input
                        className="w-full p-2 border rounded"
                        placeholder="Street Address"
                        value={street}
                        onChange={(e) => { setStreet(e.target.value) }}
                      />
                      <input
                        className="w-full p-2 border rounded"
                        placeholder="City"
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }}
                      />
                      <input
                        className="w-full p-2 border rounded"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                      <p className="text-gray-500">Google Maps Integration Placeholder</p>
                    </div>
                  )}
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={bookAmbulance}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AmbulanceListing;