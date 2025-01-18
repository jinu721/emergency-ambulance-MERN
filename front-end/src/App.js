

// import React, { useState } from 'react';
// import { Menu, X, Phone, Ambulance, Clock, MapPin } from 'lucide-react';
// import './app.css';

// const App = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navItems = [
//     { name: 'Home', href: '#' },
//     { name: 'Services', href: '#services' },
//     { name: 'About', href: '#about' },
//     { name: 'Contact', href: '#contact' }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 right-0 z-50 w-full bg-white shadow-lg">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-2">
//               <Ambulance className="h-8 w-8 text-red-600" />
//               <span className="text-xl font-bold text-gray-800">EmergencyCare</span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-600 hover:text-red-600 transition-colors duration-300"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//               <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
//                 Emergency Call
//               </button>
//             </div>

//             {/* Mobile Navigation Button */}
//             <button
//               className="md:hidden p-2"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-gray-600" />
//               ) : (
//                 <Menu className="h-6 w-6 text-gray-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div
//           className={`md:hidden transition-all duration-300 ease-in-out ${
//             isMenuOpen ? 'max-h-64' : 'max-h-0'
//           } overflow-hidden bg-white`}
//         >
//           <div className="px-4 py-2 space-y-2">
//             {navItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="block py-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
//               >
//                 {item.name}
//               </a>
//             ))}
//             <button className="w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
//               Emergency Call
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="pt-16">
//         <div className="relative bg-red-50 overflow-hidden">
//           <div className="container mx-auto px-4 py-16 lg:py-24">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="space-y-8">
//                 <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in">
//                   24/7 Emergency
//                   <span className="text-red-600"> Ambulance</span> Service
//                 </h1>
//                 <p className="text-lg text-gray-600 animate-fade-in-delay">
//                   Professional medical transportation services available round the clock.
//                   Your safety is our priority.
//                 </p>
//                 <div className="flex flex-wrap gap-4">
//                   <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
//                     Call Now
//                   </button>
//                   <button className="bg-white text-red-600 px-8 py-3 rounded-full border-2 border-red-600 hover:bg-red-50 transition-all duration-300">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
              
//               <div className="lg:block relative animate-float">
//                 <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-xl p-6">
//                   <img
//                     src="/api/placeholder/800/600"
//                     alt="Ambulance service"
//                     className="rounded-lg object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="container mx-auto px-4 py-16">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <Phone className="h-12 w-12 text-red-600 mb-4" />
//               <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
//               <p className="text-gray-600">
//                 Round-the-clock emergency support team ready to respond to your calls.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <Clock className="h-12 w-12 text-red-600 mb-4" />
//               <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
//               <p className="text-gray-600">
//                 Rapid response times with our strategically located ambulance fleet.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <MapPin className="h-12 w-12 text-red-600 mb-4" />
//               <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
//               <p className="text-gray-600">
//                 Real-time GPS tracking for accurate and efficient emergency response.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import './app.css'
import { 
  Users, 
  Ambulance, 
  ClipboardCheck, 
  CheckCircle,
  Menu,
  UserCog,
  Clock,
  LayoutDashboard,
  X
} from 'lucide-react';

const App = ({ isAdmin = true }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Example data
  const stats = {
    users: 152,
    drivers: 45,
    requests: 102,
    completedRequests: 89
  };

  const recentRequests = [
    { id: 1, name: "John Smith", location: "123 Main St", status: "Pending", timestamp: "2025-01-17 13:45" },
    { id: 2, name: "Sarah Johnson", location: "456 Park Ave", status: "Accepted", timestamp: "2025-01-17 13:30" },
    { id: 3, name: "Mike Wilson", location: "789 Oak Rd", status: "Completed", timestamp: "2025-01-17 13:15" },
  ];

  const menuItems = isAdmin ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'drivers', label: 'Driver Management', icon: Ambulance },
    { id: 'users', label: 'User Management', icon: UserCog },
    { id: 'requests', label: 'Request Management', icon: ClipboardCheck },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Request Management', icon: ClipboardCheck },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300  flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>MedEx</h1>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center p-3 mb-2 rounded-lg transition-colors
                ${activeMenu === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
              `}
            >
              <item.icon size={20} />
              <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>

          {/* Stats Section */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Users Card */}
              <div className="bg-blue-50 rounded-lg shadow-sm">
                <div className="flex items-center p-6">
                  <div className="mr-4">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <h3 className="text-2xl font-bold">{stats.users}</h3>
                  </div>
                </div>
              </div>

              {/* Drivers Card */}
              <div className="bg-yellow-50 rounded-lg shadow-sm">
                <div className="flex items-center p-6">
                  <div className="mr-4">
                    <Ambulance className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Drivers</p>
                    <h3 className="text-2xl font-bold">{stats.drivers}</h3>
                  </div>
                </div>
              </div>

              {/* Requests Card */}
              <div className="bg-green-50 rounded-lg shadow-sm">
                <div className="flex items-center p-6">
                  <div className="mr-4">
                    <ClipboardCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Requests</p>
                    <h3 className="text-2xl font-bold">{stats.requests}</h3>
                  </div>
                </div>
              </div>

              {/* Completed Requests Card */}
              <div className="bg-purple-50 rounded-lg shadow-sm">
                <div className="flex items-center p-6">
                  <div className="mr-4">
                    <CheckCircle className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <h3 className="text-2xl font-bold">{stats.completedRequests}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Requests Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Requests</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Request ID</th>
                      <th className="text-left p-4">Patient Name</th>
                      <th className="text-left p-4">Location</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="p-4">#{request.id}</td>
                        <td className="p-4">{request.name}</td>
                        <td className="p-4">{request.location}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="p-4">{request.timestamp}</td>
                        <td className="p-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          {!isAdmin && request.status === 'Pending' && (
                            <button className="text-green-600 hover:text-green-800">
                              Accept
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;