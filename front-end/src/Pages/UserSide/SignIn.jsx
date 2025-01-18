import React, { useEffect, useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { axiosUserInstance } from '../../axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../authContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate()
    const { isLoggedIn, login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone:''
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && !formData.name) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    function changeRoute() {
        if (isLogin) {
            navigate("/signup")
            setIsLogin(!isLogin)
        } else {
            navigate("/login")
            setIsLogin(!isLogin)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (isLogin) {
                    const { data } = await axiosUserInstance.post('/login', { formData })
                    if (data.token) {
                        login()
                        localStorage.setItem("token", data.token)
                        toast.success("Login Success")
                        navigate("/")
                    }
                } else {
                    const { data } = await axiosUserInstance.post("/register", { formData })
                    if (data.token) {
                        login()
                        localStorage.setItem("token", data.token)
                        toast.success("User Created Successfully")
                        navigate("/")
                    }
                }

            } catch (err) {
                toast.error("Somethings Went Wrong. Please Try Later ...")
            }

        }
    };

    return (
        <>
            {/* Navigation */}
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-red-200">
                    <div className="bg-red-600 text-white rounded-t-lg p-6">
                        <h2 className="text-2xl font-bold text-center">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-center text-red-100 mt-2">
                            {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
                        </p>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <>
                                
                                <div className="space-y-1">
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-red-400" />
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full pl-10 pr-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-5 w-5 text-red-400" />
                                        <input
                                            name="phone"
                                            type="text"
                                            placeholder="Phone Number"
                                            className="w-full pl-10 pr-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>
                                </>

                                
                            )}

                            <div className="space-y-1">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-red-400" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full pl-10 pr-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-red-400" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-10 pr-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <button
                                onClick={changeRoute}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;