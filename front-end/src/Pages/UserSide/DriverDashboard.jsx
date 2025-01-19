import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, X, Eye, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DriverDashboard = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
   
  // Dummy request data
  const requests = [
    {
      id: 1,
      patientName: "John Smith",
      requestTime: "10:45 AM",
      urgency: "High",
      status: "Pending",
      location: "123 Emergency Street, Medical District",
      coordinates: "40.7128° N, 74.0060° W",
      contactNumber: "+1 (555) 123-4567",
      additionalNotes: "Patient requires immediate cardiac attention",
      distance: "2.5 km"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      requestTime: "10:30 AM",
      urgency: "Medium",
      status: "Pending",
      location: "456 Care Avenue, Central Hospital",
      coordinates: "40.7129° N, 74.0061° W",
      contactNumber: "+1 (555) 987-6543",
      additionalNotes: "Minor injuries from a fall",
      distance: "3.8 km"
    },
    {
      id: 3,
      patientName: "Robert Davis",
      requestTime: "10:15 AM",
      urgency: "Critical",
      status: "Pending",
      location: "789 Health Boulevard, Emergency Center",
      coordinates: "40.7130° N, 74.0062° W",
      contactNumber: "+1 (555) 246-8135",
      additionalNotes: "Severe traffic accident victim",
      distance: "1.2 km"
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleResponse = (requestId, response) => {
    console.log(`Request ${requestId} ${response}`);
    // Handle the response logic here
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ambulance Requests</h1>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              Filter <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{request.patientName}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                          {request.urgency} Priority
                        </Badge>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {request.requestTime}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {request.distance}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{request.location}</p>
                </div>

                <div className="flex flex-row md:flex-col gap-2 justify-end">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleResponse(request.id, 'accept')}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => handleResponse(request.id, 'reject')}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => handleViewDetails(request)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <Button 
                variant="ghost" 
                className="absolute right-4 top-4"
                onClick={() => setIsDetailsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-500">Patient Information</h4>
                    <p className="text-lg font-semibold">{selectedRequest.patientName}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-500">Location</h4>
                    <p className="text-gray-900">{selectedRequest.location}</p>
                    <p className="text-sm text-gray-500">{selectedRequest.coordinates}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-500">Contact Number</h4>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedRequest.contactNumber}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-500">Additional Notes</h4>
                    <p className="text-gray-900">{selectedRequest.additionalNotes}</p>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleResponse(selectedRequest.id, 'accept')}
                    >
                      Accept Request
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => handleResponse(selectedRequest.id, 'reject')}
                    >
                      Reject Request
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DriverDashboard;