import React, { use, useEffect, useRef, useState } from 'react'
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
    UserRoundPen,
} from 'lucide-react';
import { axiosAdminInstance, axiosAmbulanceInstance, axiosBookingInstance, axiosDriverInsance, axiosUserInstance } from '../../axiosInstance';
import axios from 'axios';
import { useAsyncError, useFetcher, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../authContext';

function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isAdmin, setIsAdmin] = useState(true);
    const [showAddAmbulance, setShowAddAmbulance] = useState(false);
    const [ambulances, setAmbulances] = useState([])
    const [reload, setReload] = useState(false)
    const [stats, setStats] = useState({
        users: 152,
        drivers: 45,
        requests: 102,
        completedRequests: 89
    })
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [ambulanceType, setAmbulanceType] = useState("basic")
    const ambulanceNumber = useRef()
    const driver = useRef()
    const { isLoggedIn, login, logout, role } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn && role != "admin") {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        async function fetchStats() {
            const { data } = await axiosAdminInstance.get('/stats')
            setStats(data.stats)
        }
        async function fetchRequests() {
            const { data } = await axiosBookingInstance.get('/')
            console.log("booking")
            console.log(data)
            setRequests(data.bookings)
        }
        async function fetchUsers() {
            const { data } = await axiosUserInstance.get('/')
            setUsers(data.users)
        }
        async function fetchAmbulances() {
            const { data } = await axiosAmbulanceInstance.get('/')
            console.log(data.ambulances)
            setAmbulances(data.ambulances)
        }

        // fetchStats()
        fetchRequests()
        fetchUsers()
        fetchAmbulances()
    }, [reload])

    const handleDriverToggle = async (userId, isDriver) => {
        console.log("ahasdfasdf")
        let role = isDriver ? "user" : "driver"
        await axiosDriverInsance.post(`/create/${userId}`, { role })
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                return user._id === userId ? { ...user, role: role } : user;
            });
        });

    };

    const handleAmbulanceAdd = async () => {
        try {
            let driverId = ""
            for (let user of users) {
                if (user.email == driver.current.value && user.role == "driver") {
                    driverId = user._id
                }
            }
            console.log(driverId)
            if (driver.current.value.trim() == "" ||
                ambulanceNumber.current.value.trim() == ""
            ) {
                return toast.error("All Fields are Required")
            }
            if (driverId) {
                const response = await axiosAmbulanceInstance.post('/', {
                    numberPlate: ambulanceNumber.current.value,
                    type: ambulanceType,
                    driverId: driverId
                })
                setShowAddAmbulance(false)
                setReload(!reload)

            } else {
                toast.error("There is not such a Driver")
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        }


    }


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
                            <tr key={user._id} className="border-b">
                                <td className="p-4">#{user.id}</td>
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.phone}</td>
                                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={user.role === "driver"}
                                            onChange={() => handleDriverToggle(user._id, user.role === "driver")}
                                            id={`checkbox-${user._id}`}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label
                                            htmlFor={`checkbox-${user._id}`}
                                            className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                                        >
                                            Driver
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
                                <th className="text-left p-4">Driver</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ambulances.map((ambulance) => (
                                <tr key={ambulance.id} className="border-b">
                                    <td className="p-4">#{ambulance.id}</td>
                                    <td className="p-4">{ambulance.numberPlate}</td>
                                    <td className="p-4">{ambulance.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${ambulance.isAvailable ? 'bg-green-100 text-green-800' :
                                            ambulance.status === 'In Service' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {ambulance.isAvailable ? "Available" : "In Service"}
                                        </span>
                                    </td>
                                    <td className="p-4">{ambulance.driverId.name}</td>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ambulance Number</label>
                            <input type="text" ref={ambulanceNumber}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Driver Email</label>
                            <input type="text" ref={driver}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={ambulanceType}
                                onChange={(e) => { setAmbulanceType(e.target.value) }}
                            >
                                <option value="basic" >Basic Life Support</option>
                                <option value="advanced" >Advanced Life Support</option>
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
                                onClick={handleAmbulanceAdd}
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Ambulance
                            </button>
                        </div>
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
                {requests.map((request, idx) => (
                    <tr key={request.id} className="border-b">
                        <td className="p-4">#{idx + 1}</td>
                        <td className="p-4">{request.user.name}</td>
                        <td className="p-4">{request.dropLocation.city}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                request.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {request.status}
                            </span>
                        </td>
                        <td className="p-4">{new Date(request.createdAt).toDateString()}</td>
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