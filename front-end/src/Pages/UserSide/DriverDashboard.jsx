import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  X,
  Eye,
  Check,
  ChevronDown,
  PhoneCall,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import { axiosBookingInstance } from "../../axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const fetchDriverRequests = async () => {
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
      const { data } = await axiosBookingInstance.get(`/${userId}`);
      setRequests(data.bookings);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || role !== "driver") {
      navigate("/");
      return;
    }
    fetchDriverRequests();
  }, [isLoggedIn, role, navigate]);

  const handleResponse = async (requestId, action) => {
    try {
      setLoading(true);

      if (action === "accept") {
        const { data } = await axiosBookingInstance.put(`/accept/${requestId}`);
        if (data.success) {
          toast.success("Request accepted successfully");
          // Update local state to reflect the change
          setRequests((prevRequests) =>
            prevRequests.map((req) =>
              req._id === requestId ? { ...req, status: "Accepted" } : req
            )
          );
        }
      } else if (action === "reject") {
        const { data } = await axiosBookingInstance.put(`/reject/${requestId}`);
        if (data.success) {
          toast.success("Request rejected successfully");
          // Remove the rejected request from the list
          setRequests((prevRequests) =>
            prevRequests.filter((req) => req._id !== requestId)
          );
        }
      }

      // Close details modal if open
      if (isDetailsOpen) {
        setIsDetailsOpen(false);
      }

      // Refresh the requests list
      fetchDriverRequests();
    } catch (err) {
      console.error("Error handling request:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Active Requests
            </h1>
            <div className="flex gap-3">
              <span className="text-sm text-gray-500 hidden md:block mt-2">
                {requests.length} active requests
              </span>
              <button className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-50">
                Filter <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Loading requests...
                </h3>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.length > 0 ? (
                requests.map((request, idx) => (
                  <div
                    key={request._id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 ${
                      request.status === "Accepted"
                        ? "border-l-4 border-green-500"
                        : ""
                    }`}
                  >
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
                              {request.status && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    request.status === "Accepted"
                                      ? "bg-green-100 text-green-800"
                                      : request.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {request.status}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <PhoneCall className="w-4 h-4 text-blue-500" />
                            <a
                              href={`tel:${request.dropLocation.phone}`}
                              className="text-blue-500 font-medium"
                            >
                              {request.dropLocation.phone}
                            </a>
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
                        {request.status === "pending" ? (
                          <>
                            <button
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() =>
                                handleResponse(request._id, "accept")
                              }
                              disabled={loading}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept
                            </button>
                            <button
                              className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() =>
                                handleResponse(request._id, "reject")
                              }
                              disabled={loading}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </button>
                          </>
                        ) : request.status === "accepted" ? (
                          <button
                            className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Accepted
                          </button>
                        ) : (
                          <button
                            className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            <X className="w-4 h-4 mr-2" />
                            Rejected
                          </button>
                        )}
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
                    <h3 className="text-lg font-medium text-gray-900">
                      No Active Requests
                    </h3>
                    <p className="text-gray-500">
                      There are currently no pending ambulance requests.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

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
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Patient Information
                        </h4>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedRequest.user.name}
                        </p>
                        <p className="text-gray-600">
                          {selectedRequest.status}
                        </p>
                      </div>

                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Location
                        </h4>
                        <p className="text-gray-900 font-medium">
                          {selectedRequest.dropLocation.city}
                        </p>
                        <p className="text-gray-600">
                          {selectedRequest.dropLocation.street}
                        </p>
                      </div>

                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Contact Number
                        </h4>
                        <p className="text-gray-900 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <a href={`tel:${selectedRequest.dropLocation.phone}`}>
                            {selectedRequest.dropLocation.phone}
                          </a>
                        </p>
                      </div>

                      <div className="pb-4 border-b">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Request Time
                        </h4>
                        <p className="text-gray-900">
                          {new Date(selectedRequest.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="pt-4 flex gap-3">
                        {selectedRequest.status === "pending" ? (
                          <>
                            <button
                              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                              onClick={() =>
                                handleResponse(selectedRequest._id, "accept")
                              }
                              disabled={loading}
                            >
                              Accept Request
                            </button>
                            <button
                              className="flex-1 px-4 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                              onClick={() =>
                                handleResponse(selectedRequest._id, "reject")
                              }
                              disabled={loading}
                            >
                              Reject Request
                            </button>
                          </>
                        ) : selectedRequest.status === "accepted" ? (
                          <button
                            className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            Request Accepted
                          </button>
                        ) : (
                          <button
                            className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            Request Rejected
                          </button>
                        )}
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
