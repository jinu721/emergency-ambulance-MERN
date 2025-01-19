import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, X, Eye, Check, ChevronDown, PhoneCall } from 'lucide-react';
import Navbar from '../../Components/Navbar';
import { axiosBookingInstance } from '../../axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../authContext';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const { isLoggedIn, role } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if(!isLoggedIn || role != "driver"){
         navigate("/")
    }
    async function fetchDriverRequests() {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
        const { data } = await axiosBookingInstance.get(`/${userId}`);
        setRequests(data.bookings);
      } catch (err) {
       console.log(err)
      }

    }
    fetchDriverRequests();
  }, []);

  const handleResponse = async (requestId, response) => {
    try {
      if (response == "accept") {
        const response = await axiosBookingInstance.get(`/accept/${requestId}`)
        if (response) {
          toast.success("Accepted")
        }
      } else {
        const response = await axiosBookingInstance.get(`/reject/${requestId}`)
        if (response) {
          toast.success("Rejected")
        }
      }

    } catch (err) {

    }

  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Active Requests</h1>
            <div className="flex gap-3">
              <span className="text-sm text-gray-500 hidden md:block mt-2">
                {requests.length} active requests
              </span>
              <button className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-50">
                Filter <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((request, idx) => (
                <div key={request._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      {/* Header Section */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {request.user.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(request.createdAt).toLocaleString()}
                            </span>
                            <span className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {idx + 13}km away
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-500 font-medium">
                            {request.dropLocation.phone}
                          </span>
                        </div>
                      </div>

                      {/* Location Section */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.dropLocation.city}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {request.dropLocation.street}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2 justify-end">
                      <button
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => handleResponse(request._id, 'accept')}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </button>
                      <button
                        className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        onClick={() => handleResponse(request._id, 'reject')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      <button
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No Active Requests</h3>
                  <p className="text-gray-500">There are currently no pending ambulance requests.</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Modal */}
          {isDetailsOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Request Details</h2>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {selectedRequest && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Patient Information</h4>
                        <p className="text-lg font-semibold text-gray-900">{selectedRequest.user.name}</p>
                      </div>

                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
                        <p className="text-gray-900 font-medium">{selectedRequest.dropLocation.city}</p>
                        <p className="text-gray-600">{selectedRequest.dropLocation.street}</p>
                      </div>

                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Number</h4>
                        <p className="text-gray-900 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          {selectedRequest.dropLocation.phone}
                        </p>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => handleResponse(selectedRequest._id, 'accept')}
                        >
                          Accept Request
                        </button>
                        <button
                          className="flex-1 px-4 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          onClick={() => handleResponse(selectedRequest._id, 'reject')}
                        >
                          Reject Request
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DriverDashboard;