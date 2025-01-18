import React, { useEffect, useState } from 'react'
import { Ambulance, Clock, MapPin, Menu, Phone, X } from 'lucide-react';
import { useAuth } from '../authContext';

function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isLoggedIn}  = useAuth()
    const [navItems,setNavItems] = useState([])
    useEffect(()=>{
    if(isLoggedIn){
        setNavItems( [
            { name: 'Home', href: '#' },
            { name :"Profile" , href : "/profile"},
            { name: 'Contact', href: '#contact' }
        ])
    }else{
        setNavItems( [
            { name: 'Home', href: '#' },
            { name: 'Signup', href: '/signup' },
            { name: 'Login', href: '/login' },
            { name: 'Contact', href: '#contact' }
        ])
    }
    },[isLoggedIn])
    
        
  return (
    <div>
        <nav className="fixed top-0 right-0 z-50 w-full bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Ambulance className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-gray-800">EmergencyCare</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
                Emergency Call
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64' : 'max-h-0'
          } overflow-hidden bg-white`}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
              Emergency Call
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar