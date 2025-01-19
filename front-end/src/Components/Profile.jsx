import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const UserProfileModal = ({ user, isOpen = true, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 relative">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">User Profile</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="text-lg font-medium">{user?.name}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg">{user?.email}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <p className="text-lg">{user?.phone}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Joined Date</label>
              <p className="text-lg">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;