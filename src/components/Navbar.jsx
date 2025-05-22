// src/components/Navbar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/signin", { state: { from: "/dashboard" } });
    } else {
      navigate("/dashboard");
    }
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-primary text-2xl font-bold flex items-center" onClick={handleLinkClick}>
          <span className="text-3xl mr-2">🚗</span> DriveLuxe
        </Link>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:items-center sm:space-x-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 transition-all duration-300 z-40`}
        >
          <Link to="/" onClick={handleLinkClick} className="text-gray-600 hover:text-primary py-2 sm:py-0">
            Home
          </Link>
          <Link to="/cars" onClick={handleLinkClick} className="text-gray-600 hover:text-primary py-2 sm:py-0">
            Cars
          </Link>
          <Link to="/about" onClick={handleLinkClick} className="text-gray-600 hover:text-primary py-2 sm:py-0">
            About
          </Link>
          <Link to="/contact" onClick={handleLinkClick} className="text-gray-600 hover:text-primary py-2 sm:py-0">
            Contact
          </Link>

          {/* Dashboard link */}
          <button onClick={handleDashboardClick} className="text-gray-600 hover:text-primary py-2 sm:py-0">
            Dashboard
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2 sm:mt-0"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={handleLinkClick}
                className="text-primary hover:text-primary-dark py-2 sm:py-0"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={handleLinkClick}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 sm:mt-0"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
