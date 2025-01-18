import React, { use, useEffect, useState } from 'react'
import { 
    Ambulance, 
    ClipboardCheck, 
    UserCog,
    LayoutDashboard,
    X,
    Menu,
    Users,
    CheckCircle,
    Edit,
    Trash2,
    Plus,
  } from 'lucide-react';
import { axiosAdminInstance } from '../../axiosInstance';
import axios from 'axios';
import { useFetcher } from 'react-router-dom';

function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isAdmin, setIsAdmin] = useState(true);
    const [showAddAmbulance, setShowAddAmbulance] = useState(false);
    const [stats ,setStats] = useState({
            users: 152,
            drivers: 45,
            requests: 102,
            completedRequests: 89
        })
    const [requests,setRequests] = useState([])
    useEffect(()=>{
      async function fetchStats(){
           const {data} = await axiosAdminInstance.get('/stats')
           setStats(data.stats)
      }
      async function fetchRequests(){
        const {data} = await axiosAdminInstance.get('/requests')
        setRequests(data.requests)
      }
      fetchStats()
      fetchRequests()
    },[])
    const handleDriverToggle = (userId) => {
        // Add your logic here to update the driver status
        console.log(`Toggled driver status for user ${userId}`);
    };

    // Example data
    // const stats = {
    //     users: 152,
    //     drivers: 45,
    //     requests: 102,
    //     completedRequests: 89
    // };

    const users = [
        { id: 1, name: "John Smith", email: "john@example.com",hello:"asdf", phone: "123-456-7890", joinDate: "2024-01-15" },
        { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "234-567-8901", joinDate: "2024-01-14" },
        { id: 3, name: "Mike Wilson", email: "mike@example.com", phone: "345-678-9012", joinDate: "2024-01-13" },
    ];

    const ambulances = [
        { id: 1, number: "AMB-001", status: "Available", type: "Basic Life Support", lastMaintenance: "2024-01-15" },
        { id: 2, number: "AMB-002", status: "In Service", type: "Advanced Life Support", lastMaintenance: "2024-01-14" },
        { id: 3, number: "AMB-003", status: "Maintenance", type: "Basic Life Support", lastMaintenance: "2024-01-13" },
    ];

    // const requests = [
    //     { id: 1, name: "John Smith", location: "123 Main St", status: "Pending", timestamp: "2025-01-17 13:45" },
    //     { id: 2, name: "Sarah Johnson", location: "456 Park Ave", status: "Accepted", timestamp: "2025-01-17 13:30" },
    //     { id: 3, name: "Mike Wilson", location: "789 Oak Rd", status: "Completed", timestamp: "2025-01-17 13:15" },
    // ];

    const menuItems = isAdmin ? [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ambulances', label: 'Ambulances', icon: Ambulance },
        { id: 'users', label: 'User Management', icon: UserCog },
        { id: 'requests', label: 'Request Management', icon: ClipboardCheck },
    ] : [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'requests', label: 'Request Management', icon: ClipboardCheck },
    ];
    const DashboardContent = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

                <div className="bg-yellow-50 rounded-lg shadow-sm">
                    <div className="flex items-center p-6">
                        <div className="mr-4">
                            <Ambulance className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Ambulances</p>
                            <h3 className="text-2xl font-bold">{stats.drivers}</h3>
                        </div>
                    </div>
                </div>

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

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Recent Requests</h2>
                </div>
                <div className="p-6">
                    <RequestsTable requests={requests.slice(0, 5)} />
                </div>
            </div>
        </>
    );

    const UserManagementContent = () => (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">User Management</h2>
            </div>
            <div className="p-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Phone</th>
                            <th className="text-left p-4">Join Date</th>
                            <th className="text-left p-4">Is Driver</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                            <td className="p-4">#{user.id}</td>
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">{user.phone}</td>
                            <td className="p-4">{user.joinDate}</td>
                            <td className="p-4">
                                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                    <input
                                        type="checkbox"
                                        checked={user.isDriver}
                                        onChange={() => handleDriverToggle(user.id)}
                                        className="peer hidden"
                                        id={`toggle-${user.id}`}
                                    />
                                    <label
                                        htmlFor={`toggle-${user.id}`}
                                        className="block h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer peer-checked:bg-blue-500"
                                    >
                                        <span className="absolute block h-4 w-4 rounded-full bg-white top-1 left-1 transition-transform duration-200 ease-in-out peer-checked:translate-x-6" />
                                    </label>
                                </div>
                            </td>
                            <td className="p-4">
                                <button className="text-blue-600 hover:text-blue-800 mr-2">
                                    <Edit size={18} />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const AmbulanceManagementContent = () => (
        <>
            <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Ambulance Management</h2>
                    <button 
                        onClick={() => setShowAddAmbulance(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add Ambulance
                    </button>
                </div>
                <div className="p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">ID</th>
                                <th className="text-left p-4">Number</th>
                                <th className="text-left p-4">Type</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Last Maintenance</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ambulances.map((ambulance) => (
                                <tr key={ambulance.id} className="border-b">
                                    <td className="p-4">#{ambulance.id}</td>
                                    <td className="p-4">{ambulance.number}</td>
                                    <td className="p-4">{ambulance.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            ambulance.status === 'Available' ? 'bg-green-100 text-green-800' :
                                            ambulance.status === 'In Service' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {ambulance.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{ambulance.lastMaintenance}</td>
                                    <td className="p-4">
                                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAddAmbulance && (
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Add New Ambulance</h2>
                    </div>
                    <div className="p-6">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ambulance Number</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option>Basic Life Support</option>
                                    <option>Advanced Life Support</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button 
                                    type="button" 
                                    onClick={() => setShowAddAmbulance(false)}
                                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Ambulance
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );

    const RequestsTable = ({ requests }) => (
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
                {requests.map((request) => (
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
    );

    const RequestManagementContent = () => (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Request Management</h2>
            </div>
            <div className="p-6">
                <RequestsTable requests={requests} />
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardContent />;
            case 'users':
                return <UserManagementContent />;
            case 'ambulances':
                return <AmbulanceManagementContent />;
            case 'requests':
                return <RequestManagementContent />;
            default:
                return <DashboardContent />;
        }
    };
  
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

            {renderContent()}
            </div>
            </div>
            {/* <div className="flex-1 overflow-auto">
                <div className="p-6 max-w-7xl mx-auto space-y-6">
                
                    <div cl(assName="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Today</span>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                                                    <span className={`px-2 py-1 rounded-full text-sm ${request.status === 'Completed' ? 'bg-green-100 text-green-800' :
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
            </div> */}
        </div>
    )
}

export default AdminDashboard